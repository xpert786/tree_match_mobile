import React from 'react';
import { View, StatusBar, Text, Image, Dimensions, TouchableOpacity, ScrollView, Pressable, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import TextInputField from '../../Components/TextInputField';
import { Dropdown } from 'react-native-element-dropdown';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
// import { Toast } from 'toastify-react-native';
import Toast from 'react-native-toast-message';
import { capitalize } from '../../Theme/Helper';

const width = Dimensions.get('window').width;

const soilOptions = [
  { label: 'Clay Soil', value: 'Clay Soil' },
  { label: 'Sandy Soil', value: 'Sandy Soil' },
  { label: 'Loamy Soil', value: 'Loamy Soil' },
  { label: 'Silty Soil', value: 'Silty Soil' },
  { label: 'Peaty Soil', value: 'Peaty Soil' },
  { label: 'Chalky Soil', value: 'Chalky Soil' },
  { label: 'Saline Soil', value: 'Saline Soil' },
  { label: 'Laterite Soil', value: 'Laterite Soil' },
  { label: 'Black Soil', value: 'Black Soil' },
  { label: 'Red Soil', value: 'Red Soil' },
  { label: 'Alluvial Soil', value: 'Alluvial Soil' },
  { label: 'Desert Soil', value: 'Desert Soil' },
  { label: 'Cecil Soil', value: 'Cecil Soil' },
];


const SoilMapDetails = ({route}: any) => {
  const {soilData} = route.params
  console.log("soilData in SoilMapDetails=>>>>",soilData);
  
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [formData, setFormData] = React.useState({
    parcelName: '',
    soilType: '',
    location: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    parcelName: '',
    soilType: '',
    location: '',
  });
  const [limitationsText, setLimitationsText] = React.useState("");

     React.useEffect(()=>{
         const formattedLimitations =
            soilData?.limitations
              ?.map(
                (item: any) =>
                  `${item.type}: ${item.description} ${item.mitigation}`
              )
              .join("\n\n") || "";
          setLimitationsText(formattedLimitations); 
     },[])


  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'parcelName':
        if (!value.trim()) return 'Parcel name is required';
        if (value.length < 3) return 'Parcel name must be at least 3 characters';
        return '';

      case 'soilType':
        if (!value) return 'Please select a soil type';
        return '';

      case 'location':
        if (!value.trim()) return 'Location is required';
        return '';

      default:
        return '';
    }
  };

  const restApiToSaveParcel = async () => {
    // ✅ If any field still has an error or is empty, stop execution
    const currentErrors = {
      parcelName: validateField('parcelName', formData.parcelName),
      soilType: validateField('soilType', formData.soilType),
      location: validateField('location', formData.location),
    };

    setErrors(currentErrors);

    const hasError = Object.values(currentErrors).some((err) => err !== '');
    if (hasError) return; // stop if any error exists

    // ✅ Otherwise, proceed to hit the API
    setLoading(true);

    const body = {
      parcel_name: formData.parcelName,
      parcel_type: formData.soilType,
      custom_parcel_location: formData.location,
      latitude: soilData?.latitude,
      longitude: soilData?.longitude,
      location_name: soilData?.location_name,
      moisture_percentage: soilData?.moisture_percentage,
      acidity_ph: soilData?.acidity_ph,
      fertility_level: soilData?.fertility_level,
      mineral_content_percentage: soilData?.mineral_content_percentage,
      soil_type: soilData?.soil_type,
      soil_description: soilData?.soil_description,
      limitations: soilData?.limitations,
      recommended_crops: soilData?.recommended_crops,
      recommended_trees: soilData?.recommended_trees,
      confidence_score: soilData?.confidence_score,
      soil_image_url: soilData?.soil_image_url,
    };
     console.log("body in restApiToSaveParcel", body);
    
      const response = await postRequest(`${ApiConstants.PARCELS_SAVE}`, body);
      console.log("HTTP Status Code restApiToSaveParcel:", response.status);
      console.log("Response in restApiToSaveParcel:", response.data);
      setLoading(false);

      if (response.status === 200 || response.status === 201) {
        setFormData({ parcelName: '', soilType: '', location: '' });
        setAlertTitle(response.message || "Parcel saved successfully!");
        setShowAlertModal(true);
      } else {
        setAlertTitle(response.message || "Failed to save parcel");
        setShowAlertModal(true);
      }
  };

  const tapOnDescription =()=>{
    //  Toast.success(soilData?.soil_description);
     Toast.show({
            type: 'success',
            text1: 'Success',
            text2: soilData?.soil_description
          });
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Loader visible={loading} />

      <AlertModal
        visible={showAlertModal}
        title={alertTitle}
        onOkPress={() => {
          setAlertTitle('')
          setShowAlertModal(false)
        }}
      />

      <Header title={StringConstants.PARCEL_DETAIL} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Image source={soilData?.soil_image_url ? {uri: soilData?.soil_image_url} : Images.img_landscape} style={styles.images} />
        <Pressable onPress={tapOnDescription} style={styles.IIcon}>
         <Image source={Images.ic_i_icon}  />
        </Pressable>

        <View style={styles.topView}>
          <Text style={styles.myParcels} numberOfLines={2} ellipsizeMode="tail">{soilData?.location_name}</Text>
          <Pressable onPress={() => { navigate(ScreenConstants.PARCEL_ALERTS, {
            parcelData: soilData
          }) }} style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreText}>Custom Alerts</Text>
            <Image source={Images.ic_plus} style={{ tintColor: Colors.WHITE }} />
          </Pressable>
        </View>

        <Text style={styles.soilName}>{soilData?.soil_type}</Text>

        <Text style={styles.title}>Parcel Name</Text>
        <TextInputField
          value={formData.parcelName}
          maxLength={50}
          placeholder={'Parcel Name'}
          errorMessage={errors.parcelName}
          inputStyles={{ height: 58, width: width - 60 }}
          placeholderTextColor={Colors.PLACEHOLDER_GREY}
          onChangeText={(text) => {
            setFormData({ ...formData, parcelName: text });

            const error = validateField('parcelName', text);
            setErrors({ ...errors, parcelName: error });
          }}
        />

        <Text style={styles.title}>Parcel Type</Text>
        <Dropdown
          style={[styles.dropdown, {marginBottom: errors.soilType ? 4 : 16}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={soilOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Soil Type"
          value={formData.soilType}
          renderRightIcon={() => (
            <Image source={Images.ic_dropdown} style={{ width: 45, height: 45 }} />
          )}
          renderItem={(item) => (
            <Text style={styles.dropdownItemText}>{item.label}</Text>
          )}
         onChange={(item) => {
            setFormData({ ...formData, soilType: item.value });

            const error = validateField('soilType', item.value);
            setErrors({ ...errors, soilType: error });
          }}
        />
        {errors.soilType ? <Text style={styles.errorMessage}>{errors.soilType}</Text> : null}

        <Text style={styles.title}>Parcel Location</Text>
        <TextInputField
          value={formData.location}
          maxLength={50}
          placeholder={'Location'}
          errorMessage={errors.location}
          inputStyles={{ height: 58, width: width - 60 }}
          placeholderTextColor={Colors.PLACEHOLDER_GREY}
          onChangeText={(text) => {
            setFormData({ ...formData, location: text });

            const error = validateField('location', text);
            setErrors({ ...errors, location: error });
          }}
        />

        <View style={styles.allDetails}>
          <View style={styles.details}>
            <Image source={Images.ic_moisture} />
            <Text style={styles.mainHead}>{StringConstants.MOISTURE}</Text>
            <Text style={[styles.mainHead, styles.value]}>{soilData?.moisture_percentage}%</Text>
            {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
          </View>
          <View style={styles.details}>
            <Image source={Images.ic_acidity} />
            <Text style={styles.mainHead}>{StringConstants.ACIDITY}</Text>
            <Text style={[styles.mainHead, styles.value]}>{soilData?.acidity_ph}</Text>
            {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
          </View>
          <View style={styles.details}>
            <Image source={Images.ic_fertility} />
            <Text style={styles.mainHead}>{StringConstants.FERTILITY}</Text>
            <Text style={[styles.mainHead, styles.value]}>{capitalize(soilData?.fertility_level)}</Text>
            {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
          </View>
          <View style={styles.details}>
            <Image source={Images.ic_minerals} />
            <Text style={styles.mainHead}>{StringConstants.MINERALS}</Text>
            <Text style={[styles.mainHead, styles.value]}>{soilData?.mineral_content_percentage}%</Text>
            {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
          </View>
        </View>

        <View style={styles.limitationsBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={Images.ic_warning} />
            <Text style={styles.limitationsText}>{StringConstants.LIMITATIONS}</Text>
          </View>
          <Text style={styles.moderateErosion}>{limitationsText}</Text>
        </View>

        <TouchableOpacity
          style={styles.bottomButtons}
          onPress={restApiToSaveParcel}
        >
          <Image source={Images.ic_save} />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default SoilMapDetails;