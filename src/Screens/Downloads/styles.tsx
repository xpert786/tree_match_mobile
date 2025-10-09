import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
    marginLeft: 20,
    paddingRight: 20,
  },

  placeName: {
    fontSize: 22,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
    marginBottom: 7,
    flexShrink: 1,
  },
  soilView: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    marginTop: 0,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: 0,
  },


  soilContainer: {
    backgroundColor: Colors.WHITE,
    width: width * 0.85,
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTER_GREY,
  },
  placesImage: {
    height: 90,
    width: 90,
    borderRadius: 12,
    alignSelf: 'center'
  },

  soilName: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: Colors.LIGHT_GREY,
  },
  boxView: {
    height: 36,
    width: 87,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ANTI_FLASH_WHITE,
    borderRadius: 16,
    flexDirection: 'row'
  },
  icons: {
    height: 28,
    width: 28
  },
  boxText: {
    fontSize: 13,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.DEEP_GREEN,
    marginLeft: 6
  },

});


