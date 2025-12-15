import React from 'react';
import { View, StatusBar, Text, Image, ImageBackground, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Images } from '../../Assets';
import { navigate } from '../../Utils/NavigationService';
import { StringConstants } from '../../Theme/StringConstants';
import { styles } from './styles';
import TextInputField from '../../Components/TextInputField';
import CommonButton from '../../Components/CommonButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BlurView } from '@react-native-community/blur';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
// import { Toast } from 'toastify-react-native';
import Toast from 'react-native-toast-message';



const ForgotPassword = () => {
  const [formdata, setFormData] = React.useState({
    email: '',
  })
  const [errors, setErrors] = React.useState({
    email: '',
  })
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false);

  const validateForm = (fieldName?: string, value?: string) => {
    let newErrors: any = { ...errors };
    let valid = true;

    const checkField = (name: string, val: string) => {
      let error = "";

      if (name === "email") {
        if (!val) {
          error = "Email is required";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            error = "Please enter a valid email";
          }
        }
      }

      newErrors[name] = error;
      if (error) valid = false;
    };

    if (fieldName) {
      // ✅ Validate only one field (live validation)
      checkField(fieldName, value || "");
    } else {
      // ✅ Validate whole form
      checkField("email", formdata.email);
    }

    setErrors(newErrors);
    return valid;
  };

  const tapOnSaveAndContinue = async () => {
    const isValid = validateForm();
    if (isValid) {
      const normalizedData = {
        ...formdata,
        email: formdata.email.toLowerCase().trim(),
      };

      console.log("Normalized FormData in Login screen:", normalizedData);
      setLoading(true);
      await restApiToForgotPassword(normalizedData);
    }
  };


  const restApiToForgotPassword = async (body: any) => {
    const response = await postRequest(ApiConstants.FORGOT_PASSWORD, body);
    setLoading(false);

    console.log("HTTP Status Code restApiToForgotPassword:", response.status);
    console.log("Response in restApiToForgotPassword:", response.data);
    console.log("message in restApiToForgotPassword:", response.data.message);

    if (response.status === 200 || response.status === 201) {
      // Toast.success(response?.data?.message);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response?.data?.message
      });
      navigate(ScreenConstants.OTP_VERIFICATION, { fromSignUpLogin: false, email: formdata.email.toLowerCase().trim() })
    }
    else {
      // Toast.error(response?.message); 
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.message
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
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
      {/* Tree background image */}
      <Image source={Images.img_tree} style={styles.treeBackground} />

      {/* Green background image at bottom */}
      <ImageBackground style={styles.backgroundImage} source={Images.img_green_view}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* App icon */}
          <Image source={Images.ic_app_icon} style={styles.appIcon} />

          {/* Main form container */}
          <View style={styles.loginContainer}>

            {Platform.OS === 'ios' ? (
              <BlurView
                style={styles.blurContainer}
                blurType="light"
                blurAmount={1}
              // reducedTransparencyFallbackColor="rgba(255,255,255,0.1)"
              />
            ) : (
              <View style={styles.androidBlurWrapper}>
                <Image
                  source={Images.img_tree} // same as your main background
                  style={styles.androidBlurImage}
                  blurRadius={25}          // adjust for more blur
                />
                <View style={styles.androidOverlay} />
              </View>
            )}

            <Text style={styles.loginText}>{StringConstants.FORGOT_PASSWORD2}</Text>
            <Text style={styles.rightPlace}>
              {StringConstants.RIGHT_TREE_RIGHT_PLACE}
              <Text style={styles.description}>{StringConstants.DESCRIPTION_LOGIN}</Text>
            </Text>

            <TextInputField
              value={formdata.email}
              showRightIcon
              placeholder={StringConstants.EMAIL}
              icon={Images.ic_mail}
              parentStyles={{ marginBottom: 35 }}
              keyboardType="email-address"
              errorMessage={errors.email}
              onChangeText={(val) => {
                setFormData({ ...formdata, email: val });
                validateForm("email", val);
              }}
            />

            <CommonButton
              buttonText={StringConstants.CONTINUE}
              onPress={tapOnSaveAndContinue}
            />

            {/* <View style={styles.continueContainer}>
            <View style={styles.horizontalLine} />
            <Text style={styles.orContinueWith}>
              {StringConstants.OR_CONTINUE_WITH}
            </Text>
            <View style={styles.horizontalLine} />
          </View> */}

            {/* <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Image source={Images.ic_google} />
          </TouchableOpacity> */}
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );



};



export default ForgotPassword;




