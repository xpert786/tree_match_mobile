import React, { useRef, useState } from 'react';
import {  View, StatusBar, Text, Image, ImageBackground, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, Pressable, TouchableWithoutFeedback, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import SearchInput from '../../Components/SearchInput';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';

const MapScreen = () => {
  const [search, setSearch] = React.useState("");
  const [selectedValue, setSelectedValue]= React.useState(0);
  const [showWarning, setShowWarning] = React.useState(false);
  const [searchSuccess, setSearchSucess] = React.useState(false);


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

if(searchSuccess){
  return(
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} 
    >

    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
         />  
      <Header title={"Soil Map"} onPressBack={()=> setSearchSucess(false)} />  
        <ImageBackground source={Images.dummy_map} style={styles.container}>
        {/* Top Icons */}
        <View style={styles.topView}>
         <View style={styles.temperature}>
            <Image source={Images.ic_cloud} />
            <Text style={styles.temp}>16&deg;</Text>
         </View>
         <View>
          <TouchableOpacity style={styles.plusMinusView} onPress={()=>{}}>
           <Image source={Images.ic_plus_icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.minusView} onPress={()=>{}}>
           <Image source={Images.ic_minus} />
           </TouchableOpacity>
         </View>
        </View>


       <View style={styles.detailsContainer}>
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder={StringConstants.ENTER_YOUR_LOCATION}
          />
          <View style={styles.line} />
          <ScrollView contentContainerStyle={{paddingBottom: 20}}>
           {/* Details View  */}
            <Pressable style={styles.soilContainer} onPress={()=> navigate(ScreenConstants.SOIL_MAP_DETAILS)}>
              {/* left view */}
              <Image source={Images.dummy_image3} style={styles.placesImage} />

              {/* right view (constrained) */}
              <View style={styles.rightContent}>
                <Text
                  style={styles.placeName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >{'8349 Bank Lane'}</Text>
                <View style={styles.soilView}>
                  <Text style={styles.soilName}>{'Cecil Clay Loam'}</Text>
                </View>
                <View style={styles.topPicksView}>
                  <Text style={styles.topPicks}>Top Picks :</Text>
                  <Text style={styles.treeName} numberOfLines={1} ellipsizeMode='tail'>Red Maple Tree</Text>
                </View>
              </View>
              {/* Tree image */}
              <Image source={Images.img_tree8} style={styles.treeImage} />
            </Pressable> 

         {/* Preferred View */}
          <View style={[styles.preferredView]}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Image source={Images.ic_two_leaves} />
              <Text style={styles.myParcels}>{StringConstants.PREFERRED}</Text>
            </View>
            <TouchableOpacity onPress={()=>{}}>
              <Image source={Images.ic_right_arrow} />
            </TouchableOpacity>
          </View>   
         
            <FlatList
              data={plantsData}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled
              keyExtractor={(item) => item.id}
              style={{marginBottom: 30}}
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

             <View style={styles.allDetails}>
                <View style={styles.details}>
                     <Image source={Images.ic_moisture} />
                     <Text style={styles.mainHead}>{StringConstants.MOISTURE}</Text>
                     <Text style={[styles.mainHead, styles.value]}>30%</Text>
                     <Image source={Images.ic_i_icon} style={styles.iIcon} />
                </View> 
                <View style={styles.details}>
                     <Image source={Images.ic_acidity} />
                     <Text style={styles.mainHead}>{StringConstants.ACIDITY}</Text>
                     <Text style={[styles.mainHead, styles.value]}>6.5</Text>
                     <Image source={Images.ic_i_icon} style={styles.iIcon} />
                </View>
                <View style={styles.details}>
                     <Image source={Images.ic_fertility} />
                     <Text style={styles.mainHead}>{StringConstants.FERTILITY}</Text>
                     <Text style={[styles.mainHead, styles.value]}>High</Text>
                     <Image source={Images.ic_i_icon} style={styles.iIcon} />
                </View>
                <View style={styles.details}>
                     <Image source={Images.ic_minerals} />
                     <Text style={styles.mainHead}>{StringConstants.MINERALS}</Text>
                     <Text style={[styles.mainHead, styles.value]}>35%</Text>
                     <Image source={Images.ic_i_icon} style={styles.iIcon} />
                </View>
              </View>  
           
           {/* Limitations */}
            <View style={styles.limitationsBox}>
               <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <Image source={Images.ic_warning} />
                <Text style={styles.limitationsText}>{StringConstants.LIMITATIONS}</Text>
               </View>
               <Text style={styles.moderateErosion}>{StringConstants.MODERATE_EROSION}</Text>
            </View> 

            {/* Download & Save */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={[styles.bottomBtnView, {marginRight: 7}]}>
                <Image source={Images.ic_download} />
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomBtnView}>
                <Image source={Images.ic_save} />
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
       </View> 
     </ImageBackground>

      </View>
    </KeyboardAvoidingView>  
  )
} else {
  return(
   <TouchableWithoutFeedback onPress={()=> setShowWarning(false)}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} 
    >

    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />  

      <Header title={"Soil Map"} /> 
      <ImageBackground source={Images.dummy_map} style={styles.container}>
        {
          showWarning &&
          <View style={styles.warningWrapper}>
            <View style={styles.warningBox}>
              <Text style={styles.warningMessage}>Lorem ipsum lorem massa turpis viverra et
                  tristique scelerisque neque neque purus 
                  arcu elementum purus quis donec intege
                  r nec sagittis tempus lorem diam lectus 
                  viverra phasellus facilisi hendrerit sed 
                  tincidunt.</Text>
            </View>
            <Image source={Images.ic_triangle} style={styles.triangle} />
          </View>
        }

        {/* Top icons and soils */}
         <Image source={Images.img_map_frame} style={{alignSelf: 'center', width: "90%", resizeMode: 'contain'}} />

        {/* Bottom tab bar  */}
         <View style={styles.soilWrapper}>
           <Pressable onPress={()=> setSelectedValue(0)} style={[styles.tabBar, {backgroundColor: selectedValue == 0 ? Colors.FOREST_GREEN : 'transparent'}]}>
              <Text style={[styles.values, {color: selectedValue == 0 ? Colors.WHITE : Colors.DEEP_GREEN}]}>Soil</Text>
           </Pressable>
            <Pressable onPress={()=> setSelectedValue(1)} style={[styles.tabBar, {backgroundColor: selectedValue == 1 ? Colors.FOREST_GREEN : 'transparent'}]}>
              <Text style={[styles.values, {color: selectedValue == 1 ? Colors.WHITE : Colors.DEEP_GREEN}]}>Satellite</Text>
           </Pressable>
            <Pressable onPress={()=> setSelectedValue(2)} style={[styles.tabBar, {backgroundColor: selectedValue == 2 ? Colors.FOREST_GREEN : 'transparent'}]}>
              <Text style={[styles.values, {color: selectedValue == 2 ? Colors.WHITE : Colors.DEEP_GREEN}]}>Terrain</Text>
           </Pressable>
         </View>

        <Pressable onPress={()=>{setShowWarning(true)}} style={styles.bottomRightIcon}>
         <Image source={Images.ic_i_icon} />
         </Pressable> 
        
        {/* Search box at the bottom */}
         <View style={styles.textInputContainer}>
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder={StringConstants.ENTER_YOUR_LOCATION}
            tapOnRightIcon = {()=> setSearchSucess(true)}
          />
         </View> 
      </ImageBackground> 


       </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>   
  )
}


};
export default MapScreen;



