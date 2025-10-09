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
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const ResetPassword = ({navigation, route}: any) => {
  const {email} = route?.params || {}

  const [formdata, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({
      confirmPassword: '',
      password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false);


    const validateForm = (fieldName?: string, value?: string) => {
    let newErrors: any = { ...errors };
    let valid = true;
  
    const checkField = (name: string, val: string) => {
      let error = "";

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

       if (name === "confirmPassword") {
        if (!val) {
          error = "Confirm Password is required";
        } else if(formdata.password && val !== formdata.password) {
          error = "Password does not match"
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
        checkField("password", formdata.password);
        checkField("confirmPassword", formdata.confirmPassword);
      }
  
      setErrors(newErrors);
      return valid;
    };
  
  
    const tapOnSaveAndContinue = async () => {
        const isValid = validateForm(); 
        if (isValid) {
          setLoading(true);
          await restApiToResetPassword();
        }
      };

    const restApiToResetPassword = async () => {
      let body = {
            email: email,
            new_password: formdata.password,
            confirm_password: formdata.confirmPassword
        }
      const response = await postRequest(ApiConstants.RESET_PASSWORD, body);
      setLoading(false);
  
      console.log("HTTP Status Code restApiToResetPassword:", response.status);
      console.log("Response in restApiToResetPassword:", response.data);
  
      if (response.status === 200 || response.status === 201) {    
        navigation.reset({
          index: 0,
          routes: [{ name: ScreenConstants.BOTTOM_TAB_NAVIGATOR }],
        }); 
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
              <Text style={styles.loginText}>{"Reset Password"}</Text>
              <Text style={styles.rightPlace}>
                {StringConstants.RIGHT_TREE_RIGHT_PLACE}
                <Text style={styles.description}>
                  {StringConstants.DESCRIPTION_LOGIN}
                </Text>
              </Text>

               <TextInputField
                  value={formdata.password}
                  maxLength={100}
                  showRightIcon
                  placeholder={StringConstants.NEW_PASSWORD}
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

                <TextInputField
                  value={formdata.confirmPassword}
                  maxLength={100}
                  showRightIcon
                  placeholder={StringConstants.CONFIRM_PASSWORD}
                  icon={showConfirmPassword ? Images.ic_show_eye : Images.ic_hide_eye}
                  onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  returnKeyType="done"
                  secureTextEntry={!showConfirmPassword}
                  parentStyles={{ marginBottom: 30 }}
                  errorMessage={errors.confirmPassword}
                  onChangeText={(val) => {
                    setFormData({ ...formdata, confirmPassword: val });
                    validateForm("confirmPassword", val); 
                  }}
                />

              {/* Login Button */}
              <CommonButton
                buttonText={StringConstants.CONFIRM}
                onPress={tapOnSaveAndContinue}
              />
              </View>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ResetPassword;
