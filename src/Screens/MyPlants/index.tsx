import React from 'react';
import {  View, StatusBar, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import SearchInput from '../../Components/SearchInput';


const treeData = [
  {
    id: "1",
    name: "Oak Tree",
    years: "400-600 Years",
    feet: "40 to 80 feet",
    image: Images.img_tree1,
  },
  {
    id: "2",
    name: "Sweet Gum",
    years: "100-150 Years",
    feet: "30 to 65 feet",
    image: Images.img_tree2,
  },
  {
    id: "3",
    name: "Dogwood",
    years: "300-400 Years",
    feet: "30 to 65 feet",
    image: Images.img_tree3,
  },
  {
    id: "4",
    name: "Red Cedar",
    years: "200-300 Years",
    feet: "60 to 70 feet",
    image: Images.img_tree4,
  },
    {
    id: "5",
    name: "Hickory",
    years: "300-400 Years",
    feet: "30 to 90 feet",
    image: Images.img_tree5,
  },
  {
    id: "6",
    name: "Redbud",
    years: "200-300 Years",
    feet: "60 to 80 feet",
    image: Images.img_tree6,
  },
  {
  id: "7",
  name: "Magnolia",
  years: "80-120 Years",
  feet: "30 to 60 feet",
  image: Images.img_tree7,
},
{
  id: "8",
  name: "Sycamore",
  years: "200-600 Years",
  feet: "75 to 90 feet",
  image: Images.img_tree8,
},

];

const MyPlants = () => {
    const [search, setSearch] = React.useState("");


  const renderItem = ({ item }: any) => (
    <View style={styles.cardView}>
      <View style={styles.treeImage}>
        <Image source={item.image} style={styles.treePic} />
        <Text style={styles.treeName}>{item.name}</Text>
        <Text style={styles.timeYears}>{item.years}</Text>
        <Image source={Images.ic_bookmark2} style={styles.bookmark} />
      </View>
      <View style={styles.bottomView}>
      <View style={styles.feetWrapper}>
        <Image source={Images.ic_zoom_out} />
        <Text 
          style={styles.feet} 
          numberOfLines={1} 
          ellipsizeMode="tail"
        >
          {item.feet}
        </Text>
      </View>
      <Image source={Images.ic_round_add} />
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
       <Header title={StringConstants.MY_PLANTS} showLeavesIcon /> 
       <ScrollView contentContainerStyle={{paddingVertical: 24}}>
        <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder={StringConstants.ENTER_YOUR_LOCATION}
       />  

         <View style={styles.topView}>
            <Text style={styles.myParcels}>{StringConstants.GUIDANCE}</Text>
           {/* <TouchableOpacity onPress={()=>{}} style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreText}>See More</Text>
            <Image source={Images.ic_right_arrow} />
           </TouchableOpacity> */}
        </View>    

         <View style={styles.allView}>
            <Text style={styles.allText}>All</Text>
         </View> 

         <FlatList
            data={treeData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 30 }}
            showsVerticalScrollIndicator={false}
         />

  
       </ScrollView>
    </View>
 );
};

export default MyPlants;