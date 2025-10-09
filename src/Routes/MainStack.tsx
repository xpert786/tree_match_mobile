import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../Screens/Splash";
import Login from "../Screens/Login";
import ForgotPassword from "../Screens/ForgotPassword";
import OtpVerification from "../Screens/OtpVerification";
import SignUp from "../Screens/SignUp";
import BottomTabNavigator from "./BottomTabNavigator";
import MyPlants from "../Screens/MyPlants";
import ParcelAlerts from "../Screens/ParcelAlerts";
import Notifications from "../Screens/Notifications";
import NotificationSettings from "../Screens/NotificationSettings";
import SoilMapDetails from "../Screens/SoilMapDetails";
import ParcelDetails from "../Screens/ParcelDetails";
import PlantingGuidance from "../Screens/PlantingGuidance";
import About from "../Screens/About";
import AssignToParcel from "../Screens/AssignToParcel";
import PlantingTips from "../Screens/PlantingTips";
import Reminders from "../Screens/Reminders";
import AiChat from "../Screens/AiChat";
import Downloads from "../Screens/Downloads";
import SubscriptionPlans from "../Screens/SubscriptionPlans";
import ResetPassword from "../Screens/ResetPassword";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash}  />
      <Stack.Screen name="Login" component={Login}  />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}  />
      <Stack.Screen name="OtpVerification" component={OtpVerification}  />
      <Stack.Screen name="SignUp" component={SignUp}  />
      <Stack.Screen name="ResetPassword" component={ResetPassword}  />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator}  />
      <Stack.Screen name="MyPlants" component={MyPlants}  />
      <Stack.Screen name="SoilMapDetails" component={SoilMapDetails}  />
      <Stack.Screen name="ParcelAlerts" component={ParcelAlerts}  />
      <Stack.Screen name="Notifications" component={Notifications}  />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings}  />
      <Stack.Screen name="ParcelDetails" component={ParcelDetails}  />
      <Stack.Screen name="PlantingGuidance" component={PlantingGuidance}  />
      <Stack.Screen name="About" component={About}  />
      <Stack.Screen name="AssignToParcel" component={AssignToParcel}  />
      <Stack.Screen name="PlantingTips" component={PlantingTips}  />
      <Stack.Screen name="Reminders" component={Reminders}  />
      <Stack.Screen name="AiChat" component={AiChat}  />
      <Stack.Screen name="Downloads" component={Downloads}  />
      <Stack.Screen name="SubscriptionPlans" component={SubscriptionPlans}  />
    </Stack.Navigator>
  );
};

export default MainStack;
