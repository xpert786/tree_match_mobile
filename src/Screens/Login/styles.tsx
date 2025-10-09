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
//   backgroundImage: {
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     top: height * 0.27,
//   },
//   appIcon: {
//     position: 'absolute',
//     top: 80,
//     left: (width * 0.9 - 98) / 2,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "flex-end",
//     paddingBottom: 5,
//   },

//   loginCard: {
//     alignSelf: 'center',
//     bottom: 36,
//     width: width * 0.9,
//     paddingVertical: 32,
//     paddingHorizontal: 22,
//     borderRadius: 33,
//   },
//   loginContainer: {
//     alignSelf: 'center',
//     bottom: 36,
//     width: width * 0.9,
//     borderWidth: .4,
//     borderColor: Colors.WHITE,
//     borderRadius: 33,
//     shadowColor: Colors.DEEP_GREEN,
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     overflow: 'hidden',
//     position: 'relative',
//     backgroundColor: Colors.GREEN,
//      paddingVertical: 32,
//     paddingHorizontal: 22,
//   },

//   blurCard: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   greenOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(30, 50, 20, 0.5)',
//   },

//   loginText: {
//     fontSize: 34,
//     fontFamily: Fonts.MEDIUM,
//     color: Colors.WHITE,
//     marginBottom: 9
//   },
//   rightPlace: {
//     fontSize: 18,
//     fontFamily: Fonts.REGULAR,
//     color: Colors.LIGHT_GREEN,
//     marginBottom: 30
//   },
//   description: {
//     color: Colors.WHITE,
//   },
//   rememberContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 7,
//     marginBottom: 35
//   },
//   checkboxUnselected: {
//     height: 17,
//     width: 17,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: Colors.BORDER_GREY,
//     backgroundColor: Colors.WHITE,
//   },
//   rememberMe: {
//     fontSize: 15,
//     fontFamily: Fonts.REGULAR,
//     color: Colors.WHITE,
//     marginLeft: 10
//   },
//   forgotPassword: {
//     fontSize: 15,
//     fontFamily: Fonts.REGULAR,
//     color: Colors.LIGHT_GREEN,
//   },
//   dontHaveAccount: {
//     fontSize: 18,
//     fontFamily: Fonts.REGULAR,
//     color: Colors.WHITE,
//     alignSelf: 'center'
//   },
//   signup: {
//     fontSize: 18,
//     fontFamily: Fonts.REGULAR,
//     color: Colors.LIGHT_GREEN,
//   }
// });


import { Dimensions, Platform, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center", // centers content nicely on tall & small screens
  },
  topSection: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30
  },
  appIcon: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginTop: 30
  },
  greenOverlayCard: {
    width: width,
    marginTop: 50,
    paddingBottom: 30
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
  innerContent: {
    // zIndex: 1, // make sure all UI is above the blur
  },
  loginContainer: {
    alignSelf: "center",
    width: width * 0.9,
    borderWidth: 0.4,
    borderColor: Colors.WHITE,
    borderRadius: 33,
    shadowColor: Colors.DEEP_GREEN,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // backgroundColor: Colors.GREEN,
    paddingVertical: 32,
    paddingHorizontal: 22,
    marginBottom: 20,
    overflow: 'hidden', //used for android
  },
  loginText: {
    fontSize: 34,
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
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 35,
  },
  checkboxUnselected: {
    height: 17,
    width: 17,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.BORDER_GREY,
    backgroundColor: Colors.WHITE,
  },
  rememberMe: {
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
    marginLeft: 10,
  },
  forgotPassword: {
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    color: Colors.LIGHT_GREEN,
  },
  dontHaveAccount: {
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
    alignSelf: "center",
    marginTop: 20,
  },
  signup: {
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
    color: Colors.LIGHT_GREEN,
  },
});

