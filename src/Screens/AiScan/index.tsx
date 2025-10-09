import React, { useRef, useState } from 'react';
import {  View, StatusBar, Text, Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { BlurView } from "@react-native-community/blur";
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { useFocusEffect } from '@react-navigation/native';
const {height, width} = Dimensions.get('screen')

const images = [
  Images.img_dummy_leaf5,
  Images.img_dummy_leaf6,
  Images.img_dummy_leaf7,
  Images.dummy_image6
];

const steps = [
  "1. Remove infected branches",
  "2. Apply Fungicides",
  "3. Monitor Tree Health",
];

const AiScan = () => {

  const [scanCompleted, setScanCompleted] = React.useState(false)
  const [showMoreDetails, setShowMoreDetails] = React.useState(false)
  

     useFocusEffect(
        React.useCallback(() => {
          setScanCompleted(false)
          setTimeout(() => {
              setScanCompleted(true)
          }, 2000);
        }, [])
      );


  return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
     
       <Header title={StringConstants.AI_TOOL} showMessageIcon={scanCompleted ? true : false}
         onPressMessage={()=> navigate(ScreenConstants.AI_CHAT)} /> 

       {(scanCompleted && !showMoreDetails) ? 
       <ImageBackground source={Images.dummy_image6}>
         <Image source={Images.bg_shadow_effect} style={styles.image} />
         <Image source={Images.ic_scan_circle} style={styles.scanCircle} />

         <View style={styles.scanResultWrapper}>
          {/* Blur background */}
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={15}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.3)"
          />
          
          {/* Foreground content */}
          <Image source={Images.img_tree7} style={styles.treeImage} />
          
          <View style={styles.textContent}>
            <Text style={styles.title}>Fiscus tree</Text>
            <Text style={styles.description}>
              The Fichus Benjamin, also known as the Weeping Fig, is a popular ornamental tree
              known for its glossy green foliage and graceful, arching branches.
            </Text>
          </View>

          {/* Absolutely positioned right arrow */}
          <TouchableOpacity style={styles.rightArrow} onPress={()=> setShowMoreDetails(true)}>
            <Image source={Images.ic_right_arrow} style={{ tintColor: Colors.WHITE }} />
          </TouchableOpacity>
        </View>
       </ImageBackground>
       : 
       (scanCompleted && showMoreDetails) ?

       <ImageBackground source={Images.dummy_image6} style={{ flex: 1 }}>
        {/* Shadow effect should be absolute, not covering everything */}
        <Image source={Images.bg_shadow_effect} style={styles.bgShadow} />

        {/* Circle stays fixed */}
        <ImageBackground source={Images.ic_scan_circle} style={styles.scanCircle}>
          <View style={[styles.spotContainer, styles.firstSpot]}>
            <Image source={Images.ic_scan_spot} style={styles.spotIcon} />
            <View style={styles.line} />
            <Text style={styles.spotLabel}>Plant looks healthy</Text>
          </View>

          <View style={[styles.spotContainer, styles.secondSpot]}>
            <Image source={Images.ic_scan_spot} style={styles.spotIcon} />
            <View style={styles.line} />
            <Text style={styles.spotLabel}>No insects found</Text>
          </View>

          <View style={[styles.spotContainer, styles.thirdSpot]}>
            <Image source={Images.ic_scan_spot} style={styles.spotIcon} />
            <View style={styles.line} />
            <Text style={styles.spotLabel}>Little dehydrated</Text>
          </View>
        </ImageBackground>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.detailsScroll}
          contentContainerStyle={{ paddingBottom: 220 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Image source={Images.ic_percentage} style={styles.percentageImage} />
            <Text style={styles.detailsTitle2}>Fiscus tree Report</Text>
            <Text style={styles.detailsTitle}>Insects:</Text>
            <Text style={styles.descriptionForDetails}>
              No insects found, you really take good care of your plant.
            </Text>

            <Text style={styles.detailsTitle}>Health Condition:</Text>
            <Text style={styles.descriptionForDetails}>
              Your plant looks perfectly alright, no health issue found.
            </Text>

            <Text style={styles.detailsTitle}>Hydration Condition:</Text>
            <Text style={styles.descriptionForDetails}>
              Water your plant ASAP. It’s little dehydrated.
            </Text>

            {/* Extra to check scrolling */}
            <Text style={styles.detailsTitle2}>Suggested treatment</Text>
            <FlatList
                data={images}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                renderItem={({ item }) => (
                  <>
                  <Image source={item} style={styles.relatedImages} />
                  <Image source={Images.ic_play} style={styles.playIcon} />
                  </>
                )}
              />
               <FlatList
                data={steps}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.details}>{item}</Text>}
                contentContainerStyle={{marginBottom: 30}}
              />
          </View>
        </ScrollView>
      </ImageBackground>

       :
      //  Initial view 
       <ImageBackground source={Images.dummy_image6}>
         <Image source={Images.bg_shadow_effect} style={styles.image} />
         <Image source={Images.ic_scan_line} style={styles.scanLines} />
      </ImageBackground>}
    </View>
  );
};
export default AiScan;



