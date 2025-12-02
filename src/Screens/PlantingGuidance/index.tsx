import React from 'react';
import { View, StatusBar, Text, Image, ScrollView, TouchableOpacity, PermissionsAndroid, Platform, FlatList, Pressable, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import SearchInput from '../../Components/SearchInput';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { postRequest, getRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import Geolocation from '@react-native-community/geolocation';
import { Fonts } from '../../Theme/Fonts';
import { Colors } from '../../Theme/Colors';

const PlantingGuidance = ({ route }: any) => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [guidanceData, setGuidanceData] = React.useState<any>(null);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [currentLocation, setCurrentLocation] = React.useState({ latitude: 0, longitude: 0 });

  const parcelId = route?.params?.parcelId;
  console.log("parcelId in PlantingGuidance:", parcelId);

  const fetchCurrentLocation = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location to provide guidance',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log('📍 Live coordinates:', latitude, longitude);
      },
      (error) => console.log('❌ Error getting location:', error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  React.useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchPlantingGuidanceByLocation = async (locationName: string) => {
    setLoading(true);

    const postData = {
      location_name: locationName
    };

    console.log('📍 Fetching planting guidance for location:', postData);

    const response = await postRequest(`${ApiConstants.TREE_SEARCH}`, postData);

    console.log("Planting Guidance API Response:", response);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));

    setLoading(false);

    if (response?.status === 200 || response?.status === 201) {
      setGuidanceData(response.data?.data);

      console.log("✅ Planting guidance fetched successfully");
    } else {
      setAlertTitle(response?.data?.message || response?.message || "Failed to load planting guidance");
      setShowAlertModal(true);
      setGuidanceData(null);
    }
  };

  const fetchPlantingGuidance = async () => {
    setLoading(true);

    let response;

    if (parcelId) {
      console.log('🌱 Fetching planting guidance for parcel:', parcelId);
      response = await getRequest(`${ApiConstants.GET_PARCELS}${parcelId}/planting-guidance/`);
      console.log("url in planting Guidance=>", `${ApiConstants.GET_PARCELS}${parcelId}/planting-guidance/`);
    } else {
      const postData = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        location_name: ""
      };

      console.log('📍 Fetching planting guidance for current location:', postData);
      response = await postRequest(`${ApiConstants.PLANTING_GUIDANCE}`, postData);
    }

    console.log("Planting Guidance API Response:", response);

    setLoading(false);

    if (response?.status === 200 || response?.status === 201) {
      setGuidanceData(response.data?.data || response.data);
      console.log("✅ Planting guidance fetched successfully");
    } else {
      setAlertTitle(response?.data?.message || response?.message || "Failed to load planting guidance");
      setShowAlertModal(true);
      setGuidanceData(null);
    }
  };

  React.useEffect(() => {
    if (parcelId) {
      fetchPlantingGuidance();
    }
  }, [parcelId]);

  const handleSearch = () => {
    const searchText = search.trim();
    if (searchText) {
      fetchPlantingGuidanceByLocation(searchText);
    } else {
      setAlertTitle("Please enter a location to search");
      setShowAlertModal(true);
    }
  };

  const getDisplayData = () => {
    console.log("Current guidanceData:", guidanceData);
    if (guidanceData?.suggestions) {
      console.log("Found trees in guidanceData.suggestions");
      return guidanceData.suggestions.map((item: any, index: number) => ({
        id: (index + 1).toString(),
        name: item.name,
        years: item.age_range,
        feet: item.size_range,
        image: Images.img_tree1,
        image_url: item.image_url
      }));
    }

    // if (guidanceData?.trees) {
    //   console.log("Found trees in guidanceData.trees");
    //   return guidanceData.trees.map((item: any, index: number) => ({
    //     id: (index + 1).toString(),
    //     name: item.name,
    //     years: item.age_range,
    //     feet: item.size_range,
    //     image: Images.img_tree1,
    //     image_url: item.image_url
    //   }));
    // } else if (guidanceData?.data?.trees) {
    //   console.log("Found trees in guidanceData.data.trees");
    //   return guidanceData.data.trees.map((item: any, index: number) => ({
    //     id: (index + 1).toString(),
    //     name: item.name,
    //     years: item.age_range,
    //     feet: item.size_range,
    //     image: Images.img_tree1,
    //     image_url: item.image_url
    //   }));
    // } else if (guidanceData?.suggestions) {
    //   console.log("Found trees in guidanceData.suggestions");
    //   return guidanceData.suggestions.map((item: any, index: number) => ({
    //     id: (index + 1).toString(),
    //     name: item.name,
    //     years: item.age_range,
    //     feet: item.size_range,
    //     image: Images.img_tree1,
    //     image_url: item.image_url
    //   }));
    // } else {
    //   console.log("No trees data found");
    //   return [];
    // }
  };

  const displayData = getDisplayData();

  // const soilType = guidanceData?.location?.soil_type || guidanceData?.data?.location?.soil_type;
  // const locationName = guidanceData?.location?.location_name || guidanceData?.data?.location?.location_name;

  // console.log("Display data length:", displayData.length);
  // console.log("Location name:", locationName);
  // console.log("Soil type:", soilType);

  const renderItem = ({ item }: any) => {

    return (
      <Pressable style={styles.cardView} onPress={() => navigate(ScreenConstants.ABOUT, { treeData: item, parcelId, otherDetails: guidanceData?.location })}>
        <View style={styles.treeImage}>
          {item.image_url ? (
            <Image source={{ uri: item.image_url }} style={styles.treePic} />
          ) : (
            <Image source={item.image} style={styles.treePic} />
          )}
          <Text style={styles.treeName} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
          <Text style={styles.timeYears}>{item.years}</Text>
          {/* <Image source={Images.ic_bookmark2} style={styles.bookmark} /> */}
        </View>
        <View style={styles.bottomView}>
          <View style={styles.feetWrapper}>
            <Image source={Images.ic_zoom_out} />
            <Text
              style={styles.feet}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.feet}
            </Text>
          </View>
          {/* <Image source={Images.ic_round_add} /> */}
        </View>
      </Pressable>
    )
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Loader visible={loading} />
      {showAlertModal && (
        <AlertModal
          visible={showAlertModal}
          title={alertTitle}
          onOkPress={() => {
            setAlertTitle('')
            setShowAlertModal(false)
          }}
        />
      )}

      <Header title={StringConstants.PLANTING_GUIDANCE} />

      <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder={StringConstants.ENTER_YOUR_LOCATION}
          onSubmitEditing={handleSearch}
          tapOnRightIcon={handleSearch}
        />

        <View style={styles.topView}>
          <Text style={styles.myParcels}>{StringConstants.GUIDANCE}</Text>
        </View>

        <View style={styles.allView}>
          <Text style={styles.allText}>All</Text>
        </View>

        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 30, marginBottom: 16 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <View style={{ paddingVertical: 40, alignItems: "center" }}>
              <Text style={{ fontSize: 16, color: Colors.GREY10, fontFamily: Fonts.MEDIUM }}>
                No plants found for the searched location
              </Text>
            </View>)}
            />
      </ScrollView>
    </View>
  );
};

export default PlantingGuidance;