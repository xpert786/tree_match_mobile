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
  notificationContainer: {
    width: width * 0.85,
    // height: 120,
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
    // height: 120,
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
    width: 1,
    backgroundColor: Colors.LIGHTER_GREY,
    marginHorizontal: 10,
    alignSelf: "stretch",   // 👈 will stretch vertically inside parent row
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
  }


})