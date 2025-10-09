import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import MapScreen from "../Screens/MapScreen";
import Parcels from "../Screens/Parcels";
import AiScan from "../Screens/AiScan";
import Profile from "../Screens/Profile";
import { Images } from "../Assets";
import { Colors } from "../Theme/Colors";

const Tab = createBottomTabNavigator();

const icons: Record<string, any> = {
  Home: Images.ic_home,
  MapScreen: Images.ic_map,
  Parcels: Images.ic_small_plant,
  AiScan: Images.ic_stars,
  Profile: Images.ic_user,
};


const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.shadowWrapper}>
    <View style={styles.tabWrapper}>
      <View style={styles.tabContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isFirst = index === 0;
          const isLast = index === state.routes.length - 1;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused && styles.activeTabButton,
                // push the first and last buttons to touch border when focused
                isFocused && isFirst && { marginLeft: -10 },
                isFocused && isLast && { marginRight: -10 },
              ]}
            >
              <Image
                source={icons[route.name]}
                style={{
                  tintColor: isFocused ? Colors.WHITE : Colors.PRIMARY_GREEN,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
    </View>
  );
};



const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Parcels" component={Parcels} options={{ headerShown: false }} />
      <Tab.Screen name="AiScan" component={AiScan} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shadowWrapper: {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -3 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 12, // Android shadow
  backgroundColor: "transparent",
},
tabWrapper: {
  height: 100,
  backgroundColor: Colors.WHITE,
  justifyContent: "center",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: "hidden", // this time safe, shadow is in parent
},
  tabContainer: {
  flexDirection: "row",
  height: 50,
  borderRadius: 30,
  marginHorizontal: 30,
  backgroundColor: Colors.WHITE,
  justifyContent: "space-between",
  alignItems: "center",
  borderWidth: 1,
  borderColor: Colors.WHITISH_GREY,
  paddingHorizontal: 10, 
  
},
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  activeTabButton: {
    backgroundColor: Colors.PRIMARY_GREEN,
    height: 50,
    width: 78,
    borderRadius: 30,
  },
});

