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

  topView2: {
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
    marginBottom: 25
  },
   treeView: {
      height: 388,
      width: width,
      backgroundColor: Colors.LILY_POND,
      borderBottomLeftRadius: 50,
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
  parcelsText: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN,
    marginLeft: 30, 
    marginBottom: 10
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
    alignItems: 'center',
    marginTop: 5
  },
  appropriateItem:{
     alignItems: 'center',
  },
  treeTitle: {
    fontSize: 12,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DARK_GREYISH_BLUE,
    marginBottom: 4,
    textTransform: 'uppercase'
  },
  treeTitle2: {
    fontSize: 15,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.FOREST_GREEN,
  },
    soilWrapper: {
    borderWidth: 1,
    borderColor: Colors.WHITISH_GREY,
    borderRadius: 30,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,0.2)", // frosted glass effect
    marginBottom: 25
  },
  tabBarWrapper: {
    borderRadius: 30,
    overflow: 'hidden', // important to clip BlurView
  },
  tabBar: {
    height: 50,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  values: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN
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
    },
    limitationsText: {
      fontSize: 20,
      fontFamily: Fonts.MEDIUM,
      color: Colors.DARK_GREEN,
      letterSpacing: 1.5
    },
    moderateErosion: {
      fontSize: 15,
      fontFamily: Fonts.REGULAR,
      color: Colors.FOREST_GREEN,
    },
    diagram1:{
      height: 200,
      width: width * 0.9,
      resizeMode: 'contain' ,
      alignSelf: 'center',
    },
    diagram2:{
      height: 300,
      width: width * 0.9,
      resizeMode: 'contain' ,
      alignSelf: 'center',
      marginBottom: 15
    }
})