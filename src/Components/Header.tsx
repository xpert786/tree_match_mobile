import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Images } from "../Assets";
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title?: string;
  showMessageIcon?: boolean;
  onPressMessage?: () => void;
  onPressBack?: () => void;
  showLeavesIcon?: boolean; // ✅ new prop
  rightIcon ?: any
}

const Header: React.FC<HeaderProps> = ({
  title,
  showMessageIcon = false,
  onPressMessage,
  onPressBack,
  showLeavesIcon = false,
  rightIcon
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.tabWrapper}>
        {/* Left side (Back button) */}
        <TouchableOpacity
          onPress={onPressBack ? onPressBack : () => navigation.goBack()}
          style={styles.backBtn}
        >
          <Image source={Images.ic_back_arrow} />
        </TouchableOpacity>

        {/* Center title + optional leaves icon */}
        <View style={styles.titleWrapper}>
          {showLeavesIcon && (
            <Image source={Images.ic_two_leaves} style={styles.leavesIcon} />
          )}
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right side (Message Icon - optional) */}
        {showMessageIcon ? (
          <TouchableOpacity
            onPress={onPressMessage}
            style={styles.rightIconBtn}
          >
            <Image source={rightIcon ? rightIcon : Images.ic_message} />
          </TouchableOpacity>
        ) : (
          <View style={styles.rightPlaceholder} />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 20,
    backgroundColor: Colors.WHITE,
  },
  tabWrapper: {
    height: 110,
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  backBtn: {
    paddingVertical: 10,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  leavesIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.RAISIN_BLACK,
  },
  rightIconBtn: {
    paddingVertical: 10,
  },
  rightPlaceholder: {
    width: 24,
  },
});
