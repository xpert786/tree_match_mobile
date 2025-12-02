import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9'
  },
  treeView: {
    height: 388,
    width: width,
    backgroundColor: Colors.LILY_POND,
    borderBottomLeftRadius: 50,
    marginBottom: 50
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 29,
    alignItems: 'center',
    marginTop: 20,
  },
  rightIcons: {
    flexDirection: 'row',
  },
  treeName: {
    fontSize: 40,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
    flex: 1,
  },
  treeDetailsView: {
    flexDirection: 'row',
    flex: 1
  },
  leftDetailsView: {
    flex: 0.4,
    paddingLeft: 29,
  },
  name: {
    fontSize: 23,
    fontFamily: Fonts.REGULAR,
    color: Colors.FOREST_GREEN2,
    zIndex: 999,
    marginBottom: 20
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DARK_GREYISH_BLUE,
  },
  value: {
    fontSize: 20,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    zIndex: 999,
    flex: 1, 
    flexWrap: 'wrap'
  },
  treeImageView: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  treeImage: {
    height: 310,
    width: width * 0.6,
    resizeMode: 'cover'
  },
  iIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999
  },
  aboutText: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN,
    marginLeft: 30,
    marginBottom: 10
  },
  aboutDescription: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN,
    marginHorizontal: 30,
    lineHeight: 25,
    marginBottom: 25
  },
  appropriateView: {
    marginBottom: 25,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 5
  },
  appropriateItem:{
     alignItems: 'center',
      width: '30%',  
  },
  treeTitle: {
    fontSize: 12,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DARK_GREYISH_BLUE,
    marginBottom: 4,
    textTransform: 'uppercase',
    textAlign: 'center', 
  },
  treeTitle2: {
    fontSize: 15,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.FOREST_GREEN,
    textAlign: 'center',
  },
  photosView:{
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  photosImage:{
    height: 52,
    width: 52,
    borderRadius: 26,
    marginRight: 21,
    backgroundColor: Colors.FOREST_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6
  },
  belowText:{
    fontSize: 15,
    fontFamily: Fonts.BOLD,
    color: Colors.DARK_GREYISH_BLUE,
    textTransform: 'uppercase',
    marginLeft: 8
  },
  allPhotosWrapper: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  photos: {
    width: width * 0.16,
    height: width * 0.21,
    borderRadius: 17,
    resizeMode: 'cover',
    marginRight: 5,
  },
  morePhotosView: {
    backgroundColor: Colors.RED_20,
    width: width * 0.16,
    height: width * 0.21,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreItems: {
    fontSize: 13,
    fontFamily: Fonts.BOLD,
    color: Colors.DARK_GREYISH_BLUE,
  },
    allDetails: {
      paddingHorizontal: 30,
      marginBottom: 25
    },
    details: {
      height: 110,
      width: 90,
      borderRadius: 20,
      justifyContent: 'center',
      backgroundColor: Colors.WHITE,
      borderWidth: 1,
      borderColor: Colors.ANTI_FLASH_WHITE
    },
    mainHead: {
      fontSize: 12,
      fontFamily: Fonts.SEMIBOLD,
      color: Colors.DARK_GREYISH_BLUE,
      marginTop: 5,
      textTransform: 'uppercase',
      textAlign: 'center'
    },
    value2: {
      fontSize: 15,
      marginBottom: 0,
      marginTop: 0,
      fontFamily: Fonts.SEMIBOLD,
      color: Colors.FOREST_GREEN,
      textAlign: 'center'
    },
  limitationsBox: {
    width: width - 60,
    marginHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.FOREST_GREEN,
    backgroundColor: Colors.GREEN3,
    justifyContent: 'center',
    padding: 18,
    marginBottom: 22
  },
  limitationsText: {
    fontSize: 20,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DARK_GREEN,
    marginLeft: 10,
    letterSpacing: 1.5
  },
  moderateErosion: {
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    color: Colors.FOREST_GREEN,
  },
    bottomButtons: {
    alignSelf: 'flex-end',
    marginRight: 30,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: Colors.FOREST_GREEN,
    borderRadius: 30,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
  }

})