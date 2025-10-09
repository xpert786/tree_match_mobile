import React from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Images } from '../../Assets';
import { navigate } from '../../Utils/NavigationService';
import { StringConstants } from '../../Theme/StringConstants';
import { styles } from './styles';
import TextInputField from '../../Components/TextInputField';
import CommonButton from '../../Components/CommonButton';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: any) => {
  const [formdata, setFormData] = React.useState({
    email: '',
    password: '',
    selected: false
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
      const loadSavedCredentials = async () => {
        try {
          const saved = await AsyncStorage.getItem(StringConstants.USER_CREDENTIALS);
          if (saved) {
            const creds = JSON.parse(saved);
            setFormData({
              email: creds.email || '',
              password: creds.password || '',
              selected: true, // ✅ mark Remember Me as checked
            });
          }
        } catch (error) {
          console.error('Error loading saved credentials:', error);
        }
      };

     loadSavedCredentials();
  }, []);

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
  
      if (name === "password") {
        if (!val) {
          error = "Password is required";
        } else {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
          if (!passwordRegex.test(val)) {
            error = "Password must be at least 8 characters,\ninclude one uppercase,\none lowercase,\none number,\nand one special character.";
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
        checkField("password", formdata.password);
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
          await restApiToLogin(normalizedData);

          // ✅ Save credentials only if "Remember Me" is selected
          if (formdata.selected) {
            try {
              await AsyncStorage.setItem(
                StringConstants.USER_CREDENTIALS,
                JSON.stringify({
                  email: normalizedData.email,
                  password: normalizedData.password,
                })
              );
              console.log('Credentials saved successfully');
            } catch (error) {
              console.error('Error saving credentials:', error);
            }
          } else {
            // ✅ If unchecked, remove any previously saved credentials
            await AsyncStorage.removeItem(StringConstants.USER_CREDENTIALS);
            console.log('Credentials removed');
          }
        }
      };

    const restApiToLogin = async (body: any) => {
      const response = await postRequest(ApiConstants.LOGIN, body);
      setLoading(false);
  
      // console.log("HTTP Status Code restApiToLogin:", response.status);
      console.log("Response in restApiToLogin:", response.data);
  
      if (response.status === 200 || response.status === 201) {    
        navigation.reset({
          index: 0,
          routes: [{ name: ScreenConstants.BOTTOM_TAB_NAVIGATOR }],
        }); 
      }
      else if(response.status === 401){
          navigate(ScreenConstants.OTP_VERIFICATION, {fromSignUpLogin: true, email: formdata.email.toLowerCase().trim()})
      }
      else {
        setShowAlertModal(true);
        setAlertTitle(response.message); 
      }
    };


  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Loader visible={loading} />
          {showAlertModal && 
          <AlertModal
            visible={showAlertModal}
            title={alertTitle}
            onOkPress={()=> {
              setAlertTitle('')
              setShowAlertModal(false)
            }}
          />
          }
      {/* Full background image */}
      <ImageBackground
        source={Images.img_tree}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* App Icon */}
          <View style={styles.topSection}>
            <Image source={Images.ic_app_icon} style={styles.appIcon} />
          </View>

          {/* Login Form */}
          <ImageBackground
            style={styles.greenOverlayCard}
            source={Images.img_green_view}
          >
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

             <View style={styles.innerContent}>
              <Text style={styles.loginText}>{StringConstants.LOGIN}</Text>
              <Text style={styles.rightPlace}>
                {StringConstants.RIGHT_TREE_RIGHT_PLACE}
                <Text style={styles.description}>
                  {StringConstants.DESCRIPTION_LOGIN}
                </Text>
              </Text>

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
                  setFormData({ ...formdata, email: val });
                  validateForm("email", val); 
                }}
              />

              <TextInputField
                  value={formdata.password}
                  maxLength={100}
                  showRightIcon
                  placeholder={StringConstants.PASSWORD}
                  icon={showPassword ? Images.ic_show_eye : Images.ic_hide_eye}
                  onIconPress={() => setShowPassword(!showPassword)}
                  returnKeyType="done"
                  secureTextEntry={!showPassword}
                  errorMessage={errors.password}
                  onChangeText={(val) => {
                    setFormData({ ...formdata, password: val });
                    validateForm("password", val); 
                  }}
                />

              {/* Remember Me + Forgot */}
              <View style={styles.rememberContainer}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={()=>{ setFormData({ ...formdata, selected: !formdata.selected })}}>
                  { formdata.selected == true 
                    ? <Image source={Images.ic_checkbox_selected} />
                    : <View style={styles.checkboxUnselected} />
                  }
                  <Text style={styles.rememberMe}>
                    {StringConstants.REMEMBER_ME}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={styles.forgotPassword}
                  onPress={() => navigate(ScreenConstants.FORGOT_PASSWORD)}
                >
                  {StringConstants.FORGOT_PASSWORD}
                </Text>
              </View>

              {/* Login Button */}
              <CommonButton
                buttonText={StringConstants.LOGIN}
                onPress={tapOnSaveAndContinue}
              />

              {/* Signup */}
              <Text style={styles.dontHaveAccount}>
                {StringConstants.DONT_HAVE_ACCOUNT}
                <Text
                  style={styles.signup}
                  onPress={() => navigate(ScreenConstants.SIGN_UP)}
                >
                  {StringConstants.SIGN_UP}
                </Text>
              </Text>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
