import React from 'react';
import {  View, StatusBar, Text, Image, Dimensions, TouchableOpacity, ScrollView, Pressable, FlatList } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';

const width = Dimensions.get('window').width;



const treeData = [
  {
    id: "1",
    name: "Dogwood",
    years: "2012-2015",
    image: Images.img_tree3,
  },
  {
    id: "2",
    name: "Sweet Gum",
    years: "2015-2019",
    image: Images.img_tree2,
  },
  {
    id: "3",
    name: "Oak Tree",
    years: "2020-2025",
    image: Images.img_tree1,
  },
];

const plantingData = [
  {
    id: "1",
    name: "Oak Tree",
    description: "Sown in September Harvest in April",
    yield: "-8,500Kg/Hec",
    image: Images.dummy_image3,
  },
  {
    id: "2",
    name: "Eucalyptus",
    description: "Sown in April Harvest in September",
    yield: "-6,200Kg/Hec",
    image: Images.img_tree9,
  },

];


const ParcelDetails = () => {

  const renderTreeItem = ({ item }: any) => (
    <View style={styles.treeDetailsWrapper}>
      <Image source={item.image} style={styles.treeImage} />
      <View style={{ marginLeft: 22 }}>
        <Text style={styles.plantName}>{item.name}</Text>
        <Text style={styles.plantYear}>{item.years}</Text>
      </View>
    </View>
  );



  const renderItem = ({ item }: any) => (
    <View style={styles.plantingGuidanceWrapper}>
      {/* Left side image */}
      <Image source={item.image} style={styles.treeImage2} />

      {/* Right side content */}
      <View style={{ marginLeft: 22, flex: 1 }}>
        <Text style={styles.treeName}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.hectare}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Image
            source={Images.ic_two_leaves}
            style={{ height: 19, width: 19 }}
          />
          <Text
            style={[styles.hectareValue, { flexShrink: 1 }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.yield}
          </Text>
        </View>
        <Image
          source={Images.ic_side_arrow}
          style={{ height: 40, width: 40, marginLeft: 10 }}
        />
      </View>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
       <Header title={StringConstants.PARCEL_DETAIL} /> 

       <ScrollView contentContainerStyle={{paddingBottom: 40}}>
         <Image source={Images.img_landscape} style={styles.images} />
         <Image source={Images.ic_i_icon} style={styles.IIcon} />

       <View style={styles.topView}>
            <Text style={styles.myParcels}>{'8349 Bank Lane.'}</Text>
           <Pressable onPress={()=>{navigate(ScreenConstants.PARCEL_ALERTS)}} style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreText}>Custom Alerts</Text>
            <Image source={Images.ic_plus} style={{tintColor: Colors.WHITE}} />
           </Pressable>
        </View>   
        <Text style={styles.soilName}>Cecil Soil</Text>        
        <Text style={styles.soilName2}>Cecil Clay Loam</Text>        
       
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

              <View style={styles.topView2}>
                  <Text style={styles.myParcels2}>{StringConstants.LAND_USE_HISTORY}</Text>
                 <TouchableOpacity onPress={()=>{}} style={styles.seeMoreBtn2}>
                  <Text style={styles.seeMoreText2}>{StringConstants.TIME_RANGE}</Text>
                  <Image source={Images.ic_right_arrow} />
                 </TouchableOpacity>
              </View>     

              <View style={styles.graphContainer}>
                <Text style={styles.phLevels}>pH Levels by Years</Text>
                <Image source={Images.img_dummy_graph} style={styles.graph} />
              </View>  
              <Text style={styles.soilName2}>{StringConstants.PLANTATION_HISTORY}</Text>  

              <FlatList
                data={treeData}
                keyExtractor={(item) => item.id}
                renderItem={renderTreeItem}
                contentContainerStyle={{ paddingBottom: 10 }}
            /> 
            
           <View style={styles.topView2}>
                  <Text style={styles.myParcels2}>{StringConstants.PLANTING_GUIDANCE}</Text>
                 <TouchableOpacity onPress={()=>{
                  navigate(ScreenConstants.PLANTING_GUIDANCE)
                 }} style={[styles.seeMoreBtn2, {width: 110}]}>
                  <Text style={styles.seeMoreText2}>{"See More"}</Text>
                  <Image source={Images.ic_right_arrow} />
                 </TouchableOpacity>
          </View>   


         <FlatList
            data={plantingData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 15 }}
          />

            {/* Limitations */}
              <View style={styles.limitationsBox}>
                 <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                  <Image source={Images.ic_warning} />
                  <Text style={styles.limitationsText}>{StringConstants.LIMITATIONS}</Text>
                 </View>
                 <Text style={styles.moderateErosion}>{StringConstants.MODERATE_EROSION}</Text>
              </View>  
            

       </ScrollView>
     </View>
    );
  };
export default ParcelDetails;