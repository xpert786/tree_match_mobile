import React from 'react';
import {  View, StatusBar, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { Colors } from '../../Theme/Colors';

const images = [
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf2,
  Images.img_dummy_leaf3,
  Images.img_dummy_leaf4,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf2,
  Images.img_dummy_leaf3,
  Images.img_dummy_leaf4,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf2,
  Images.img_dummy_leaf3,
  Images.img_dummy_leaf4,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf1,
  Images.img_dummy_leaf1,
]; // can come from API

const MAX_VISIBLE = 4;

const detailsData = [
  {
    id: "1",
    icon: Images.ic_flower,
    title: StringConstants.FLOWER,
    value: "Jan-Feb",
  },
  {
    id: "2",
    icon: Images.ic_fruit_bowl,
    title: StringConstants.FRUIT,
    value: "Apr-Jun",
  },
  {
    id: "3",
    icon: Images.ic_diseases,
    title: StringConstants.DISEASES,
    value: "Rotroot",
  },
  {
    id: "4",
    icon: Images.ic_minerals,
    title: StringConstants.FALL,
    value: "Oct-Nov",
  },
    {
    id: "5",
    icon: Images.ic_fruit_bowl,
    title: 'USDA ZONE',
    value: "Apr-Jun",
  },
  {
    id: "6",
    icon: Images.ic_diseases,
    title: StringConstants.DISEASES,
    value: "Rotroot",
  },
  {
    id: "7",
    icon: Images.ic_minerals,
    title: StringConstants.FALL,
    value: "Oct-Nov",
  },
];

 const About = () => {
  const [selectedImage, setSelectedImage] = React.useState(1);
  const visibleImages = images.slice(0, MAX_VISIBLE);
  const remaining = images.length - MAX_VISIBLE;


 const renderItem = ({ item }: any) => (
    <View style={styles.details}>
      <Image source={item.icon} style={{ alignSelf: "center" }} />
      <Text style={styles.mainHead}>{item.title}</Text>
      <Text style={styles.value2}>{item.value}</Text>
    </View>
  );

    return(
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
       <Header title={StringConstants.ABOUT} /> 

       <ScrollView contentContainerStyle={{paddingBottom: 40}}>

        {/* TopView */}
        <View style={styles.treeView}>
           <View style={styles.topView}>
            <Text style={styles.treeName} numberOfLines={1}>Oak Tree</Text>
            <View style={styles.rightIcons}>
                <Image source={Images.ic_share} style={{marginHorizontal: 5}} />
                <Image source={Images.ic_download_circle} />
            </View>
           </View>
           {/* Tree Image and left details */}
           <View style={styles.treeDetailsView} >
             <View style={styles.leftDetailsView}>
              <Text style={styles.name}>Quercus</Text>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.title}>AGE</Text>
                <Text style={[styles.value, {marginBottom: 26}]}>400- 600</Text>
                <Text style={styles.title}>SIZE</Text>
                <Text style={styles.value}>40 to 80 feet</Text>
              </View>
             </View>
             <View style={styles.treeImageView}>
                <Image source={Images.img_tree1} style={styles.treeImage} />
                <Image source={Images.ic_i_icon} style={styles.iIcon} />
             </View>
           </View>
        </View>

        {/* About Section & Tree Appropriate */}
        <Text style={styles.aboutText}>{StringConstants.ABOUT}</Text>
        <Text style={styles.aboutDescription}>The oak tree is a strong, long-living hardwood tree known for its broad canopy and deeply lobed leaves. It supports rich biodiversity, providing food and shelter to wildlife. Oak trees are drought-tolerant and thrive in well-drained soils like Cecil soil.</Text>
        <Text style={styles.aboutText}>{StringConstants.TREE_APPROPRIATE_LANGUAGE}</Text>
        <View style={styles.appropriateView}>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_sun} style={{marginBottom: 10}} />
            <Text style={styles.treeTitle}>Light</Text>
            <Text style={styles.treeTitle2}>6+hrs Daily</Text>
          </View>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_moist} style={{marginBottom: 10}} />
            <Text style={styles.treeTitle}>Soil Needs</Text>
            <Text style={styles.treeTitle2}>Moist</Text>
          </View>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_drop} style={{marginBottom: 10}} />
            <Text style={styles.treeTitle}>Water</Text>
            <Text style={styles.treeTitle2}>Moderate</Text>
          </View>
        </View>

      {/* Photos View */}
      <Text style={styles.aboutText}>{StringConstants.PHOTOS}</Text> 
      <View style={styles.photosView}>

       <View>
        <TouchableOpacity style={[styles.photosImage, {backgroundColor: selectedImage === 1 ? Colors.FOREST_GREEN : Colors.GREY13}]}
          onPress={() => setSelectedImage(1)}>
          <Image source={Images.ic_one_leaf} style={{tintColor: selectedImage === 1 ? Colors.WHITE : Colors.DARK_GREYISH_BLUE}}  />
        </TouchableOpacity>
         <Text style={styles.belowText}>{StringConstants.LEAF}</Text>
       </View>

       <View>
        <TouchableOpacity style={[styles.photosImage, {backgroundColor: selectedImage === 2 ? Colors.FOREST_GREEN : Colors.GREY13}]} 
           onPress={() => setSelectedImage(2)}>
          <Image source={Images.ic_bark}  style={{tintColor: selectedImage === 2 ? Colors.WHITE : Colors.DARK_GREYISH_BLUE}}  />
        </TouchableOpacity>
        <Text style={styles.belowText}>{StringConstants.BARK}</Text>
       </View>

       <View>
         <TouchableOpacity style={[styles.photosImage, {backgroundColor: selectedImage === 3 ? Colors.FOREST_GREEN : Colors.GREY13}]} 
           onPress={() => setSelectedImage(3)}>
          <Image source={Images.ic_fruit}  style={{tintColor: selectedImage === 3 ? Colors.WHITE : Colors.DARK_GREYISH_BLUE}}  />
        </TouchableOpacity>
         <Text style={styles.belowText}>{StringConstants.FRUIT}</Text>
       </View>

        <View>
         <TouchableOpacity style={[styles.photosImage, {backgroundColor: selectedImage === 4 ? Colors.FOREST_GREEN : Colors.GREY13}]}
            onPress={() => setSelectedImage(4)}>
          <Image source={Images.ic_tree}  style={{tintColor: selectedImage === 4 ? Colors.WHITE : Colors.DARK_GREYISH_BLUE}}  />
        </TouchableOpacity>
        <Text style={styles.belowText}>{StringConstants.TREE}</Text>
      </View>
      </View>

      <View style={styles.allPhotosWrapper}>
        {visibleImages.map((img, index) => (
          <Image key={index} source={img} style={styles.photos} />
        ))}

        {remaining > 0 && (
          <View style={styles.morePhotosView}>
            <Text style={styles.moreItems}>+{remaining}</Text>
          </View>
        )}
      </View>

      {/* Behaviour View */}
      <Text style={styles.aboutText}>{StringConstants.BEHAVIOUR}</Text> 
       <FlatList
          data={detailsData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.allDetails}
          ItemSeparatorComponent={() => <View style={{width: 7}} />}
        />


          {/* Maintainence tips */}
        <View style={styles.limitationsBox}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <Image source={Images.ic_tips} />
            <Text style={styles.limitationsText}>{StringConstants.MAINTENANCE_TIPS}</Text>
            </View>
          <Text style={styles.moderateErosion}>&#x2022; {StringConstants.TIP1}{"\n"}&#x2022; {StringConstants.TIP2}{"\n"}&#x2022; {StringConstants.TIP3}{"\n"}&#x2022; {StringConstants.TIP4}</Text>
       </View>      

            <TouchableOpacity style={styles.bottomButtons} onPress={()=> navigate(ScreenConstants.ASSIGN_TO_PARCEL)}>
                <Text style={styles.buttonText}>Assign To Parcel</Text>
            </TouchableOpacity> 

      </ScrollView>
    
    </View>
    );
  };
export default About;
