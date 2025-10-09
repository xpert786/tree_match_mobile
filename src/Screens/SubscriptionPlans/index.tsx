import React from 'react';
import {  View, StatusBar, Text, Image, TouchableOpacity, ImageBackground, Dimensions, Alert } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import Carousel from 'react-native-reanimated-carousel';
import { Colors } from '../../Theme/Colors';
const {width} = Dimensions.get('screen')

const data = [
    {
        title : 'Pro Monthly',
        price: '($4.99)',
        color: Colors.LIGHT_GREEN,
        priceColor: Colors.FOREST_GREEN,
        tick: Images.ic_green_tick
    },
    {
        title : 'Pro Annual',
        price: '($39.99)',
        color: Colors.BLUE,
        priceColor: Colors.LIGHT_GREEN,
        tick: Images.ic_blue_tick,
        
    },
    {
        title : 'Free',
        price: '($0.00)',
        color: Colors.HOTPINK,
        priceColor: Colors.WHITE,
        tick: Images.ic_pink_tick,
        cross: Images.ic_cross
    },
]

const features = [
  "GPS + Soil",
  "Tree Recs",
  "Fact Sheets",
  "Planting Plan",
  "Health Tool",
  "Offline Mode",
  "Alerts & Reminders",
  "Parcel Saving",
  "AI Assistant",
];


const SubscriptionPlans = ({navigation}: any) => {
     return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
       <Header title={StringConstants.SUBSCRIPTION_PLANS} /> 
       <ImageBackground source={Images.img_subscription} style={{flex: 1}}>
         <Text style={styles.choosePlan}>Choose Your Plan</Text>
         <Text style={styles.unlockFeatures}>Unlock more power, <Text style={styles.features}>features, and possibilities</Text> upgrade your plan today!</Text>
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
             <Carousel
                loop
                width={width * 0.9} 
                data={data}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,   // shrink side cards a bit
                    parallaxScrollingOffset: 130,   // reduce offset so both sides are visible equally
                }}
                scrollAnimationDuration={800}
                renderItem={({ item }) => (
                  <View style={styles.cardView}>
                    <View style={[styles.topView, {backgroundColor: item.color}]}>
                    <Text style={styles.monthlyTag}>{item.title}</Text>
                    <Text style={[styles.price, {color: item.priceColor}]}>{item.price}</Text>
                    </View>

                    {features.map((feature, index) => {
                        // decide which icon to use
                        let icon = item.tick;
                        if (item.title === "Free" && [3, 4, 5, 8].includes(index)) {
                            icon = item.cross; // override with cross for Free plan
                        }

                        return (
                            <View style={styles.premiumFeaturesList} key={index}>
                                <Text style={styles.leftTags}>{feature}</Text>
                                <Image source={icon} />
                            </View>
                        );
                        })}
                  
                    <TouchableOpacity style={[styles.buttonView,{backgroundColor: item.color}]}
                     onPress={() => {
                            console.log("Selected Plan:", item.title);
                            console.log("Price:", item.price);
                            // 👉 you can navigate or set state here
                            // navigate(ScreenConstants.PAYMENT, { selectedPlan: item });
                        }}>
                     <Text style={styles.getStarted}>Get Started</Text>
                    </TouchableOpacity>
                 </View>
                )}
                />
            </View>
       </ImageBackground>
    </View>
   );
  };
export default SubscriptionPlans;