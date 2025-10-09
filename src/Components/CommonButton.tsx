import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";

const { width } = Dimensions.get("window");

type Props = {
  buttonText: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled ?: boolean
};

const CommonButton: React.FC<Props> = ({ buttonText, onPress, disabled }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7} disabled={disabled}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  button: {
    height: 65,
    width: width * 0.8,
    backgroundColor: Colors.LIGHT_GREEN,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25

  },
  text: {
    color: Colors.WHITE,
    fontSize: 24,
    fontFamily: Fonts.MEDIUM,
    letterSpacing: 3
  },
});
