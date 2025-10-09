import React, { useRef, useState } from 'react';
import {  View, StatusBar, Text, Image, ImageBackground, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from './styles';
import { Images } from '../../Assets';
import { StringConstants } from '../../Theme/StringConstants';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';

const data = [
  { id: "1", img: Images.img_landscape },
  { id: "2", img: Images.img_landscape },
  { id: "3", img: Images.img_landscape },
  { id: "4", img: Images.img_landscape },
];

const plantsData = [
  { id: "1", img: Images.img_tree1 },
  { id: "2", img: Images.img_tree2 },
  { id: "3", img: Images.img_tree3 },
  { id: "4", img: Images.img_tree4 },
  { id: "5", img: Images.img_tree1 },
  { id: "6", img: Images.img_tree2 },
  { id: "7", img: Images.img_tree3 },
  { id: "8", img: Images.img_tree4 },
];

const notificationData = [
  { 
    id: "1", 
    img: Images.dummy_image1, 
    time: '11:45', 
    treeName: 'Oak Tree', 
    alert: false, 
    idealPlantTime: 'Ideal Planting Window:', 
    days: 'Aug 10 – Sept 5' ,
  },
  { 
    id: "2", 
    img: Images.ic_ladybug, 
    time: '15:20', 
    treeName: 'Aphids alert in your area', 
    alert: true, 
    idealPlantTime: '⚠️ Last reported:' , 
    days: '3 days ago' ,
  },
    { 
      id: "3", 
      img: Images.dummy_image2, 
      time: '17:27' , 
      treeName: 'Dogwood', 
      alert: false, 
      idealPlantTime: 'Ideal Planting Window:', 
      days: 'Aug 15 – Sept 15' 
    },
];
 

const Home = () => {

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
       {/* Header */}
       <View style={styles.shadowWrapper}>
          <View style={styles.tabWrapper}>
             <Image source={Images.ic_tree_match} style={styles.headerText} />
             <View style={styles.topViewRightIcons}>
              <TouchableOpacity onPress={()=> navigate(ScreenConstants.NOTIFICATIONS)}>
                 <Image source={Images.ic_notification} style={{marginRight: 15}} />
              </TouchableOpacity>
               <TouchableOpacity onPress={() => navigate(ScreenConstants.PROFILE)}>
              <Image source={Images.ic_profile} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
       {/* Parcels View */}
        <View style={styles.topView}>
           <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
             <Image source={Images.ic_soil} />
             <Text style={styles.myParcels}>{StringConstants.MY_PARCELS}</Text>
           </View>
           <TouchableOpacity onPress={()=>{navigate(ScreenConstants.PARCELS)}}>
            <Image source={Images.ic_right_arrow} />
           </TouchableOpacity>
        </View>

      <View>
       <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.imageContainer,
              {
                marginLeft: index === 0 ? 30 : 14,
                marginRight: index === data.length - 1 ? 30 : 0,
              },
            ]}
          >
            <Image source={item.img} style={styles.images} />
            <View style={styles.detailsWrapper}>
              <Text style={styles.name}>Cecil Clay Loam</Text>
              <Text style={styles.title}>8349 Bank Lane.</Text>
               <View style={styles.allDetails}>
                  <View style={styles.details}>
                     <Image source={Images.ic_moisture} />
                     <Text style={styles.mainHead}>{StringConstants.MOISTURE}</Text>
                     <Text style={[styles.mainHead, styles.value]}>30%</Text>
                   </View> 
                   <View style={styles.details}>
                     <Image source={Images.ic_acidity} />
                     <Text style={styles.mainHead}>{StringConstants.ACIDITY}</Text>
                     <Text style={[styles.mainHead, styles.value]}>6.5</Text>
                   </View>
                   <View style={styles.details}>
                     <Image source={Images.ic_fertility} />
                     <Text style={styles.mainHead}>{StringConstants.FERTILITY}</Text>
                     <Text style={[styles.mainHead, styles.value]}>High</Text>
                   </View>
                   <View style={styles.details}>
                     <Image source={Images.ic_minerals} />
                     <Text style={styles.mainHead}>{StringConstants.MINERALS}</Text>
                     <Text style={[styles.mainHead, styles.value]}>35%</Text>
                   </View>
               </View> 
            </View>  
          </View>
        )}
      />
      </View>

     {/* My plants View */}
       <View style={[styles.topView, {marginTop: 32}]}>
           <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
             <Image source={Images.ic_two_leaves} />
             <Text style={styles.myParcels}>{StringConstants.MY_PLANTS}</Text>
           </View>
           <TouchableOpacity onPress={()=>{navigate(ScreenConstants.MY_PLANTS)}}>
            <Image source={Images.ic_right_arrow} />
           </TouchableOpacity>
        </View> 
    
     <View>
       <FlatList
        data={plantsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.plantImageContainer,
              {
                marginLeft: index === 0 ? 30 : 14,
                marginRight: index === plantsData.length - 1 ? 30 : 0,
              },
            ]}
          >
            <Image source={item.img} style={styles.plantsImages} />
          </View>
        )}
      />
      </View>


      {/* Notifications View */}
       <View style={[styles.topView, {marginTop: 32}]}>
           <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
             <Image source={Images.ic_bell_notification} />
             <Text style={styles.myParcels}>{StringConstants.NOTIFICATIONS}</Text>
           </View>
           <TouchableOpacity onPress={()=>{navigate(ScreenConstants.NOTIFICATIONS)}}>
            <Image source={Images.ic_right_arrow} />
           </TouchableOpacity>
        </View> 

     <View>
       <FlatList
        data={notificationData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
        <View style={[styles.notificationContainer, {
          backgroundColor: item.alert ? Colors.RED : Colors.LIGHT_GREEN
        }]}>
          <View style={styles.notificationWrapper}>
            <View style={styles.timingsView}>
              <View style={[styles.circle, {borderColor: item.alert ? Colors.RED : Colors.LIGHT_GREEN}]}>
                <Text style={[styles.count, {color: item.alert ? Colors.RED : Colors.LIGHT_GREEN}]}>1</Text>
              </View>
              <Text style={styles.day}>Today</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.treeInfo}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                <Image source={item.img} style={styles.treeimage} />
                <Text
                  style={styles.treeName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.treeName}
                </Text>
              </View>

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


    </ScrollView>       
   </View>
  );
};
export default Home;



