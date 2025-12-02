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
    width: 141,
    resizeMode: "contain",
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
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
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 15
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
  // styles.ts में नई styles add करें

  // Location Information Styles
  locationInfoContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },

  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  locationIcon: {
    width: 16,
    height: 16,
    tintColor: '#4CAF50',
    marginRight: 8,
  },

  locationTitle: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: '#666',
  },

  locationName: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
    marginBottom: 8,
  },

  soilTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  soilTypeLabel: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: '#666',
  },

  soilTypeValue: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },

  suggestionsCount: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: '#4CAF50',
    fontStyle: 'italic',
  },

  // Retry Button
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },

  retryText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
  },
locationInfo: {
  marginHorizontal: 20,
  marginTop: 15,
  padding: 15,
  backgroundColor: '#f8f9fa',
  borderRadius: 10,
  borderLeftWidth: 4,
  borderLeftColor: '#006400',
},
locationText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 5,
},
soilText: {
  fontSize: 14,
  color: '#666',
  fontStyle: 'italic',
},
})