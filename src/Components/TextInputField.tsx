import React from "react";
import { TextInput, StyleSheet, TextInputProps, View, Dimensions, Image, Text, Pressable } from "react-native";
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { Images } from "../Assets";
const { width } = Dimensions.get('window');

interface TextInputFieldProps extends TextInputProps {
  placeholder?: string;
  parentStyles ?: any
  inputStyles ?: any;
  showRightIcon?: boolean;
  onIconPress?: () => void;
  title?: string;
  icon ?: any
  iconStyles ?: any
  rightIconView ?: any
  errorMessage ?: any
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  parentStyles,
  inputStyles,
  placeholderTextColor,
  onIconPress,
  showRightIcon,
  title,
  icon,
  iconStyles,
  rightIconView,
  errorMessage,
  ...props
}) => {
  return (
     <View style={[styles.container, parentStyles]}>
      <View style={[styles.inputWrapper, inputStyles]}>
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : Colors.DEEP_GREEN}
          {...props}
        />
        {showRightIcon && (
          <Pressable onPress={onIconPress} style={[styles.iconWrapper, rightIconView]}>
            <Image source={icon} style={iconStyles} resizeMode="contain" />
          </Pressable>
        )}
         
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignSelf: "center",
  },
  inputWrapper: {
    height: 64,
    width: width * 0.8,
    borderRadius: 35,
    backgroundColor: Colors.FADE_WHITE,
    justifyContent: "center",
    alignSelf: 'center',
    paddingRight: 50,
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 25,
    height: '100%',
    color: Colors.DEEP_GREEN, 
    fontFamily: Fonts.REGULAR,
  },
  iconWrapper: {
    position: 'absolute',
    right: 18,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 20
  },
  errorMessage: {
      color: '#E74C3C',
      fontSize: 10,
      marginTop: 6,
      fontFamily: Fonts.REGULAR,
      marginLeft: 10
  },

});

export default TextInputField;



