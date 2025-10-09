import React from 'react';
import {  View, StatusBar, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { CommonActions } from '@react-navigation/native';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}: any) => {

   const tapOnLogout = async() => {
    await removeAccessToken()
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


  return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
       <Header title={StringConstants.PROFILE} /> 

       <ScrollView contentContainerStyle={{paddingBottom: 20, paddingTop: 24}}>

       {/* Profile view */}
       <View style={{ overflow: 'hidden', marginBottom: 22}}>     
        <View style={styles.profileContainer}>
          <View style={{flexDirection: 'row'}}>
           <View>
            <Image source={Images.ic_profile} style={styles.profileWrapper} />
            {/* <Image source={Images.ic_edit} style={styles.editIcon} /> */}
           </View>
           <View style={styles.profileDetail}>
             <Text style={styles.name}>Manik Yadav</Text>
             <Text style={styles.address}>yadavmanik@gmail.com</Text>
           </View>
           </View>
           {/* <Image source={Images.ic_arrow_right} style={styles.rightArrow} /> */}
        </View>
       </View>  

        {/* Plan view */}
       <View style={{ overflow: 'hidden', marginBottom: 22}}>     
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
        <View style={{ overflow: 'hidden', marginBottom: 22}}>     
        <View style={styles.settingsContainer}>
             <Text style={[styles.freePlan, {marginBottom: 5}]}>{StringConstants.QUICK_ACTIONS}</Text>
             <View style={styles.horizontalLine} />

             <Pressable style={styles.optionsWrapper} onPress={()=> navigate(ScreenConstants.PARCELS)}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <Image source={Images.ic_two_leaves} />
                 <Text style={styles.options}>{StringConstants.MY_PARCELS}</Text>
               </View>
               <Image source={Images.ic_arrow_right} style={{alignSelf: 'center'}} />
             </Pressable>
             <View style={styles.horizontalLine} />

             <Pressable style={styles.optionsWrapper} onPress={()=> navigate(ScreenConstants.MY_PLANTS)}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <Image source={Images.ic_leaf} />
                 <Text style={styles.options}>{StringConstants.MY_PLANTS}</Text>
               </View>
               <Image source={Images.ic_arrow_right} style={{alignSelf: 'center'}}/>
             </Pressable>
             <View style={styles.horizontalLine} />


             <Pressable style={styles.optionsWrapper} onPress={()=> navigate(ScreenConstants.SUBSCRIPTION_PLANS)}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <Image source={Images.ic_card} />
                 <Text style={styles.options}>{StringConstants.PLAN_AND_SUBSCRPTION}</Text>
               </View>
               <Image source={Images.ic_arrow_right} style={{alignSelf: 'center'}}/>
             </Pressable>
             <View style={styles.horizontalLine} />


             <Pressable style={styles.optionsWrapper} onPress={()=> navigate(ScreenConstants.NOTIFICATIONS)}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <Image source={Images.ic_reminder} />
                 <Text style={styles.options}>{StringConstants.NOTIFICATION_AND_REMINDERS}</Text>
               </View>
               <Image source={Images.ic_arrow_right} style={{alignSelf: 'center'}}/>
             </Pressable>
             <View style={styles.horizontalLine} />

             <Pressable style={styles.optionsWrapper} onPress={()=> navigate(ScreenConstants.DOWNLOADS)}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <Image source={Images.ic_bookmark} />
                 <Text style={styles.options}>{StringConstants.OFFLINE_DOWNLOADS}</Text>
               </View>
               <Image source={Images.ic_arrow_right} style={{alignSelf: 'center'}}/>
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



