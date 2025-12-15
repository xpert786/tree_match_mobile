import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/Routes/MainStack";
import { navigationRef } from "./src/Utils/NavigationService";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from 'toastify-react-native';
import { OfflineDownloadsProvider } from "./src/Context/OfflineDownloadsContext";
import Toast from 'react-native-toast-message';


const App = () => {
  return (
    <SafeAreaProvider>
      <OfflineDownloadsProvider> 
          <NavigationContainer ref={navigationRef}>
              <ToastManager position="top" useNativeIcons={false} />
              <MainStack />
          </NavigationContainer>
          <Toast />
      </OfflineDownloadsProvider>
    </SafeAreaProvider>
  );
};

export default App;
