import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, Text, Image, ImageBackground } from 'react-native';
import { Images } from '../../Assets';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { CommonActions } from '@react-navigation/native';


const Splash = ({navigation}: any) => {

 useEffect(() => {
  const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenConstants.LOGIN }],
        })
      );
    }, 2000);

    return () => clearTimeout(timer);
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
    // alignItems: 'center',
    // justifyContent: 'center',
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
