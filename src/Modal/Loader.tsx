import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "../Theme/Colors";
import { Images } from "../Assets";

interface LoaderProps {
  visible: boolean;
}

const { width, height } = Dimensions.get("window");

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  if (!visible) return null; // Don't render if not visible

  return (
    <View style={styles.overlay}>
        <ActivityIndicator size="large" color={Colors.BLACK} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent background
    zIndex: 1000, // ensures it's above other views
  },

});

export default Loader;


// import React from "react";
// import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";
// import { Colors } from "../Theme/Colors";

// interface LoaderProps {
//   visible: boolean; 
// }

// const Loader: React.FC<LoaderProps> = ({ visible }) => {
//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="fade"
//     >
//       <View style={styles.overlay}>
//         <ActivityIndicator size="large" color={Colors.BLACK} />
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.3)", // dark semi-transparent background
//   },
// });

// export default Loader;
