import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Theme/Colors";
import { Fonts } from "../../Theme/Fonts";
const { height, width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // push shadow downward
    shadowOpacity: 0.2, // stronger shadow
    shadowRadius: 6, // softer blur
    elevation: 20, // stronger Android shadow
    backgroundColor: "transparent",
  },
  headerText: {
    width: 112.9,
    height: 15.6
  },
  tabWrapper: {
    height: 120,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingTop: 35
  },
  topViewRightIcons: {
    flexDirection: 'row',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: 30,
    marginBottom: 21,
    marginTop: 29
  },
  myParcels: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    marginLeft: 9,
    color: Colors.DEEP_GREEN,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    height: height * 0.45,
    width: width * 0.85,
  },
  images: {
    height: height * 0.45,
    width: width * 0.85,
    resizeMode: 'cover'
  },
  detailsWrapper: {
    height: 190,
    width: width * 0.77,
    backgroundColor: Colors.PALE_YELLOW,
    position: 'absolute',
    borderRadius: 20,
    alignSelf: 'center',
    top: 17
  },
  name: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    marginLeft: 15,
    color: Colors.DEEP_GREEN,
    marginTop: 10
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    marginLeft: 15,
    color: Colors.FOREST_GREEN,
    marginBottom: 10
  },
  allDetails: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  details: {
    height: 100,
    width: 65,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WARM_GREEN
  },
  mainHead: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    marginBottom: 5
  },
  value: {
    fontSize: 15,
    marginBottom: 0
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
    resizeMode: 'cover',
    height: 70,
    width: 70,
    borderRadius: 20,
  },
  notificationContainer: {
    width: width * 0.85,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },
  notificationWrapper: {
    backgroundColor: Colors.WHITE,
    width: width * 0.84,
    height: 120,
    alignSelf: 'flex-end',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12
  },
  timingsView: {
    justifyContent: 'space-between',
  },
  circle: {
    height: 39,
    width: 39,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  count: {
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
  },
  day: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.LIGHT_GREY
  },
  time: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN
  },
  verticalLine: {
    height: 90,
    width: 1,
    alignSelf: 'center',
    backgroundColor: Colors.LIGHTER_GREY,
    marginHorizontal: 10
  },
  treeInfo: {
    justifyContent: 'center',
    flex: 1,
    marginRight: 15,
    paddingRight: 15,
  },
  treeimage: {
    height: 40,
    width: 40,
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 10,       // spacing between image and text
    alignSelf: 'center',   // ensure vertical centering
  },

  treeName: {
    fontSize: 17,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN,
    flex: 1,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  idealTime: {
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN,
    marginRight: 5
  },
  days: {
    fontSize: 15,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN
  },
  crossIcon: {
    position: 'absolute',
    right: 15,
    top: 15
  },
  demoBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.FOREST_GREEN,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  demoBadgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.WHITE,
    fontFamily: Fonts.MEDIUM,
  },
  plantName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.DARK_GREYISH_BLUE,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: Fonts.MEDIUM,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginHorizontal: 30,
    marginTop: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.DARK_GREYISH_BLUE,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: Fonts.SEMIBOLD,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.GREY9,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: Fonts.REGULAR,
  },
  getStartedButton: {
    backgroundColor: Colors.FOREST_GREEN,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  getStartedButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
  },

});


