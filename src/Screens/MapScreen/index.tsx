import React, { useRef, useState } from 'react';
import { View, StatusBar, Text, Image, KeyboardAvoidingView, Platform, Pressable, TouchableWithoutFeedback, TouchableOpacity, FlatList, ScrollView, PermissionsAndroid, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import SearchInput from '../../Components/SearchInput';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import MapView, { Marker, MarkerDragStartEndEvent, Polygon, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import { soilMapStyle, soilZones } from '../../Theme/Helper';
import SoilMap from '../../Components/SoilMap';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import { useOfflineDownloads } from '../../Context/OfflineDownloadsContext';
import { Toast } from 'toastify-react-native';


const soilLegend = [
  { name: 'Sandy', color: 'rgba(235, 204, 150, 1)' },
  { name: 'Clay', color: 'rgba(165, 82, 45, 1)' },
  { name: 'Silt', color: 'rgba(180, 180, 180, 1)' },
  { name: 'Loam', color: 'rgba(200, 170, 100, 1)' },
  { name: 'Peat', color: 'rgba(70, 70, 70, 1)' },
  { name: 'Chalky', color: 'rgba(240, 240, 240, 1)', borderColor: '#333' }, // Add border for visibility
  { name: 'Rocky', color: 'rgba(130, 100, 80, 1)' },
  { name: 'Saline', color: 'rgba(255, 255, 180, 1)' },
];


const MapScreen = ({route}: any) => {
  const mapRef = useRef<MapView>(null);


  const { addDownload, isDownloaded } = useOfflineDownloads();


  const [search, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [searchSuccess, setSearchSucess] = React.useState(false);
  const [listening, setListening] = useState(false);
  const [region, setRegion] = useState<any>({
    latitude: 37.7749,      // San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [marker, setMarker] = useState<any>({
    latitude: 37.7749,
    longitude: -122.4194,
  });
  const [mapLoading, setMapLoading] = useState(true);
  const [soilData, setSoilData] = useState<any>({});
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false);
  const [limitationsText, setLimitationsText] = useState("");
  const [recommendedTrees, setRecommendedTrees] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState("");


  React.useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(() => {
        locateUser();
      });
    } else {
      locateUser();
    }
  }, []);

  const locateUser = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("latitude, longitude of current position: ", latitude, longitude);

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        setMarker({ latitude, longitude });
        setMapLoading(false);
      },
      (error) => {
        console.log("Location Error:", error);
        setMapLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleMarkerDragEnd = async (e: MarkerDragStartEndEvent) => {
    try {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setMarker({ latitude, longitude });
      console.log("New Coordinates:", latitude, longitude);
      setLoading(true)

      // ✅ Step 2: Prepare API body
      const body = {
        latitude: Number(latitude.toFixed(6)),
        longitude: Number(longitude.toFixed(6)),
      };
      console.log('body in handleMarkerDragEnd :', body)

      // ✅ Step 3: Call your backend API using postRequest
      const response = await postRequest(ApiConstants.SOIL_ANALYSE, body);
      setLoading(false)

      // ✅ Step 4: Handle response
      if (response?.status === 200) {
        console.log("Soil analyze success:", response.data);
        setSoilData(response?.data?.data)
        setSearchSucess(true)
        const formattedLimitations =
          response?.data?.data?.limitations
            ?.map(
              (item: any) =>
                `${item.type}: ${item.description} ${item.mitigation}`
            )
            .join("\n\n") || "";
        setLimitationsText(formattedLimitations);
        setRecommendedTrees(response.data.data.recommended_trees)
        setImageUrl(response?.data?.data?.soil_image_url)

      } else {

        console.log("Soil analyze failed:", response?.message || "Unknown error");
        setShowAlertModal(true)
        setAlertTitle("Unable to analyze soil. Please try again.")
      }
    } catch (error) {
      console.error("Error in handleMarkerDragEnd:", error);
      setLoading(false)
    }
  };


  const restApiToGeocode = async () => {
    setLoading(true)
    let body = {
      location_name: search
    }
    const response = await postRequest(ApiConstants.GEOCODE, body);
    console.log("HTTP Status Code restApiToGeocode:", response.status);
    console.log("Response in restApiToGeocode:", response.data);

    if (response.status === 200 || response.status === 201) {
      const { latitude, longitude, location_name } = response.data.data;
      const locationData = {
        latitude,
        longitude,
        location_name,
      };
      setMarker({ latitude, longitude })
      const newLatitudeDelta = 0.09;
      const offsetLatitude = latitude - newLatitudeDelta / 2.5;

      // ✅ Set marker and move map to new location
      const newRegion = {
        latitude: offsetLatitude,
        longitude,
        latitudeDelta: newLatitudeDelta, // slightly zoomed-in view
        longitudeDelta: newLatitudeDelta,
      };

      // ✅ Animate map to new region
      mapRef.current?.animateToRegion(newRegion, 1000);  // 1000ms animation
      setRegion(newRegion);
      restApiToSoilAnalyse(locationData)
    }
    else {
      setShowAlertModal(true);
      setAlertTitle(response.message);
      setLoading(false)
    }
  };

  const restApiToSoilAnalyse = async (locationData: object) => {
    console.log("body of restApiToSoilAnalyse:", locationData);

    const response = await postRequest(ApiConstants.SOIL_ANALYSE, locationData);
    setLoading(false)
    setSearch('')

    if (response?.status === 200) {
      console.log("Soil analyze success:", response.data);
      setSoilData(response?.data?.data)
      setSearchSucess(true)
      const formattedLimitations =
        response?.data?.data?.limitations
          ?.map(
            (item: any) =>
              `${item.type}: ${item.description} ${item.mitigation}`
          )
          .join("\n\n") || "";
      setLimitationsText(formattedLimitations);
      setRecommendedTrees(response.data.data.recommended_trees)
      setImageUrl(response?.data?.data?.soil_image_url)

    } else {
      console.log("Soil analyze failed:", response?.message || "Unknown error");
      setShowAlertModal(true)
      setAlertTitle("Unable to analyze soil. Please try again.")
    }
  }

  React.useEffect(() => {
    if (soilData) {
      console.log("soilData==>>>>>", soilData);

    }
  }, [])

  const downloadParcelInAsync = () => {
    if (!soilData) {
      Toast.warn("No parcel data available to download");
      return;
    }

    const parcelToSave: any = {
      id: `${soilData.latitude}-${soilData.longitude}`, // fallback if ID not present
      parcel_name: soilData.location_name || "Unknown Parcel",
      parcel_type: soilData.parcel_type || "Soil",
      custom_parcel_location: soilData.custom_parcel_location || "",
      latitude: soilData.latitude,
      longitude: soilData.longitude,
      location_name: soilData.location_name,
      soil_type: soilData.soil_type,
      moisture_percentage: soilData.moisture_percentage,
      acidity_ph: soilData.acidity_ph,
      analysis_date: soilData.analysis_date || new Date().toISOString(),
      soil_image_url: imageUrl || "", // use image shown in UI
    };
    console.log("parcelToSave", parcelToSave);


    if (isDownloaded(parcelToSave.id)) {
      Toast.warn("This parcel is already downloaded");
    } else {
      addDownload(parcelToSave);
      Toast.success("Parcel saved for offline use");
    }
  }

  const zoomIn = () => {
    setRegion((prev: Region) => {
      const newRegion = {
        ...prev,
        latitudeDelta: Math.max(prev.latitudeDelta / 2, 0.0005),
        longitudeDelta: Math.max(prev.longitudeDelta / 2, 0.0005),
      };
      mapRef.current?.animateToRegion(newRegion, 400);
      return newRegion;
    });
  };

  const zoomOut = () => {
    setRegion((prev: Region) => {
      const newRegion = {
        ...prev,
        latitudeDelta: Math.min(prev.latitudeDelta * 2, 50),
        longitudeDelta: Math.min(prev.longitudeDelta * 2, 50),
      };
      mapRef.current?.animateToRegion(newRegion, 400);
      return newRegion;
    });
  };

  // Helper function (or you can do this inline)
  const getMapType = () => {
    if (selectedValue === 1) {
      return 'satellite';
    }
    if (selectedValue === 2) {
      return 'terrain';
    }
    return 'standard'; // Your "Soil" map is the standard type
  };

  const getTitle = () => {
    if (selectedValue === 1) {
      return 'Satellite Map';
    }
    if (selectedValue === 2) {
      return 'Terrain Map';
    }
    return 'Soil Map'; // Your "Soil" map is the standard type
  };



  React.useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  React.useEffect(() => {
    //  console.log('Voice module:', Voice);
  }, []);

  const onSpeechResults = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0) {
      setSearch(e.value[0]);
    }
  };

  const onSpeechEnd = () => {
    setListening(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.error('Speech Error:', e.error);
    setListening(false);
    Alert.alert('Error', 'Voice recognition failed. Please try again.');
  };

  const startListening = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone for voice search.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Microphone permission is required for voice search.');
          return;
        }
      }
      setListening(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Voice start error:', error);
      Alert.alert('Error', 'Unable to start voice recognition');
      setListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setListening(false);
    } catch (error) {
      console.error('Voice stop error:', error);
      setListening(false);
    }
  };

  const handleVoiceSearch = () => {
    // setSearchSucess(true)
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (mapLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.FOREST_GREEN} />
        <Text style={{ marginTop: 10, color: Colors.DEEP_GREEN }}>Loading Map...</Text>
      </View>
    );
  }

  if (searchSuccess) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >

        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Loader visible={loading} />
          {showAlertModal &&
            <AlertModal
              visible={showAlertModal}
              title={alertTitle}
              onOkPress={() => {
                setAlertTitle('')
                setShowAlertModal(false)
              }}
            />
          }
          <Header title={getTitle()} onPressBack={() => setSearchSucess(false)} />
          <View style={{ flex: 1 }}>
            <MapView
              style={{ flex: 1 }}
              ref={mapRef}
              region={region}
              onRegionChangeComplete={setRegion}
              showsUserLocation={true}
              customMapStyle={soilMapStyle}
              mapType={getMapType()}
              provider={PROVIDER_GOOGLE}
            >
              {soilZones.map((zone, index) => (
                <Polygon
                  key={index}
                  coordinates={zone.coordinates}
                  fillColor={zone.color} // Semi-transparent color
                  strokeColor="rgba(0,0,0,0.5)" // Thin border for definition
                  strokeWidth={1}
                />
              ))}
              <Marker
                coordinate={marker}
                draggable
                onDragEnd={handleMarkerDragEnd}
                image={Images.ic_pin}
              />
            </MapView>
            {/* Zoom Controls */}
            <View style={styles.zoomContainer}>
              <Pressable onPress={zoomIn} style={[styles.commonStyles, styles.zoomInButton]}>
                <Image source={Images.ic_plus_icon} style={styles.zoomText} />
              </Pressable>
              <Pressable onPress={zoomOut} style={[styles.commonStyles, styles.zoomOutButton]}>
                <Image source={Images.ic_minus} style={styles.zoomText} />
              </Pressable>
            </View>
          </View>


          {/* Top Icons */}
          {/* <View style={styles.topView}>
            <View style={styles.temperature}>
              <Image source={Images.ic_cloud} />
              <Text style={styles.temp}>16&deg;</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.plusMinusView} onPress={() => { }}>
                <Image source={Images.ic_plus_icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.minusView} onPress={() => { }}>
                <Image source={Images.ic_minus} />
              </TouchableOpacity>
            </View>
          </View> */}


          <View style={styles.detailsContainer}>
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder={StringConstants.ENTER_YOUR_LOCATION}
              onSubmitEditing={() => {
                if (!search) return
                else restApiToGeocode()
              }}
            tapOnRightIcon={handleVoiceSearch}
            />
            <View style={styles.line} />
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              {/* Details View  */}
              <Pressable style={styles.soilContainer} onPress={() => navigate(ScreenConstants.SOIL_MAP_DETAILS, { soilData })}>
                {/* left view */}
                <Image source={imageUrl ? { uri: imageUrl } : Images.dummy_placeholder} style={styles.placesImage} />

                {/* right view (constrained) */}
                <View style={styles.rightContent}>
                  <Text
                    style={styles.placeName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >{soilData?.location_name || 'Location Name'}</Text>
                  <View style={styles.soilView}>
                    <Text style={styles.soilName}>{soilData?.soil_type || 'Soil Name'}</Text>
                  </View>
                  <View style={styles.topPicksView}>
                    <Text style={styles.topPicks}>Top Picks :</Text>
                    <Text style={styles.treeName} numberOfLines={1} ellipsizeMode='tail'>{soilData?.top_picks?.trees?.[0]?.name || soilData?.recommended_trees?.[0]?.name || 'Top Picks'}</Text>
                  </View>
                </View>
                {/* Tree image */}
                {/* <Image style={styles.treeImage}
                source={
                  soilData?.top_picks?.trees?.[0]?.icon_url
                    ? { uri: soilData.top_picks.trees[0].icon_url }
                    : soilData?.recommended_trees?.[0]?.icon_url
                    ? { uri: soilData.recommended_trees[0].icon_url }
                    : Images.img_tree8
                } /> */}
              </Pressable>

              {/* Preferred View */}
              {(recommendedTrees && recommendedTrees.length > 0) &&
                <View style={[styles.preferredView]}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Image source={Images.ic_two_leaves} />
                    <Text style={styles.myParcels}>{StringConstants.PREFERRED}</Text>
                  </View>
                  {/* <TouchableOpacity onPress={() => { }}>
                  <Image source={Images.ic_right_arrow} />
                </TouchableOpacity> */}
                </View>}

              <FlatList
                data={recommendedTrees}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled
                keyExtractor={(item, index) => `${index}`}
                style={{ marginBottom: 30 }}
                renderItem={({ item, index }) => (
                  <View key={index}
                    style={[
                      styles.plantImageContainer,
                      {
                        marginLeft: index === 0 ? 30 : 14,
                        marginRight: index === recommendedTrees.length - 1 ? 30 : 0,
                      },
                    ]}
                  >
                    <Image source={{ uri: item.icon_url }} style={styles.plantsImages} />
                  </View>
                )}
              />

              <View style={styles.allDetails}>
                <View style={styles.details}>
                  <Image source={Images.ic_moisture} />
                  <Text style={styles.mainHead}>{StringConstants.MOISTURE}</Text>
                  <Text style={[styles.mainHead, styles.value]}>{soilData?.moisture_percentage ? `${soilData.moisture_percentage}%` : 'N/A'}</Text>
                  {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
                </View>
                <View style={styles.details}>
                  <Image source={Images.ic_acidity} />
                  <Text style={styles.mainHead}>{StringConstants.ACIDITY}</Text>
                  <Text style={[styles.mainHead, styles.value]}>{soilData?.acidity_ph || 'N/A'}</Text>
                  {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
                </View>
                <View style={styles.details}>
                  <Image source={Images.ic_fertility} />
                  <Text style={styles.mainHead}>{StringConstants.FERTILITY}</Text>
                  <Text style={[styles.mainHead, styles.value]}>{soilData?.fertility_level || 'N/A'}</Text>
                  {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
                </View>
                <View style={styles.details}>
                  <Image source={Images.ic_minerals} />
                  <Text style={styles.mainHead}>{StringConstants.MINERALS}</Text>
                  <Text style={[styles.mainHead, styles.value]}>{soilData?.mineral_content_percentage ? `${soilData.mineral_content_percentage}%` : 'N/A'}</Text>
                  {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
                </View>
              </View>

              {/* Limitations */}
              {limitationsText &&
                <View style={styles.limitationsBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Image source={Images.ic_warning} />
                    <Text style={styles.limitationsText}>{StringConstants.LIMITATIONS}</Text>
                  </View>
                  <Text style={styles.moderateErosion}>{limitationsText}</Text>
                </View>}

              {/* Download & Save */}
              <View style={styles.bottomButtons}>
                <TouchableOpacity style={[styles.bottomBtnView, { marginRight: 7 }]} onPress={downloadParcelInAsync}>
                  <Image source={Images.ic_download} />
                  <Text style={styles.buttonText}>Download</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.bottomBtnView}>
                  <Image source={Images.ic_save} />
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity> */}
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  } else {
    return (
      <TouchableWithoutFeedback >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >

          <View style={styles.container}>
            <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <Loader visible={loading} />
            {showAlertModal &&
              <AlertModal
                visible={showAlertModal}
                title={alertTitle}
                onOkPress={() => {
                  setAlertTitle('')
                  setShowAlertModal(false)
                }}
              />
            }
            <Header title={getTitle()} />
            <View style={{ flex: 1 }}>
              {selectedValue == 0 &&
                <SoilMap legendData={soilLegend} />
              }
              <MapView
                style={{ flex: 1 }}
                ref={mapRef}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={true}
                customMapStyle={soilMapStyle}
                mapType={getMapType()}
                provider={PROVIDER_GOOGLE}
              >
                {soilZones.map((zone, index) => (
                  <Polygon
                    key={index}
                    coordinates={zone.coordinates}
                    fillColor={zone.color} // Semi-transparent color
                    strokeColor="rgba(0,0,0,0.5)" // Thin border for definition
                    strokeWidth={1}
                  />
                ))}
                <Marker
                  coordinate={marker}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                  image={Images.ic_pin}
                />
              </MapView>
              {/* Zoom Controls */}
              <View style={styles.zoomContainer}>
                <Pressable onPress={zoomIn} style={[styles.commonStyles, styles.zoomInButton]}>
                  <Image source={Images.ic_plus_icon} style={styles.zoomText} />
                </Pressable>
                <Pressable onPress={zoomOut} style={[styles.commonStyles, styles.zoomOutButton]}>
                  <Image source={Images.ic_minus} style={styles.zoomText} />
                </Pressable>
              </View>

            </View>
            {/* {
              showWarning &&
              <View style={styles.warningWrapper}>
                <View style={styles.warningBox}>
                  <Text style={styles.warningMessage}>Lorem ipsum lorem massa turpis viverra et
                    tristique scelerisque neque neque purus
                    arcu elementum purus quis donec intege
                    r nec sagittis tempus lorem diam lectus
                    viverra phasellus facilisi hendrerit sed
                    tincidunt.</Text>
                </View>
                <Image source={Images.ic_triangle} style={styles.triangle} />
              </View>
            } */}

            {/* Bottom tab bar  */}
            <View style={styles.soilWrapper}>
              <Pressable onPress={() => setSelectedValue(0)} style={[styles.tabBar, { backgroundColor: selectedValue == 0 ? Colors.FOREST_GREEN : 'transparent' }]}>
                <Text style={[styles.values, { color: selectedValue == 0 ? Colors.WHITE : Colors.DEEP_GREEN }]}>Soil</Text>
              </Pressable>
              <Pressable onPress={() => setSelectedValue(1)} style={[styles.tabBar, { backgroundColor: selectedValue == 1 ? Colors.FOREST_GREEN : 'transparent' }]}>
                <Text style={[styles.values, { color: selectedValue == 1 ? Colors.WHITE : Colors.DEEP_GREEN }]}>Satellite</Text>
              </Pressable>
              <Pressable onPress={() => setSelectedValue(2)} style={[styles.tabBar, { backgroundColor: selectedValue == 2 ? Colors.FOREST_GREEN : 'transparent' }]}>
                <Text style={[styles.values, { color: selectedValue == 2 ? Colors.WHITE : Colors.DEEP_GREEN }]}>Terrain</Text>
              </Pressable>
            </View>

            {/* <Pressable onPress={() => { setShowWarning(true) }} style={styles.bottomRightIcon}>
              <Image source={Images.ic_i_icon} />
            </Pressable> */}

            {/* Search box at the bottom */} 
            <View style={styles.textInputContainer}>
              <SearchInput
                value={search}
                onChangeText={setSearch}
                placeholder={StringConstants.ENTER_YOUR_LOCATION}
                onSubmitEditing={() => {
                  if (!search) return
                  else restApiToGeocode()
                }}
                tapOnRightIcon={handleVoiceSearch}
                rightIcon={listening ? Images.ic_microphone_listen : Images.ic_microphone}
              />
            </View>

          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }


};
export default MapScreen;



