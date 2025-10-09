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
  profileContainer:{
    height: 80,
    width: width - 60,
    marginHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.LIGHTER_GREY,
  },
  profileWrapper:{
     height: 52,
     width: 52,
  },
  editIcon:{
    position: "absolute",
    bottom: -2,
    right: -2
  },
  profileDetail:{
    flexDirection: 'column',
    marginLeft: 14,
    
  },
  name:{
    fontSize: 20,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACKISH_BROWN
  },
  address:{
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.SILVER_GREY
  },
  rightArrow:{
    alignSelf: 'center'
  },
  freePlan:{
    fontSize: 20,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN
  },
  notSubscribe:{
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY2
  },
  upgradePlanBtn:{
    width: 114,
    height: 34,
    borderRadius: 10,
    borderColor: Colors.LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    // alignSelf: 'center'
  },
  upgradePlan:{
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.LIGHT_GREEN
  },
  settingsContainer:{
    height: 305,
    width: width - 60,
    marginHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    padding: 17,
    borderWidth: 1,
    borderColor: Colors.LIGHTER_GREY,

    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 2, // Android shadow
  },
  horizontalLine:{
    height: 1,
    width: width * 0.78,
    backgroundColor: Colors.GREY3,
  },
  optionsWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  options:{
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY4,
    marginLeft: 20
  },
  logoutBtn:{
    borderWidth: 1,
    borderRadius: 45,
    borderColor: Colors.REDDISH_BROWN,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 100,
    paddingVertical: 12,
    flexDirection: 'row'
  },
  logoutText:{
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.REDDISH_BROWN,
    marginLeft: 12
  }
});


