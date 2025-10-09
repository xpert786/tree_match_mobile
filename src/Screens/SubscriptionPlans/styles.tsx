import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  choosePlan:{
    fontSize: 25,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE,
    alignSelf: 'center',
    marginTop: 10,
  },
  unlockFeatures:{
    fontSize: 17,
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
    textAlign: 'center',
    marginHorizontal: 34,
  },
  features:{
    color: Colors.LIGHT_GREEN
  },
  cardView:{
    height: height * 0.75,
    width: width * 0.75,
    borderRadius: 40,
    backgroundColor: Colors.WHITE
  },
  topView:{
     backgroundColor: Colors.LIGHT_GREEN,
     borderTopLeftRadius: 40,
     borderTopRightRadius: 40,
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 15,
     paddingVertical: height * 0.015
  },
  monthlyTag:{
    fontSize: 30,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE,
  },
  price:{
    fontSize: 20,
    fontFamily: Fonts.EXTRABOLD,
    color: Colors.FOREST_GREEN,
  },
  premiumFeaturesList:{
    flexDirection: 'row',
    marginLeft: 50,
    marginRight: 30,
    marginVertical: height * 0.008,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftTags:{
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.DEEP_GREEN,
  },
  buttonView:{
    width : width * 0.6,
    height: height * 0.07,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20
  },
  getStarted:{
    fontSize: 17,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.WHITE,
  }
})