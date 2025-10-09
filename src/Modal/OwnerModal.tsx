import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  FlatList,
} from "react-native";
import { Images } from "../Assets";
import { Fonts } from "../Theme/Fonts";
import { Colors } from "../Theme/Colors";

const { height, width } = Dimensions.get("window");

const subtitles = [
  'The edges of my maple Leaves',
  'The new leaves on my apple tree',
  `My oak tree's leaves have black`,
  'Sticky clear drops on my car',
  'The new leaves on my apple tree',
  'Sticky clear drops on my car',
  `My oak tree's leaves have black`,
  
]
type Props = {
  visible: boolean;
  onClose: () => void;
};

  const CLOSE_THRESHOLD = Math.max(50, width * 0.12); // distance needed to trigger close

  const OwnerModal: React.FC<Props> = ({ visible, onClose }) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(0); // 👈 state to track selected item

    const baseAnim = useRef(new Animated.Value(-width)).current; // base position: -width (hidden) or 0 (visible)
    const dragAnim = useRef(new Animated.Value(0)).current; // temporary drag offset (negative values while swiping left)

  // animate base in/out when `visible` changes
  useEffect(() => {
    Animated.timing(baseAnim, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // reset drag value after closing (defensive)
      if (!visible) dragAnim.setValue(0);
    });
  }, [visible, baseAnim, dragAnim]);

  // PanResponder to handle swipe-left
  const panResponder = useRef(
    PanResponder.create({
      // only start pan responder if the gesture is predominantly horizontal
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 6 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderMove: (_, gs) => {
        // follow the finger only when dragging left; ignore right drags
        const dx = Math.min(0, gs.dx); // negative or 0
        dragAnim.setValue(dx);
      },
      onPanResponderRelease: (_, gs) => {
        const dx = gs.dx;
        const vx = gs.vx;

        // if user swiped far enough (or with enough leftward velocity) => close
        if (dx < -CLOSE_THRESHOLD || vx < -0.5) {
          // animate base position to -width (closed)
          Animated.timing(baseAnim, {
            toValue: -width,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            dragAnim.setValue(0);
            onClose();
          });
        } else {
          // revert dragAnim back to 0 (snap back)
          Animated.spring(dragAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(dragAnim, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  // Combined translation: base (open/closed) + drag offset
  const translateX = Animated.add(baseAnim, dragAnim);

  // backdrop tap handler that animates out then calls onClose
  const closeWithAnimation = () => {
    Animated.timing(baseAnim, {
      toValue: -width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      dragAnim.setValue(0);
      onClose();
    });
  };

   return (
    <Modal visible={visible} animationType="none" transparent>
      {/* Dim background */}
      <TouchableWithoutFeedback  onPress={closeWithAnimation}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Sliding modal with swipe-to-close */}
       <Animated.View
        style={[styles.modalContent, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.row}>
          <Image source={Images.ic_dummy_profile} style={styles.profileImage} />
          <View style={styles.textColumn}>
            <Text style={styles.ownerLabel}>OWNER</Text>
            <Text style={styles.ownerName}>Andrew Smith</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.chatButton}>
          <Image source={Images.ic_plus} />
          <Text style={styles.newChat}>New Chat</Text>
        </TouchableOpacity>
        <Image source={Images.ic_line} style={{alignSelf: 'center', marginVertical: 40}} />
        <Text style={styles.mainText}>Main</Text>

        <TouchableOpacity style={styles.deleteView}>
          <Image source={Images.ic_delete} style={styles.deleteIcon} />
          <Text style={styles.clearHistoryText}>Clear conversations</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.deleteView, {marginBottom: 10}]}>
          <Image source={Images.ic_history} />
          <Text style={styles.clearHistoryText}>History</Text>
        </TouchableOpacity>

        <FlatList
           data={subtitles}
           keyExtractor={(item, index) => `${index}`}
           contentContainerStyle={{ paddingBottom: 20 }}
           ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
           renderItem={({ item, index }) => {
            const isSelected = selectedIndex === index;
            return (
              <TouchableOpacity
                style={[
                  styles.historyList,
                  { backgroundColor: isSelected ? Colors.YELLOWISH_GREEN : Colors.WHITE },
                ]}
                onPress={() => setSelectedIndex(index)} // 👈 update state
              >
                <Text style={styles.clearHistoryText}>{item}</Text>
              </TouchableOpacity>
            );
          }}
         />       

      </Animated.View>
    </Modal>
  );
};

export default OwnerModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    position: "absolute",
    left: 0,
    top: 0,
    height: height,
    width: width * 0.65,
    backgroundColor: "white",
    padding: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    resizeMode: "cover",
  },
  textColumn: {
    flexDirection: "column",
  },
  ownerLabel: {
    fontSize: 11,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
  },
  ownerName: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
  },
  chatButton: {
    borderColor: Colors.WHITE2,
    borderWidth: 1.17,
    borderRadius: 10,
    height: 47,
    width: width * 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  newChat: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginLeft: 10,
  },
  mainText:{
    fontSize: 11,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    textTransform: 'uppercase',
    marginLeft: 10,
    marginBottom: 10
  },
  deleteView:{
    flexDirection: 'row',
    paddingVertical: 10,
    marginLeft: 10,
  },
  clearHistoryText:{
     fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    marginLeft: 15
  },
  deleteIcon:{
    height: 24,
    width: 24,
    tintColor: Colors.FOREST_GREEN
  },
  historyList:{
    width: width * 0.5,
    paddingVertical: 8,
    borderRadius: 10
  }

 
});
