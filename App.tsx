import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/Routes/MainStack";
import { navigationRef } from "./src/Utils/NavigationService";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from 'toastify-react-native';


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
          <ToastManager position="top" />
          <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
