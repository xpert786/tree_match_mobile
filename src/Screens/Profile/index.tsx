import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { CommonActions } from '@react-navigation/native';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const Profile = ({ navigation }: any) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');

  const restApiToGetProfile = async () => {
    try {
      setLoading(true);

      const response = await getRequest(ApiConstants.USER_PROFILE);

      console.log("Profile API Response:", JSON.stringify(response.data));
      console.log("HTTP Status Code restApiToGetProfile:", response?.status);

      if (response?.status === 200 || response?.status === 201) {
        const profileData = response.data?.data || response.data || response;
        console.log("Profile data:", profileData);

        setUserProfile(profileData);
      } else {
        setAlertTitle(response?.message || "Failed to load profile");
        setShowAlertModal(true);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setAlertTitle("Unable to load profile");
      setShowAlertModal(true);
    } finally {
      setLoading(false);
    }
  };

  const tapOnLogout = async () => {
    await removeAccessToken();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Splash" }],
      })
    );
  };

  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem(StringConstants.ACCESS_TOKEN);
      console.log('Access token removed successfully');
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  };

  const getProfileField = (field: any) => {
    if (!userProfile) return "Loading...";

    return userProfile[field] ||
      userProfile.data?.[field] ||
      "Not available";
  };

  useEffect(() => {
    restApiToGetProfile();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Loader visible={loading && !userProfile} />

      {showAlertModal && (
        <AlertModal
          visible={showAlertModal}
          title={alertTitle}
          onOkPress={() => {
            setAlertTitle('');
            setShowAlertModal(false);
          }}
        />
      )}

      <Header title={StringConstants.PROFILE} />

      <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingTop: 24 }}>

        {/* Profile view */}
        <View style={{ overflow: 'hidden', marginBottom: 22 }}>
          <View style={styles.profileContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image source={Images.ic_profile} style={styles.profileWrapper} />
              </View>
              <View style={styles.profileDetail}>
                <Text style={styles.name}>
                  {getProfileField('full_name')}
                </Text>
                <Text style={styles.address}>
                  {getProfileField('email')}
                </Text>

              </View>
            </View>
          </View>
        </View>

        {/* Plan view */}
        <View style={{ overflow: 'hidden', marginBottom: 22 }}>
          <View style={styles.profileContainer}>
            <View style={styles.profileDetail}>
              <Text style={styles.freePlan}>{StringConstants.FREE_PLAN}</Text>
              <Text style={styles.notSubscribe}>{StringConstants.NOT_SUBSCRIBE}</Text>
            </View>
            <TouchableOpacity style={styles.upgradePlanBtn}>
              <Text style={styles.upgradePlan}>{StringConstants.UPGRADE_PLAN}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick actions */}
        <View style={{ overflow: 'hidden', marginBottom: 22 }}>
          <View style={styles.settingsContainer}>
            <Text style={[styles.freePlan, { marginBottom: 5 }]}>{StringConstants.QUICK_ACTIONS}</Text>
            <View style={styles.horizontalLine} />

            <Pressable style={styles.optionsWrapper} onPress={() => navigate(ScreenConstants.PARCELS)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Images.ic_two_leaves} />
                <Text style={styles.options}>{StringConstants.MY_PARCELS}</Text>
              </View>
              <Image source={Images.ic_arrow_right} style={{ alignSelf: 'center' }} />
            </Pressable>
            <View style={styles.horizontalLine} />

            <Pressable style={styles.optionsWrapper} onPress={() => navigate(ScreenConstants.MY_PLANTS)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Images.ic_leaf} />
                <Text style={styles.options}>{StringConstants.MY_PLANTS}</Text>
              </View>
              <Image source={Images.ic_arrow_right} style={{ alignSelf: 'center' }} />
            </Pressable>
            <View style={styles.horizontalLine} />

            <Pressable style={styles.optionsWrapper} onPress={() => navigate(ScreenConstants.SUBSCRIPTION_PLANS)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Images.ic_card} />
                <Text style={styles.options}>{StringConstants.PLAN_AND_SUBSCRPTION}</Text>
              </View>
              <Image source={Images.ic_arrow_right} style={{ alignSelf: 'center' }} />
            </Pressable>
            <View style={styles.horizontalLine} />

            <Pressable style={styles.optionsWrapper} onPress={() => navigate(ScreenConstants.NOTIFICATIONS)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Images.ic_reminder} />
                <Text style={styles.options}>{StringConstants.NOTIFICATION_AND_REMINDERS}</Text>
              </View>
              <Image source={Images.ic_arrow_right} style={{ alignSelf: 'center' }} />
            </Pressable>
            <View style={styles.horizontalLine} />

            <Pressable style={styles.optionsWrapper} onPress={() => navigate(ScreenConstants.DOWNLOADS)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Images.ic_bookmark} />
                <Text style={styles.options}>{StringConstants.OFFLINE_DOWNLOADS}</Text>
              </View>
              <Image source={Images.ic_arrow_right} style={{ alignSelf: 'center' }} />
            </Pressable>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={tapOnLogout}>
          <Image source={Images.ic_logout} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;