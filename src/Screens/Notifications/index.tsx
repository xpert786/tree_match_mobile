import React from 'react';
import {  View, StatusBar, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';

const notificationData = [
  { 
    id: "1", 
    img: Images.dummy_image1, 
    time: '11:45', 
    treeName: 'Oak Tree', 
    alert: false, 
    idealPlantTime: 'Ideal Planting Window:', 
    days: 'Aug 10 – Sept 5' ,
    showImage: true,
    today: 'Today',
    count: 1,
    color: '#7DC94F',
  },
  { 
    id: "2", 
    img: Images.ic_ladybug, 
    time: '15:20', 
    treeName: 'Aphids alert in your area', 
    alert: true, 
    idealPlantTime: '⚠️ Last reported:' , 
    days: '3 days ago' ,
    showImage: true,
    today: 'Today',
    count: 1,
    color: '#C90000',
  },
  { 
    id: "3", 
    time: '16:20' , 
    alert: false, 
    idealPlantTime: 'Watering needed today:', 
    days: 'Soil moisture is low',
    showImage: false,
    today: 'Yesterday',
    color: '#40E2FF'
  },
    { 
    id: "4", 
    time: '16:20' , 
    alert: false, 
    idealPlantTime: 'Prune oak trees', 
    days: 'this weekend',
    showImage: false,
    today: 'Yesterday',
    color: '#FFFF28'
  },

];

const Notifications = () => {

   return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
       <Header title={StringConstants.NOTIFICATION} /> 
        <FlatList
            data={notificationData}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{paddingVertical: 30}}
            renderItem={({ item, index }) => (
            <View style={[styles.notificationContainer, {
            backgroundColor: item.color
            }]}>
            <View style={styles.notificationWrapper}>
                <View style={styles.timingsView}>
               { item.count && 
               <View style={[styles.circle, {borderColor: item.alert ? Colors.RED : Colors.LIGHT_GREEN}]}>
                    <Text style={[styles.count, {color: item.alert ? Colors.RED : Colors.LIGHT_GREEN}]}>{item.count}</Text>
                </View>}
                <Text style={styles.day}>{item.today}</Text>
                <Text style={styles.time}>{item.time}</Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.treeInfo}>
               {item.img &&
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                    <Image source={item.img} style={styles.treeimage} />
                    <Text
                    style={styles.treeName}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    >
                    {item.treeName}
                    </Text>
                </View>}

                <Text style={styles.idealTime}>
                    {item.idealPlantTime}{" "}
                    <Text style={styles.days}>{item.days}</Text>
                </Text>
                </View>
                <Image source={Images.ic_cross} style={styles.crossIcon} />
            </View>
            </View>
        )}
        />
       </View>
    );
 };
export default Notifications;