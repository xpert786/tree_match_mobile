

import React, { useState } from 'react';
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
import CommonButton from '../../Components/CommonButton';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';
import { saveToken } from '../../Theme/Helper';

const CELL_COUNT = 4;

const OtpVerification = ({ navigation, route }: any) => {
  const {fromSignUpLogin, email} = route?.params || {}
  const insets = useSafeAreaInsets();

  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false);
  const [touched, setTouched] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

   // ✅ Validate OTP live
    React.useEffect(() => {
    if (!touched) {
      setError(''); // don't show any error initially
      return;
    }

    if (!value) {
      setError('OTP is required');
    } else if (!/^[0-9]+$/.test(value)) {
      setError('OTP should contain only numbers');
    } else if (value.length !== CELL_COUNT) {
      setError(`OTP must be ${CELL_COUNT} digits`);
    } else {
      setError(''); // valid
    }
  }, [value, touched]);

  const isOtpValid = !error && value.length === CELL_COUNT;

  const tapOnSaveAndContinue = () => {
    if (!isOtpValid) return;

    setLoading(true);
    restApiToVerifyOtp(value);
  };

  const restApiToVerifyOtp = async (value: any) => {
    let body ={
      otp: value, 
      email: email,
      purpose: fromSignUpLogin ? 0 : 1,
    }
    console.log("body in restApiToVerifyOtp:", body);
    
    const response = await postRequest(ApiConstants.VERIFY_OTP, body);
    console.log("response in restApiToVerifyOtp",response.data);
    console.log("HTTP Status Code restApiToVerifyOtp:", response.status)    
    setLoading(false);

    if (response.status === 200 || response.status === 201) {
      const token = response?.data?.data?.tokens?.access
      console.log("token in 200 in restApiToVerifyOtp:", token);
      
      saveToken(token)
      if (fromSignUpLogin) {
        //came from register/login
        navigation.reset({
          index: 0,
          routes: [{ name: ScreenConstants.BOTTOM_TAB_NAVIGATOR }],
        });
      } else {
        //came from forget password
        navigate(ScreenConstants.RESET_PASSWORD, {email});
      }
    } else {
      Toast.error(response?.message);
    }
  };
  
   const restApiToResendOtp = async (value: any) => {
    setLoading(true)
    let body ={
      email: email,
      purpose: fromSignUpLogin ? 0 : 1,
    }
    console.log("body in restApiToResendOtp:", body);
    
    const response = await postRequest(ApiConstants.RESEND_OTP, body);
    console.log("response in restApiToResendOtp",response.data);
    console.log("HTTP Status Code restApiToResendOtp:", response.status)    
    setLoading(false);

    if (response.status === 200 || response.status === 201) {
       Toast.success(response?.data?.message); 
    } else {
       Toast.error(response?.message);
    }
  };
   

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#212121' }}>
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
            onOkPress={()=> {
              setAlertTitle('')
              setShowAlertModal(false)
            }}
          />
         }

      {/* Full-screen tree background */}
      <Image source={Images.img_tree} style={styles.treeBackground} />

      {/* Green bottom background */}
      <ImageBackground
        source={Images.img_green_view}
        style={styles.backgroundImage}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            paddingBottom: insets.bottom + 20,
          }}
        >
          <View style={{ alignItems: 'center', paddingTop: 40 }}>
            {/* App Icon */}
            <Image source={Images.ic_app_icon} style={styles.appIcon} />

            {/* OTP / Login Container */}
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
                {StringConstants.OTP_VERIFICATION}
              </Text>
              <Text style={styles.rightPlace}>
                {StringConstants.RIGHT_TREE_RIGHT_PLACE}
                <Text style={styles.description}>
                  {StringConstants.DESCRIPTION_LOGIN}
                </Text>
              </Text>

              <View style={[styles.root, { marginBottom: error ? 0 : 35}]}>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={(text) => {
                      if (!touched) setTouched(true); // first user interaction
                      setValue(text);
                  }}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      <Text style={styles.text}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />
              </View>
              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

              <CommonButton
                buttonText={StringConstants.CONFIRM}
                onPress={tapOnSaveAndContinue}
                disabled={!isOtpValid}
              />

              <Text style={styles.dontHaveAccount}>
                {StringConstants.DID_NOT_GET_OTP_YET}
                <Text style={styles.signup} onPress={restApiToResendOtp}>{StringConstants.RESEND_OTP}</Text>
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OtpVerification;
