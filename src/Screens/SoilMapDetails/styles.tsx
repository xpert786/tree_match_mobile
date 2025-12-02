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
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN,
    marginHorizontal: 30,
    marginBottom: 12
  },
  dropdown: {
    height: 58,
    width: width - 60,
    borderRadius: 35,
    backgroundColor: Colors.FADE_WHITE,
    paddingLeft: 30,
    paddingRight: 7,
    marginHorizontal: 30,
    // marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 20,
    color: Colors.PLACEHOLDER_GREY,
    fontFamily: Fonts.REGULAR,
  },
  selectedTextStyle: {
    fontSize: 20,
    color: Colors.DEEP_GREEN,
    fontFamily: Fonts.REGULAR,
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.DEEP_GREEN,
    fontFamily: Fonts.MEDIUM,   // 👈 font for dropdown list items
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  errorMessage: {
      color: '#E74C3C',
      fontSize: 10,
      fontFamily: Fonts.REGULAR,
      marginLeft: width * 0.1,
      marginBottom: 16,
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

  bottomButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 30,
    borderWidth: 1,
    borderColor: Colors.ANTI_FLASH_WHITE,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN,
    marginLeft: 5
  }
})