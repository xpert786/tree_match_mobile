import React from 'react';
import {  View, StatusBar, Text, Image, TouchableOpacity, ScrollView, FlatList, Switch } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';


const NotificationSettings = () => {
    const [smartAlert, setSmartAlert] = React.useState(true)
    const [customReminder, setCustomReminder] = React.useState(true)
    const [seasonalTips, setSeasonalTips] = React.useState(false)
    const [syncCalender, setSyncCalender] = React.useState(true)

   return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
       <Header title={StringConstants.NOTIFICATION} /> 
       <View style={[styles.alertsView, {marginTop: 20}]}>
          <Text style={styles.leftText}>Smart Alerts</Text>
           <Switch
                value={smartAlert}
                onValueChange={()=> setSmartAlert(!smartAlert)}
                trackColor={{ false: "#ccc", true: Colors.GREEN2 }}
                thumbColor={Colors.WHITE}
              />
       </View>
       <View style={styles.alertsView}>
          <Text style={styles.leftText}>Custom Reminders</Text>
           <Switch
                value={customReminder} 
                onValueChange={()=> setCustomReminder(!customReminder)}
                trackColor={{ false: "#ccc", true: Colors.GREEN2 }}
                thumbColor={Colors.WHITE}
              />
       </View>
       <View style={styles.alertsView}>
          <Text style={styles.leftText}>Seasonal Tips</Text>
           <Switch
                value={seasonalTips}
                onValueChange={()=> setSeasonalTips(!seasonalTips)}
                trackColor={{ false: "#ccc", true: Colors.GREEN2 }}
                thumbColor={Colors.WHITE}
              />
       </View>
       <View style={styles.alertsView}>
          <Text style={styles.leftText}>Sync with Calendar</Text>
           <Switch
                value={syncCalender}
                onValueChange={()=> setSyncCalender(!syncCalender)}
                trackColor={{ false: "#ccc", true: Colors.GREEN2 }}
                thumbColor={Colors.WHITE}
              />
       </View>

    </View>
    );
  };
export default NotificationSettings;