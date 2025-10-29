import AsyncStorage from "@react-native-async-storage/async-storage";
import { StringConstants } from "./StringConstants";

  export const saveToken = async(token) => {
     try {
      if (token) {
        await AsyncStorage.setItem(StringConstants.ACCESS_TOKEN, token);
        console.log('AccessToken saved successfully:', token);
      } else {
        console.warn('No AccessToken found in response');
      }
     } catch (error) {
      console.error('Error saving AccessToken:', error);
    }
  }