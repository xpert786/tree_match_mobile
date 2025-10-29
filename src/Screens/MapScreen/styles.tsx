import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    backgroundColor: '#F9F9F9',
    height: 90,
    width: width,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0
  },
  soilWrapper: {
    borderWidth: 1,
    borderColor: Colors.WHITISH_GREY,
    borderRadius: 30,
    marginLeft: 20,
    position: 'absolute',
    bottom: 110,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,0.2)", // frosted glass effect
  },
  tabBarWrapper: {
    borderRadius: 30,
    overflow: 'hidden', // important to clip BlurView
  },
  tabBar: {
    height: 50,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  values: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN
  },
  bottomRightIcon:{
    position: 'absolute',
    bottom: 110,
    right: 30
  },
  warningWrapper:{
    alignSelf: 'flex-end',
    marginRight: 12,
    position: 'absolute', 
    bottom: 170
  },
  warningBox:{
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    width: width * 0.8,
    zIndex: 999
  },
  triangle:{
    alignSelf: 'flex-end',
    marginRight: 30
  },
  warningMessage:{
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN
  },
  topView:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginHorizontal: 30,
   marginTop: 44
  },
  temperature:{
    height: 38,
    paddingHorizontal: 10,
    backgroundColor: Colors.GREY5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15
  },
  temp:{
    fontSize: 15,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DARK_GREY,
    marginLeft: 5
  },
  plusMinusView:{
    height: 50,
    width: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.GREY5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY7
  },
  minusView:{
    height: 50,
    width: 50,
    backgroundColor: Colors.GREY5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
   detailsContainer: {
    backgroundColor: '#F9F9F9',
    height: height * 0.5,
    width: width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    paddingTop: 20
  },
  line:{
    height: 4,
    width: 46,
    backgroundColor: Colors.FOREST_GREEN,
    borderRadius: 20,
    alignSelf:'center',
    marginVertical: 20
  },
  soilContainer: {
      alignSelf: 'center',
      borderRadius: 20,
      flexDirection: 'row',
      marginBottom: 25,
      marginHorizontal: 30,
      alignItems: 'center',
      
    },
    placesImage: {
      height: 145,
      width: 145,
      borderRadius: 22,
      alignSelf: 'center'
    },
  
    soilName: {
      fontSize: 16,
      fontFamily: Fonts.BOLD,
      color: Colors.LIGHT_GREY,
    },

    rightContent: {
    flex: 1,            
    marginLeft: 20,    
    paddingRight: 20,  
  },

  placeName: {
    fontSize: 22,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
    marginBottom: 7,
    flexShrink: 1, 
  },
  soilView: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    marginTop: 0,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  topPicksView:{
    backgroundColor: Colors.FOREST_GREEN,
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  topPicks:{
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.WHITE,
  },
  treeName:{
    fontSize: 17,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY6,
  },
  treeImage:{
    position: 'absolute',
    right: -10,
    width: 80,
    height: 88,
    resizeMode: 'contain'
  },
  preferredView:{
  flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 21,
  },
    myParcels: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    marginLeft: 9,
    color: Colors.DEEP_GREEN,
  },
    plantImageContainer: {
    borderRadius: 20,
    height: 70,
    width: 70,
    backgroundColor: Colors.SOFT_GREEN,
    alignItems: 'center',
    justifyContent: 'center'
  },
  plantsImages: {
    resizeMode: 'contain',
    height: 60,
    width: 60,
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
  iIcon:{
    position: 'absolute',
    height: 12,
    width: 12,
    top: 8,
    left: 8
  },
  limitationsBox:{
    width : width -60,
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
  limitationsText:{
    fontSize: 20,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BROWN,
    marginLeft: 10,
    letterSpacing: 1.5
  },
  moderateErosion:{
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    color: Colors.DARK_RED,
  },
  bottomButtons:{
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 30
  },
  bottomBtnView:{
    borderWidth: 1,
    borderColor: Colors.ANTI_FLASH_WHITE,
    padding: 12,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    borderRadius: 30,
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN,
    marginLeft: 5
  }
});


