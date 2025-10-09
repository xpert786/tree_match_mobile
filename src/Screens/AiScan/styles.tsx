import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  image: {
    height: height,
    width: width,
    resizeMode: 'cover',
  },
  scanLines: {
    position: 'absolute',
    top: height * 0.12,
    left: width * 0.05
  },
  scanResultWrapper: {
    height: 200,
    width: width * 0.9,
    alignSelf: 'center',
    bottom: 250,
    position: 'absolute',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 15,
    overflow: 'hidden',
  },
  innerContent: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
  },

  treeImage: {
    resizeMode: 'contain',
  },
  textContent: {
    paddingLeft: 15,
    paddingRight: width * 0.3,
    paddingTop: 10
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.WHITE,
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY,
  },
  rightArrow: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT_GREEN,
    borderRadius: 16,
  },
  bgShadow: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },

  scanCircle: {
    position: 'absolute',
    top: height * 0.12,
    left: "20%",
    height: 250,
    width: 250,
    zIndex: 2, // keep above scroll
  },

  detailsScroll: {
    flex: 1,
    marginTop: height * 0.12 + 270, // push below circle
  },
  spotContainer: {
    position: "absolute",
    flexDirection: "row",   // spot -> line -> text
    alignItems: "center",
  },

  spotIcon: {
    width: 16,
    height: 16,
  },

  line: {
    width: 60,              // adjust length
    height: 2,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 6,
  },

  spotLabel: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
    // backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },

  // Positions (these keep the spot at correct circle points)
  firstSpot: {
    bottom: 90,
    left: 70,
  },
  secondSpot: {
    top: 40,
    left: 120,
  },
  thirdSpot: {
    top: 80,
    left: 80,
  },
  detailsTitle: {
    fontSize: 21,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.WHITE,
    marginHorizontal: 30,
    marginBottom: 5
  },
  descriptionForDetails: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
    marginHorizontal: 30,
    marginBottom: 7
  },
  detailsTitle2:{
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE,
    marginHorizontal: 30,
    marginBottom: 10
  },
  percentageImage:{
    height: 50,
    width: 54,
    alignSelf: 'center'
  },
  listContainer: {
    paddingHorizontal: 30, // padding on both sides,
    marginBottom: 15
  },
  relatedImages: {
    width: 80, // adjust size as you like
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover'
  },
  playIcon:{
    position: 'absolute',
    top: 20,
    left: 20
  },
  details:{
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.WHITE,
    marginHorizontal: 30
  }

});


