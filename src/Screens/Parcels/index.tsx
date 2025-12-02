import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, Platform, PermissionsAndroid, Alert, TouchableOpacity, FlatList, Pressable, TextInput } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import SearchInput from '../../Components/SearchInput';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import { ApiConstants } from '../../Theme/ApiConstants';
import { deleteRequest, getRequest, patchRequest } from '../../Network/apiClient';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import { useOfflineDownloads } from '../../Context/OfflineDownloadsContext';
import { Toast } from 'toastify-react-native';
import { Fonts } from '../../Theme/Fonts';

const Parcels = () => {
    const { addDownload, isDownloaded } = useOfflineDownloads();

  const [search, setSearch] = React.useState("");
  const [value, setValue] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const [parcels, setParcels] = useState<any[]>([]);
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false);
  const [soilTypes, setSoilTypes] = useState<any[]>([]);
  const [filteredParcels, setFilteredParcels] = useState<any[]>([]);
  const [editingParcelId, setEditingParcelId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  
  useEffect(() => {
    restApiToGetParcels();
  }, []);

  // Debounced Search Implementation 
  useEffect(() => {
      if (search === '') {
        // If the user clears the search field, fetch all immediately
        restApiToGetParcels('');
        return; 
      }

      const delayDebounceFn = setTimeout(() => {
        if (search.trim()) {
          restApiToGetParcels(search.trim());
        }
      }, 2000); 

      return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const restApiToGetParcels = async (searchTerm = "") => {
      setLoading(true);
      const url = searchTerm
        ? `${ApiConstants.GET_PARCELS}?search=${encodeURIComponent(searchTerm)}`
        : ApiConstants.GET_PARCELS;
        console.log("url in restApiToGetParcels", url);
       const response = await getRequest(url);
      setLoading(false);

      console.log("HTTP Status Code restApiToGetParcels:", response.status);
      console.log("Response in restApiToGetParcels:", response.data);

      if (response.status === 200 || response.status === 201) {
        const parcelData = response.data.data
          ? [response.data.data]
          : response.data.results || [];

        setParcels(parcelData);

        const uniqueSoilTypes = [
          ...new Set(
            parcelData
              .map((item: any) => item.parcel_type)
              .filter((type: string | null | undefined): type is string => !!type)
          ),
        ].map((type) => {
          const t = String(type);
          return {
            label: t.charAt(0).toUpperCase() + t.slice(1),
            value: t.toLowerCase(),
          };
        });
        setParcels(parcelData);
        setFilteredParcels(parcelData);

        setSoilTypes(uniqueSoilTypes);
      } else {
        setShowAlertModal(true);
        setAlertTitle(response.message || "Failed to load parcels");
      }
    };

    const handleSearchSubmit = () => {
        const searchText = search.trim();
        restApiToGetParcels(searchText);
      };



  const restApiToEditParcel = async (parcelId: string, newName: string) => {
    try {
      setLoading(true);

      const payload = {
        parcel_name: newName
      };

      const response = await patchRequest(`${ApiConstants.EDIT_PARCEL}${parcelId}/`, payload);
      setLoading(false);

      console.log("HTTP Status Code restApiToEditParcel:", response.status);
      console.log("Response in restApiToEditParcel:", response.data);

      if (response.status === 200 || response.status === 201) {
        setAlertTitle(response?.data?.message || "Parcel updated successfully");
        setShowAlertModal(true);

        const updatedParcels = parcels.map(parcel =>
          parcel.id === parcelId
            ? { ...parcel, parcel_name: newName }
            : parcel
        );

        setParcels(updatedParcels);
        setFilteredParcels(updatedParcels);
        setEditingParcelId(null);

      } else {
        setAlertTitle(response.message || "Failed to update parcel");
        setShowAlertModal(true);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating parcel:', error);
      setAlertTitle("An error occurred while updating the parcel");
      setShowAlertModal(true);
    }
  };

  const restApiToDeleteParcel = async (parcelId: string) => {
    try {
      setLoading(true);

      const response = await deleteRequest(`${ApiConstants.DELETE_PARCEL}${parcelId}/`);
      setLoading(false);

      console.log("HTTP Status Code restApiToDeleteParcel:", response.status);
      console.log("Response in restApiToDeleteParcel:", response.data);

      if (response.status === 200 || response.status === 201) {
        setAlertTitle(response?.data?.message || "Parcel deleted successfully");
        setShowAlertModal(true);

        const updatedParcels = parcels.filter(parcel => parcel.id !== parcelId);
        const updatedFilteredParcels = filteredParcels.filter(parcel => parcel.id !== parcelId);

        setParcels(updatedParcels);
        setFilteredParcels(updatedFilteredParcels);

      } else {
        setAlertTitle(response.message || "Failed to delete parcel");
        setShowAlertModal(true);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error deleting parcel:', error);
      setAlertTitle("An error occurred while deleting the parcel");
      setShowAlertModal(true);
    }
  };

  const handleNameChange = (text: string) => setEditingName(text);

  const handleNameSubmit = () => {
    if (editingParcelId && editingName.trim()) {
      restApiToEditParcel(editingParcelId, editingName.trim());
    }
    setEditingParcelId(null); // always clear editing mode after submit/blur
  };


  const handleBackgroundPress = () => {
    if (editingParcelId) {
      handleNameSubmit();
    }
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    }
  };

  const handleSoilContainerPress = (item: any) => {
    if (editingParcelId) {
      return;
    }
    // navigate(ScreenConstants.PARCEL_DETAILS, { parcel: item });
  };


  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
  console.log('Voice module:', Voice);
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
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const getIcon =(index: number)=>{
    if(index == 0){
      return Images.ic_eye
    } else if(index == 1){
      return Images.ic_download
    } else if(index == 2){
      return Images.ic_rename
    } else if(index == 3){
      return Images.ic_delete
    } else {return}
  }

  return (
    <Pressable style={styles.container} onPress={handleBackgroundPress}>
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

      <Header title={StringConstants.MY_PARCELS} />

      <View style={styles.searchContainer}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search.."
          containerStyles={{ flex: 1, marginTop: 24 }}
          tapOnRightIcon={handleVoiceSearch}
          rightIcon={listening ? Images.ic_microphone_listen : Images.ic_microphone}
          onSubmitEditing={handleSearchSubmit}
        />
        {/* <TouchableOpacity
          onPress={handleVoiceSearch}
          style={[
            styles.voiceButton,
            {
              backgroundColor: listening ? Colors.RED : Colors.BORDER_GREY,
            }
          ]}
        >

        </TouchableOpacity> */}
      </View>

      {/* {listening && (
        <View style={styles.listeningContainer}>
          <Text style={styles.listeningText}>Listening... Speak now</Text>
        </View>
      )} */}

      <View style={styles.topView}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.parcelsText}>{StringConstants.PARCELS}</Text>
          <Text numberOfLines={2} style={styles.recommendationLine}>{StringConstants.RECOMMENDATION_LINE}</Text>
        </View>
        <TouchableOpacity style={styles.addNewBtn} onPress={() => navigate(ScreenConstants.MAP_SCREEN)}>
          <Image source={Images.ic_plus} />
          <Text style={styles.addNewText}>{StringConstants.ADD_NEW}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>
        <Pressable
          style={[
            styles.allView,
            {
              backgroundColor: value === null ? Colors.FOREST_GREEN : Colors.WHITE,
              borderColor: Colors.GREEN,
              borderWidth: 1,
            },
          ]}
          onPress={() => {
            setValue(null);
            setFilteredParcels(parcels);
          }}
        >
          <Text
            style={[
              styles.allText,
              { color: value === null ? Colors.WHITE : Colors.GREEN },
            ]}
          >
            All
          </Text>
        </Pressable>

        <Dropdown
          style={styles.soilTypeView}
          placeholderStyle={styles.soilTypePlaceholder}
          selectedTextStyle={styles.soilTypePlaceholder}
          data={soilTypes}
          labelField="label"
          valueField="value"
          placeholder="Soil type"
          iconStyle={styles.iconStyle}
          value={value}
          onChange={(item) => {
            setValue(item.value);
            const filtered = parcels.filter(
              (parcel) =>
                parcel.parcel_type &&
                parcel.parcel_type.toLowerCase() === item.value.toLowerCase()
            );
            setFilteredParcels(filtered);
          }}
          renderLeftIcon={() => (
            <Image source={Images.ic_soil_type} style={styles.leftIcon} />
          )}
          itemTextStyle={styles.itemTextStyle}
        />

      </View>

      <FlatList
        data={filteredParcels}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          !loading && (
            <Text style={{ textAlign: 'center', marginTop: 40, color: Colors.BORDER_GREY, fontFamily: Fonts.MEDIUM }}>
              No parcels available
            </Text>
          )
        )}
        renderItem={({ item, index }) => (
          <Pressable
            style={[styles.soilContainer,
              selectedIndex === index && { zIndex: 999, }
            ]}
            onPress={() => handleSoilContainerPress(item)}
          >
            <Image
              source={item.soil_image_url ? { uri: item.soil_image_url } : Images.dummy_image3}
              style={styles.placesImage}
            />

            <View style={styles.rightContent}>
               {editingParcelId === item.id ? (
                <TextInput
                  style={[styles.placeName, styles.editableInput]}
                  value={editingName}
                  onChangeText={handleNameChange}
                  onBlur={handleNameSubmit}
                  onSubmitEditing={handleNameSubmit}
                  autoFocus={true}
                  selectTextOnFocus={true}
                  placeholder="Enter parcel name"
                />
              ) : (
                <Text style={styles.placeName} numberOfLines={1}>
                  {item.parcel_name || 'Unknown Parcel'}
                </Text>
              )}


              <View style={styles.soilView}>
                <Text style={styles.soilName}>{item.soil_type}</Text>
              </View>

              <View style={styles.statsRow}>
                <View style={[styles.boxView, { marginRight: 5}]}>
                  <Image source={Images.ic_moisture} style={styles.icons} />
                  <Text style={styles.boxText}>
                    {item?.moisture_percentage ? `${item.moisture_percentage}%` : 'N/A'}
                  </Text>
                </View>
                <View style={styles.boxView}>
                  <Image source={Images.ic_acidity} style={styles.icons} />
                  <Text style={styles.boxText}>
                    {item?.acidity_ph ? item?.acidity_ph : 'N/A'}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.threeDots}
              onPress={() => setSelectedIndex(selectedIndex === index ? null : index)}
            >
              <Image source={Images.ic_three_dots} />
            </TouchableOpacity>

            {selectedIndex === index && (
              <View style={styles.modalView}>
                {['View', 'Download', 'Rename', 'Delete'].map((opt, optIndex) => (
                  <Pressable
                    key={opt}
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor:
                          selected === opt ? Colors.BORDER_GREY : Colors.WHITE,
                      },
                    ]}
                    onPress={() => {
                      setSelectedIndex(null);
                      setSelected(opt)

                      if (opt === 'Rename') {
                        setEditingParcelId(item.id);
                        setEditingName(item.parcel_name || item.location_name || '');
                      }
                      else if (opt === 'Delete') {
                        restApiToDeleteParcel(item.id);
                      }
                      else if (opt === 'View') {
                        navigate(ScreenConstants.PARCEL_DETAILS, { parcel: item });
                      }
                      else if (opt === 'Download') {
                        console.log('Download parcel:', item.id);
                         if (isDownloaded(item.id)) {
                            Toast.warn("Parcel already downloaded");
                          } else {
                            addDownload(item);
                            Toast.success("Parcel saved for offline use");
                          }
                      }
                    }}
                  >
                    <Image source={getIcon(optIndex)} style={{tintColor: selected === opt ? Colors.WHITE : Colors.BORDER_GREY, marginRight: 3}} />
                    <Text
                      style={[
                        styles.modalText,
                        {
                          color:
                            selected === opt
                              ? Colors.WHITE
                              : Colors.BORDER_GREY,
                        },
                      ]}
                    >
                      {opt}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </Pressable>
        )}
      />

    </Pressable>
  );
};

export default Parcels;