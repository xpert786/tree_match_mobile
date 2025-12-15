
import React from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { Images } from '../../Assets';
import { navigate } from '../../Utils/NavigationService';
import { StringConstants } from '../../Theme/StringConstants';
import { styles } from './styles';
import TextInputField from '../../Components/TextInputField';
import CommonButton from '../../Components/CommonButton';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
// import { Toast } from 'toastify-react-native';
import Toast from 'react-native-toast-message';

const SignUp = () => {
  const insets = useSafeAreaInsets();

  const [formdata, setFormdata] = React.useState({
    full_name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = React.useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false);


  const validateForm = (fieldName?: string, value?: string) => {
    let newErrors: any = { ...errors };
    let valid = true;

    const checkField = (name: string, val: string) => {
      let error = "";

      if (name === "full_name") {
        if (!val) {
          error = "Full Name is required";
        } else {
          const regex = /^[A-Za-z\s]+$/;
          if (!regex.test(val)) {
            error = "Full name should contain only alphabets and spaces.";
          }
        }
      }

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

      if (name === "password") {
        if (!val) {
          error = "Password is required";
        } else {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
          if (!passwordRegex.test(val)) {
            error =
              "Password must be at least 8 characters,\ninclude one uppercase,\none lowercase,\none number,\nand one special character.";
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
      checkField("full_name", formdata.full_name);
      checkField("email", formdata.email);
      checkField("password", formdata.password);
    }

    setErrors(newErrors);
    return valid;
  };


  const tapOnSaveAndContinue = () => {
    const isValid = validateForm();
    if (isValid) {
      // convert email to lowercase before sending
      const normalizedData = {
        ...formdata,
        email: formdata.email.toLowerCase().trim(), // 👈 lowercase + trim spaces
      };

      console.log("Normalized FormData in Register screen:", normalizedData);
      setLoading(true);
      restApiToSignUp(normalizedData);
    }
  };



  const restApiToSignUp = async (body: any) => {
    const response = await postRequest(ApiConstants.REGISTER, body);
    setLoading(false);

    console.log("HTTP Status Code restApiToSignUp:", response.status);
    console.log("Response in restApiToSignUp:", response.data);

    if (response.status === 200 || response.status === 201) {
      // Toast.success(response.message);   
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.message
      });
      navigate(ScreenConstants.OTP_VERIFICATION, { fromSignUpLogin: true, email: formdata.email.toLowerCase().trim() })

    } else {
      // Toast.error(response?.message); 
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.message
      });

    }
  };


  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={[]}  // 👈 important: allow content under status bar
    >
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
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

        {/* Full background */}
        <Image source={Images.img_tree} style={styles.treeBackground} />


        {/* Green bottom background */}
        <ImageBackground
          style={styles.backgroundImage}
          source={Images.img_green_view}
        >
          <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 20 }, // Safe bottom padding
            ]}
          >

            <Image source={Images.ic_app_icon} style={styles.appIcon} />
            {/* Form container */}
            <View style={styles.loginContainer}>

              {Platform.OS === 'ios' ? (
                <BlurView
                  style={styles.blurContainer}
                  blurType="light"
                  blurAmount={1}
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

              <Text style={styles.loginText}>
                {StringConstants.CREATE_ACCOUNT}
              </Text>
              <Text style={styles.rightPlace}>
                {StringConstants.RIGHT_TREE_RIGHT_PLACE}
                <Text style={styles.description}>
                  {StringConstants.DESCRIPTION_LOGIN}
                </Text>
              </Text>

              <TextInputField
                value={formdata.full_name}
                maxLength={100}
                placeholder={StringConstants.FULL_NAME}
                returnKeyType="done"
                inputStyles={{ paddingRight: 0 }}
                errorMessage={errors.full_name}
                onChangeText={(val) => {
                  setFormdata({ ...formdata, full_name: val });
                  validateForm("full_name", val);
                }}
              />

              <TextInputField
                value={formdata.email}
                maxLength={100}
                showRightIcon
                placeholder={StringConstants.EMAIL}
                icon={Images.ic_mail}
                returnKeyType="done"
                keyboardType="email-address"
                errorMessage={errors.email}
                onChangeText={(val) => {
                  setFormdata({ ...formdata, email: val });
                  validateForm("email", val);
                }}
              />

              <TextInputField
                value={formdata.password}
                maxLength={100}
                showRightIcon
                placeholder={StringConstants.CREATE_PASSWORD}
                icon={showPassword ? Images.ic_show_eye : Images.ic_hide_eye}
                onIconPress={() => setShowPassword(!showPassword)}
                returnKeyType="done"
                secureTextEntry={!showPassword}
                parentStyles={{ marginBottom: 35 }}
                errorMessage={errors.password}
                onChangeText={(val) => {
                  setFormdata({ ...formdata, password: val });
                  validateForm("password", val);
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
    </SafeAreaView>
  );
};

export default SignUp;
