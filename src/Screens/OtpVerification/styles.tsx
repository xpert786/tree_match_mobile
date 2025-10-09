// import { Dimensions, StyleSheet } from "react-native";
// import { Fonts } from "../../Theme/Fonts";
// import { Colors } from "../../Theme/Colors";
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.GREEN,
//   },
//   appIcon:{
//     position: 'absolute',
//     top: 80,
//     left: (width * 0.9 - 98) / 2,
//   },
//   backgroundImage:{
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     // backgroundColor: 'red',
//     top: height * 0.27,
//   },
// loginCard: {
//   alignSelf: 'center',
//   bottom: 36,
//   width: width * 0.9,
//   paddingVertical: 32,
//   paddingHorizontal: 22,
//   borderRadius: 33,
// },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "flex-end",
//     paddingBottom: 5,
//   },

//   loginContainer:{
//     alignSelf: 'center',
//     bottom: 36,
//     width: width * 0.9,
//     borderWidth: .4,
//     borderColor: Colors.WHITE,
//     backgroundColor: Colors.GREEN,
//     paddingVertical: 32,
//     paddingHorizontal: 22,
//     borderRadius: 33,
//     shadowColor: Colors.DEEP_GREEN,
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//   },

//   loginText:{
//      fontSize: 32,
//      fontFamily: Fonts.MEDIUM,
//      color: Colors.WHITE,
//      marginBottom: 9
//   },
//   rightPlace:{
//      fontSize: 18,
//      fontFamily: Fonts.REGULAR,
//      color: Colors.LIGHT_GREEN,
//      marginBottom: 30
//   },
//   root: {
//      alignItems: 'flex-start' ,
//     },
//   codeFieldRoot: { 
//     marginBottom: 35
//    },
//   cell: {
//     width: 60,
//     height: 70,
//     lineHeight: 70,
//     fontSize: 32,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: Colors.WHITE,
//     backgroundColor: Colors.FADE_WHITE,
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 5,
//   },
//   text: {
//     color: Colors.DEEP_GREEN,
//     fontSize: 32,
//     fontFamily: Fonts.REGULAR,
//     textAlign: 'center',
//   },
//   focusCell: {
//     borderColor: Colors.DEEP_GREEN,
//   },
//   description:{
//     color: Colors.WHITE,
//   },
//   otpInput: {
//     height: 70,
//     width: 60,
//     borderRadius: 10,
//     backgroundColor: Colors.FADE_WHITE,
//     borderWidth: 2,
//     borderColor: Colors.WHITE,
//     color: Colors.DEEP_GREEN,
//     fontSize: 32,
//     fontFamily: Fonts.REGULAR,
//     marginBottom: 35
//   },
//   dontHaveAccount:{
//     fontSize: 17,
//      fontFamily: Fonts.REGULAR,
//      color: Colors.WHITE,
//      alignSelf: 'center'
//   },
//   signup:{
//     fontSize: 17,
//      fontFamily: Fonts.BOLD,
//      color: Colors.LIGHT_GREEN,
//   }
// });

import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Fonts } from '../../Theme/Fonts';
import { Colors } from '../../Theme/Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN,
  },
  treeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    top: 30,
    resizeMode: 'cover',
  },
  appIcon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 40,
  },
   blurContainer: {
      ...Platform.select({
        ios: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 33,
        },
      }),
    },
    androidBlurWrapper: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 33,
      overflow: 'hidden',       // makes the Image respect rounded corners
    },
    androidBlurImage: {
      width: '100%',
      height: '100%',
    },
    androidOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255,255,255,0.05)', // optional tint for glassy feel
    },
  loginContainer: {
    width: width * 0.9,
    borderWidth: 0.4,
    borderColor: Colors.WHITE,
    // backgroundColor: Colors.GREEN,
    paddingVertical: 32,
    paddingHorizontal: 22,
    borderRadius: 33,
    shadowColor: Colors.DEEP_GREEN,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginTop: 30,
  },
  loginText: {
    fontSize: 32,
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
    marginBottom: 9,
  },
  rightPlace: {
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
    color: Colors.LIGHT_GREEN,
    marginBottom: 30,
  },
  description: {
    color: Colors.WHITE,
  },
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
   
  },
  codeFieldRoot: {},
  cell: {
    width: 60,
    height: 70,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.FADE_WHITE,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  focusCell: {
    borderColor: Colors.DEEP_GREEN,
  },
  text: {
    fontSize: 32,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN,
    textAlign: 'center',
  },
  dontHaveAccount: {
    fontSize: 17,
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
    alignSelf: 'center',
    marginTop: 20,
  },
  signup: {
    fontSize: 17,
    fontFamily: Fonts.BOLD,
    color: Colors.LIGHT_GREEN,
  },
  errorMessage: {
      color: '#E74C3C',
      fontSize: 10,
      marginTop: 6,
      fontFamily: Fonts.REGULAR,
      marginLeft: 10,
      marginBottom: 35,
      letterSpacing: 0.5
  },
});

