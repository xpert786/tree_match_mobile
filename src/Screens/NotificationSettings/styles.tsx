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
  alertsView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 0.6,
    borderBottomColor: Colors.GREY9,
  },
  leftText:{
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY10
  }

})