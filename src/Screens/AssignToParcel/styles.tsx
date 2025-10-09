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

  soilName: {
    fontSize: 23,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    marginHorizontal: 30,
    marginBottom: 25
  },
  topView2: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 15,
  },
  textContainer: {
    flexShrink: 1,
    marginRight: 10,
  },
  seeMoreBtn: {
    height: 37,
    width: 123,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: Colors.BORDER_GREY2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  seeMoreText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    marginRight: 10
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

  cardView: {
    height: 114,
    width: 90,
    backgroundColor: Colors.PRIMARY_GREEN,
    borderRadius: 9,
    alignSelf: 'center',
    marginBottom: 20,
    marginRight: 15,   // 👈 spacing between horizontal cards
  },
  treeImage: {
    height: 89,
    width: 90,
    backgroundColor: Colors.LILY_POND,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    overflow: "hidden", // ensures rounded corners apply to Image & text
  },

  treePic: {
    height: 74,
    width: 67,
    resizeMode: "contain",
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  bookmark: {
    position: "absolute",
    right: 6,
    top: 9,
    height: 14,
    width: 14
  },
  treeName: {
    position: "absolute",  // 👈 overlay on top of image
    bottom: 25,            // push upward from bottom of image
    left: 13,
    fontSize: 8,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
    zIndex: 999,
    marginBottom: -7
  },

  timeYears: {
    position: "absolute",  // 👈 overlay too
    bottom: 8,            // just below treeName
    left: 13,
    fontSize: 7,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY8,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 8,
  },
  feet: {
    fontSize: 6,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE,
    marginLeft: 6,
    marginRight: 4
  },
  addedPlantsView: {
    height: 64,
    width: 228,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: Colors.BORDER_GREY2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 7
  },
  plantImage: {
    backgroundColor: Colors.GREY3,
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 10
  },
  treeName2: {
    fontSize: 17,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN,
  },
  years: {
    fontSize: 9,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY8,
  },
  dropdown: {
    height: 58,
    width: width - 60,
    borderRadius: 35,
    backgroundColor: Colors.WHITE,
    paddingLeft: 8,
    paddingRight: 7,
    marginHorizontal: 30,
    marginBottom: 25,
    borderColor: Colors.BORDER_GREY2,
    borderWidth: 1,
    justifyContent: 'center'
  },
  placeholderStyle: {
    fontSize: 15,
    color: Colors.PLACEHOLDER_GREY,
    fontFamily: Fonts.REGULAR,
    paddingLeft: 10
  },
  selectedTextStyle: {
    fontSize: 15,
    color: Colors.DEEP_GREEN,
    fontFamily: Fonts.REGULAR,
    paddingLeft: 10
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.DEEP_GREEN,
    fontFamily: Fonts.MEDIUM,   // 👈 font for dropdown list items
    paddingVertical: 12,
    paddingHorizontal: 20,
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "90%",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
})