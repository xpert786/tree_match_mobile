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
  treeView: {
    height: 388,
    width: width,
    backgroundColor: Colors.LILY_POND,
    borderBottomLeftRadius: 50
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
    zIndex: 999
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
  alerts: {
    fontSize: 30,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.FOREST_GREEN,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  listView: {
    marginHorizontal: 30,
    marginBottom: 20,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN,
    width: width * 0.75,
  },

  dropdownContainer: {
    marginTop: 6,
    marginLeft: 20, // indentation for dropdown
  },

  dropdownLabel: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY9,
    marginVertical: 4,
  },

  setAlertBtn: {
    height: 50,
    width: 115,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.FOREST_GREEN,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 10
  },
  setAlerts: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
  },
  aiSummaryContainer: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    margin: 20,
    marginTop: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  aiSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  aiSummaryText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  aiModelText: {
    fontSize: 12,
    // fontFamily: Fonts.ITALIC,
    color: Colors.GREY,
    textAlign: 'right',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
})