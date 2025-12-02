import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 14,
    marginTop: 20
  },
  myParcels: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    marginLeft: 9,
    color: Colors.DEEP_GREEN,
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
  allView: {
    height: 43,
    width: 63,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.FOREST_GREEN,
    borderRadius: 30,
    marginLeft: 30,
    marginBottom: 14
  },
  allText: {
    fontSize: 18,
    fontFamily: Fonts.MEDIUM,
    color: Colors.TINTED_WHITE
  },
  cardView: {
    height: 232,
    width: width * 0.41,
    backgroundColor: Colors.PRIMARY_GREEN,
    borderRadius: 22,
    alignSelf: 'center',
    marginBottom: 20
  },

  treeImage: {
    height: 182,
    width: width * 0.41,
    backgroundColor: Colors.LILY_POND,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden", // ensures rounded corners apply to Image & text
  },

  treePic: {
    height: 140,
    width: width * 0.35,
    resizeMode: "contain",
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
    // backgroundColor: 'red'
  },
  bookmark: {
    position: "absolute",
    right: 6,
    top: 9
  },
  treeName: {
    position: "absolute",  // 👈 overlay on top of image
    bottom: 30,            // push upward from bottom of image
    left: 13,
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
    zIndex: 999,
    marginBottom: -3,
    paddingRight: 15
  },

  timeYears: {
    position: "absolute",  // 👈 overlay too
    bottom: 12,            // just below treeName
    left: 13,
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY8,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },

  feetWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '70%',   // prevents text from eating all space
  },

  feet: {
    fontSize: 14,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE,
    marginLeft: 6,
    marginRight: 4
  },
  searchButton: {
    backgroundColor: '#006400',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 10,
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButton: {
    backgroundColor: Colors.LIGHT_GREY,
  },

  confirmButton: {
    backgroundColor: Colors.FOREST_GREEN,
  },

  cancelButtonText: {
    fontSize: 16,
    color: Colors.GREY7,
    fontFamily: Fonts.MEDIUM, // ✅ यहाँ भी add करें
  },

  confirmButtonText: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: Fonts.MEDIUM, // ✅ यहाँ भी add करें
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    marginHorizontal: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
})