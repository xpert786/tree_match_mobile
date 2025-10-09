import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Images } from "../Assets"; // adjust import path
import { Colors } from "../Theme/Colors";

const { width } = Dimensions.get("window");

interface SearchInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  containerStyles ?: any
  tapOnRightIcon ?:any
  rightIcon ?: any
  leftIcon ?: any
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  containerStyles,
  tapOnRightIcon,
  rightIcon,
  leftIcon,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {/* Left icon */}
      <Image source={leftIcon ? leftIcon : Images.ic_search} style={styles.leftIcon} />

      {/* TextInput */}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.PLACEHOLDER_GREY}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />

      {/* Right icon */}
      <TouchableOpacity onPress={tapOnRightIcon}>
      <Image source={rightIcon ? rightIcon : Images.ic_microphone} style={styles.rightIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: width - 60, // 👈 full width minus 30 margin on each side
    marginHorizontal: 30,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: Colors.BORDER_GREY2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: Colors.WHITE,
  },
  leftIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  rightIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.BLACK,
  },
});
