import React from 'react';
import { View, StatusBar, Text, Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert, Platform, PermissionsAndroid } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { BlurView } from "@react-native-community/blur";
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { useFocusEffect } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const { height, width } = Dimensions.get('screen')

const AiScan = () => {
  const [scanCompleted, setScanCompleted] = React.useState(false);
  const [showMoreDetails, setShowMoreDetails] = React.useState(false);
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [cameraOpened, setCameraOpened] = React.useState(false);
  const [scanData, setScanData] = React.useState<any>(null);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');

  const options: any = {
    mediaType: 'photo',
    saveToPhotos: false,
    cameraType: 'back',
    quality: 0.8,
  };

  const checkCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const alreadyGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (alreadyGranted) return true;

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take pictures.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission check error:', err);
        return false;
      }
    }
    return true;
  };

  const openCamera = async () => {
    const hasPermission = await checkCameraPermission();
    if (!hasPermission) {
      Alert.alert('Camera permission denied. Please enable it in settings.');
      return;
    }

    setCameraOpened(true);
    launchCamera(options, (response: any) => {
      setCameraOpened(false);

      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
        setAlertTitle('Failed to capture image');
        setShowAlertModal(true);
      } else {
        console.log('response in camera: ', response);
        console.log('Image URI: ', response?.assets[0]?.uri);
        const uri = response?.assets[0]?.uri;
        const type = response?.assets[0]?.type;
        const fileName = response?.assets[0]?.fileName || 'scannerImage.jpg';
        setImageUri(uri);
        restApiToUploadImage(uri, type, fileName);
      }
    });
  };

  const restApiToUploadImage = async (imageUri: string, type: string, fileName: string) => {
    setLoading(true);
    setScanCompleted(false);

    const formData = new FormData();

    formData.append('tree_image', {
      uri: imageUri,
      type: type || 'image/jpeg',
      name: fileName || 'tree_scan.jpg',
    });

    console.log('📸 Sending POST data for tree scan');

    const response = await postRequest(ApiConstants.TREE_SCAN, formData);

    console.log('🌳 Tree Scan API Response:', response.data);

    setLoading(false);

    if (response?.status === 200 || response?.status === 201) {
      setScanCompleted(true);
      setScanData(response.data?.data || response.data);

      if (response.data?.data) {
        console.log('Scan data:', response.data.data);
      }
    } else {
      const errorMessage = response.data?.message || 'Failed to analyze image';
      console.warn('⚠️ API response not successful:', errorMessage);
      setAlertTitle(errorMessage);
      setShowAlertModal(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setScanCompleted(false);
      setShowMoreDetails(false);
      setImageUri(null);
      setCameraOpened(false);
      setScanData(null);

      const timer = setTimeout(() => {
        openCamera();
      }, 500);

      return () => clearTimeout(timer);
    }, [])
  );

  const renderScanResult = () => (
    <ImageBackground source={imageUri ? { uri: imageUri } : Images.dummy_image6}>
      <Image source={Images.bg_shadow_effect} style={styles.image} />

      <View style={styles.scanResultWrapper}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="rgba(255,255,255,0.3)"
        />

        <Image source={Images.img_tree7} style={styles.treeImage} />

        <View style={styles.textContent}>
          <Text style={styles.title}>
            {scanData?.tree_name || 'Fiscus tree'}
          </Text>
          <Text style={styles.description}>
            {scanData?.about_tree ||
              'The Fichus Benjamin, also known as the Weeping Fig, is a popular ornamental tree known for its glossy green foliage and graceful, arching branches.'}
          </Text>
        </View>

        <TouchableOpacity style={styles.rightArrow} onPress={() => setShowMoreDetails(true)}>
          <Image source={Images.ic_right_arrow} style={{ tintColor: Colors.WHITE }} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  const renderMoreDetails = () => (
    <ImageBackground source={imageUri ? { uri: imageUri } : Images.bg_shadow_effect} style={{ flex: 1 }}>
      <Image source={Images.bg_shadow_effect} style={styles.bgShadow} />

      <ScrollView
        style={styles.detailsScroll}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.confidenceCircleWrapper}>
          <View style={styles.confidenceCircle}>
            <Text style={styles.confidenceText}>
              {scanData?.confidence_score ? `${scanData.confidence_score}%` : 'N/A'}
            </Text>
          </View>
          <Text style={styles.confidenceText1}>Confidence Score</Text>
        </View>

        <View>
          <Text style={styles.detailsTitle2}>
            {scanData?.tree_name || 'Unknown Tree'} Report
          </Text>

          <Text style={styles.detailsTitle}>Insects:</Text>
          <Text style={styles.descriptionForDetails}>
            {scanData?.insects_found_details || 'No visible insect activity detected in the image'}
          </Text>

          <Text style={styles.detailsTitle}>Health Condition:</Text>
          <Text style={styles.descriptionForDetails}>
            {scanData?.health_condition || `The plant health couldn't be determined from the captured photo`}
          </Text>

          <Text style={styles.detailsTitle}>Hydration Condition:</Text>
          <Text style={styles.descriptionForDetails}>
            {scanData?.hydration_condition || 'Unable to assess hydration level. Try scanning with a clearer image'}
          </Text>

          <Text style={styles.detailsTitle2}>Suggested treatment</Text>
          {scanData?.suggested_treatment && scanData.suggested_treatment.length > 0 ? (
            <FlatList
              data={scanData.suggested_treatment}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.details}>{item}</Text>}
            />
          ) : (
            <Text style={styles.descriptionForDetails}>
              No specific treatment suggestions available at the moment.
            </Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );

  const renderInitialView = () => (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {!cameraOpened && !loading && !scanCompleted && (
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={openCamera}
          disabled={loading}
        >
          <Text style={styles.cameraButtonText}>
            {loading ? 'Opening Camera...' : 'Take Photo'}
          </Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Analyze image...</Text>
        </View>
      )}
    </View>
  );


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
        onOkPress={() => setShowAlertModal(false)}
      />

      <Header
        title={StringConstants.AI_TOOL}
        showMessageIcon={scanCompleted}
        onPressMessage={() => navigate(ScreenConstants.AI_CHAT)}
      />

      {scanCompleted ?
        (showMoreDetails ? renderMoreDetails() : renderScanResult())
        : renderInitialView()
      }
    </View>
  );
};

export default AiScan;