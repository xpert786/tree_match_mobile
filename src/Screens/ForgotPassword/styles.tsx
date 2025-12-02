import { Dimensions, Platform, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const {height, width} = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN,
  },
  treeBackground: {
    position: "absolute",
    top: 0,
    width: width,
    height: height,
    resizeMode: "cover",
  },

  backgroundImage: {
    flex: 1,
    width: width,
    justifyContent: "flex-end",
    paddingBottom: 20
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  appIcon: {
    marginTop: 50,
    marginBottom: 70,
    alignSelf: "center",
  },
  loginContainer: {
    width: width * 0.9,
    borderWidth: 0.3,
    borderColor: Colors.WHITE,
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 22,
    borderRadius: 33,
    shadowColor: Colors.DEEP_GREEN,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 20, // so bottom edges are visible
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
  },
});

