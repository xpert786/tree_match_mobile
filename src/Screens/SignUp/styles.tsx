// import { Dimensions, StyleSheet } from "react-native";
// import { Fonts } from "../../Theme/Fonts";
// import { Colors } from "../../Theme/Colors";
// const {height, width} = Dimensions.get('window')

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.GREEN,
//   },
//   backgroundImage:{
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     // backgroundColor: 'red',
//     top: height * 0.15,
//   },
//    scrollContent: {
//     flexGrow: 1,
//     justifyContent: "flex-end",
//     paddingBottom: 5,
//   },

//   appIcon:{
//     position: 'absolute',
//     top: 70,
//     left: (width * 0.9 - 20) / 2,
//     // left: (width * 0.9 - 98) / 2,
//     height: 60,
//     width: 60
//   },

// loginCard: {
//   alignSelf: 'center',
//   bottom: 36,
//   width: width * 0.9,
//   paddingVertical: 32,
//   paddingHorizontal: 22,
//   borderRadius: 33,
// },

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
//      fontSize: 34,
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
//   description:{
//     color: Colors.WHITE,
//   },
//  continueContainer: {
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     justifyContent: 'space-evenly', 
//     marginBottom: 20 
//   },
//   horizontalLine: {
//     width: width * 0.2,
//     height: 1,
//     backgroundColor: 'rgba(185, 185, 185, 1)'
//   },
//   orContinueWith: {
//     fontSize: 14,
//     fontFamily: Fonts.REGULAR,
//     color: Colors.WHITE,
//   },
//   button: {
//     height: 65,
//     width: width * 0.8,
//     backgroundColor: Colors.WHITE,
//     borderRadius: 35,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });


import { Dimensions, Platform, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN,
  },
  treeBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    resizeMode: "cover",
  },
  backgroundImage: {
    position: "absolute",
    bottom: 0,
    width,
    top: 50,
    // top: height * 0.2, // start lower so icon has space
    paddingBottom: 20
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  appIcon: {
    top: 20,
    alignSelf: "center",
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  loginContainer: {
    alignSelf: "center",
    width: width * 0.9,
    borderWidth: 0.4,
    borderColor: Colors.WHITE,
    paddingVertical: 32,
    paddingHorizontal: 22,
    borderRadius: 33,
    shadowColor: Colors.DEEP_GREEN,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginTop: 120, // ensure not overlapping app icon
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
  continueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  horizontalLine: {
    width: width * 0.2,
    height: 1,
    backgroundColor: "rgba(185, 185, 185, 1)",
  },
  orContinueWith: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
  },
  button: {
    height: 65,
    width: width * 0.8,
    backgroundColor: Colors.WHITE,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
