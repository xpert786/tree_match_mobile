import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 15,
    marginTop: 25
  },
  textContainer: {
    flexShrink: 1,
    marginRight: 10,
  },
  addNewBtn: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.FOREST_GREEN,
    borderRadius: 30,
    backgroundColor: Colors.LILY_POND,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  addNewText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN
  },
  parcelsText: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN
  },
  recommendationLine: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 30,
    marginBottom: 20
  },
  allView: {
    height: 43,
    width: 63,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.FOREST_GREEN,
    borderRadius: 30,
    marginRight: 26
  },
  allText: {
    fontSize: 18,
    fontFamily: Fonts.MEDIUM,
    color: Colors.TINTED_WHITE
  },
  soilTypeView: {
    height: 43,
    width: 140,
    borderWidth: 1,
    borderColor: Colors.WHITISH_GREY,
    borderRadius: 34,
    paddingHorizontal: 10,
  },
  soilTypePlaceholder: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN,
    marginLeft: 7,
  },
  leftIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginRight: 7,
  },
  itemTextStyle: {
    marginVertical: -10,
    paddingVertical: 5,
  },
  iconStyle: {
    tintColor: Colors.DEEP_GREEN,
  },
  rightContent: {
    flex: 1,
    marginLeft: 20,
    paddingRight: 20,
  },
  editableInput: {
    borderWidth: 1,
    borderColor: Colors.GREEN,
    borderRadius: 5,
    padding: 5,
    backgroundColor: Colors.WHITE,
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

  statsRow: {
    flexDirection: 'row',
    marginTop: 0,
  },


  soilContainer: {
    backgroundColor: Colors.WHITE,
    width: width * 0.85,
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTER_GREY,
    position: 'relative',  // 👈 make this container a positioned ancestor
    zIndex: 0,  
  },
  placesImage: {
    height: 90,
    width: 90,
    borderRadius: 12,
    alignSelf: 'center'
  },

  soilName: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: Colors.LIGHT_GREY,
  },
  boxView: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ANTI_FLASH_WHITE,
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: 6
  },
  icons: {
    height: 28,
    width: 28
  },
  boxText: {
    fontSize: 13,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
    marginLeft: 6
  },
  threeDots: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 10
  },
  modalView: {
    position: 'absolute',
    right: -20,
    top: 40,   // 👈 relative offset from 3-dots
    backgroundColor: Colors.WHITE,
    zIndex: 999,
    padding: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  modalButton: {
    height: 32,
    width: 99,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  modalIcons: {
    tintColor: Colors.GREY11,
    marginRight: 6
  },
  modalText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.GREY11,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  voiceIcon: {
    width: 24,
    height: 24,
  },
  listeningContainer: {
    backgroundColor: Colors.RED,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  listeningText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },


});


