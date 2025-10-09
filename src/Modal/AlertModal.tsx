
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import { Colors } from "../Theme/Colors";
import { Fonts } from "../Theme/Fonts";
import { Images } from "../Assets";

interface CommonModalProps {
  visible: boolean;
  title: string;
  onOkPress: () => void;
  onRequestClose?: () => void;
}

const AlertModal: React.FC<CommonModalProps> = ({
  visible,
  title,
  onOkPress,
  onRequestClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}                     // keep background visible
      animationType="fade"
      onRequestClose={onRequestClose}
      presentationStyle="overFullScreen"     // iOS: keep underlying view visible
      statusBarTranslucent={true}            // Android: allow overlay under status bar
    >
      {/* absolute fill overlay so it covers whole screen including notch/status bar */}
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>

          <TouchableOpacity style={styles.editButton} onPress={onOkPress}>
            <Text style={styles.actionText}>OK</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onOkPress} style={styles.crossIconView}>
            <Image source={Images.ic_close} style={styles.crossIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  // fill whole window and dim it — underlying screen will still be visible behind the rgba
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: 20,
    textAlign: "center",
    paddingTop: 20, 
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: Colors.PRIMARY_GREEN,
    width: 94,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  actionText: {
    color: Colors.WHITE,
    fontSize: 12,
    fontFamily: Fonts.SEMIBOLD,
    letterSpacing: 1
  },
  crossIconView:{
    position: 'absolute',
    top: 15,
    right: 15,
    
  },
  crossIcon:{
    height: 15,
    width: 15,
    padding: 10,
    tintColor: Colors.DEEP_GREEN
  }
});

