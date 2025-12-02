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
  images: {
    width: width,
    height: 346,
    borderBottomLeftRadius: 50
  },
  IIcon: {
    position: 'absolute',
    top: 290,
    right: 30
  },
  topView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20
  },
  myParcels: {
    fontSize: 28,
    fontFamily: Fonts.SEMIBOLD,
    marginLeft: 9,
    color: Colors.FOREST_GREEN,
    flex: 1
  },
  seeMoreBtn: {
    height: 37,
    width: 130,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.BORDER_GREY2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.FOREST_GREEN
  },
  seeMoreText: {
    fontSize: 13,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.WHITE,
    marginRight: 2
  },
  soilName: {
    fontSize: 23,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    marginHorizontal: 30,
    marginBottom: 25
  },
  soilName2:{
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN,
    marginHorizontal: 30,
    marginBottom: 15
  },
  allDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 25
  },
  details: {
    height: 120,
    width: width * 0.19,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.ANTI_FLASH_WHITE
  },
  mainHead: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    marginBottom: 5,
    marginTop: 5
  },
  value: {
    fontSize: 15,
    marginBottom: 0,
    marginTop: 0
  },
  iIcon: {
    position: 'absolute',
    height: 12,
    width: 12,
    top: 8,
    left: 8
  },
  limitationsBox: {
    width: width - 60,
    marginHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.RED2,
    backgroundColor: Colors.PINK,
    justifyContent: 'center',
    padding: 18,
    marginBottom: 22
  },
  limitationsText: {
    fontSize: 20,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BROWN,
    marginLeft: 10,
    letterSpacing: 1.5
  },
  moderateErosion: {
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    color: Colors.DARK_RED,
  },
 
 
  topView2: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 27,
    marginBottom: 14,
  },
  myParcels2: {
    fontSize: 21,
    fontFamily: Fonts.BOLD,
    marginLeft: 9,
    color: Colors.DEEP_GREEN,
  },
  seeMoreBtn2: {
    height: 37,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.BORDER_GREY2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  seeMoreText2: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    marginRight: 5
  },
  graphContainer: {
  height: 220,
  width: width - 60,
  marginHorizontal: 30,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: Colors.BORDER_GREY2,
  paddingVertical: 5, // smaller padding to fit better
  paddingHorizontal: 5,
  marginBottom: 25,
},
  phLevels:{
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
    marginLeft: 25,
    marginBottom: 2,
    marginTop: 5
  },
  graph:{
    height: 125,
    resizeMode: 'contain',
    width: width * 0.8,
  },
  treeDetailsWrapper:{
    height: 64,
    width: width - 60,
    marginHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.ANTI_FLASH_WHITE,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  treeImage:{
    height: 50,
    width: 50,
    backgroundColor: Colors.LILY_POND,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  plantName:{
    fontSize: 24,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
  },
  plantYear:{
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY8,
  },
  
plantingGuidanceWrapper: {
  height: 136,
  width: width - 60,
  marginHorizontal: 30,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: Colors.ANTI_FLASH_WHITE,
  marginBottom: 10,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 8,
},
treeImage2: {
  height: 122,
  width: 122,
  backgroundColor: Colors.LILY_POND,
  borderRadius: 20,
  resizeMode: 'cover',
},
hectare: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
treeName: {
  fontSize: 17,
  fontFamily: Fonts.BOLD,
  color: Colors.DEEP_GREEN,
  marginBottom: 3,
},
description: {
  fontSize: 17,
  fontFamily: Fonts.MEDIUM,
  color: Colors.GREY12,
  marginBottom: 5,
  lineHeight: 20,
},
hectareValue: {
  fontSize: 16,
  fontFamily: Fonts.MEDIUM,
  color: Colors.DEEP_GREEN,
  marginLeft: 5,
},
// Add these to your styles.js file
phDataContainer: {
  marginTop: 10,
  padding: 10,
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  marginHorizontal: 10,
},
phDataTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  marginBottom: 5,
  color: Colors.BLACK,
},
phDataList: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
},
phDataItem: {
  fontSize: 12,
  color: Colors.DARK_GREY,
  marginRight: 10,
  marginBottom: 5,
},
confidenceContainer: {
  backgroundColor: Colors.RED,
  padding: 15,
  borderRadius: 8,
  marginHorizontal: 20,
  marginTop: 10,
},
confidenceText: {
  color: Colors.WHITE,
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},
 
 
})