import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, Text, Image, ImageBackground } from 'react-native';
import { Images } from '../../Assets';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StringConstants } from '../../Theme/StringConstants';


const Splash = ({navigation}: any) => {


useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        // Wait for 2 seconds (to show splash)
        await new Promise(resolve => setTimeout(resolve, 2000));

        const token = await AsyncStorage.getItem(StringConstants.ACCESS_TOKEN);
        if (token) {
          // Token exists → go to BottomTabNavigator
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'BottomTabNavigator' }],
            })
          );
        } else {
          // No token → go to Login
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ScreenConstants.LOGIN }],
            })
          );
        }
      } catch (error) {
        console.error('Error checking token:', error);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ScreenConstants.LOGIN }],
          })
        );
      }
    };

    checkTokenAndNavigate();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={Images.ic_plant} style={styles.background} resizeMode="cover" >
        <Image source={Images.ic_app_icon} style={styles.logo} resizeMode="contain"  />
      </ImageBackground>
      {/* <Image source={Images.img_splash} style={{resizeMode: 'cover'}} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
   logo: {
    width: 150,  // adjust based on your icon size
    height: 150,
  },
});

export default Splash;
