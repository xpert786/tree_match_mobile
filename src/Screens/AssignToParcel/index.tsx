import React from 'react';
import {  View, StatusBar, Text, Image, Dimensions, TouchableOpacity, ScrollView, Pressable, FlatList, Modal } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { Dropdown } from 'react-native-element-dropdown';
import { Calendar } from 'react-native-calendars';
import { Fonts } from '../../Theme/Fonts';


  const treeData = [
  {
    id: "1",
    name: "Hickory",
    years: "400-600 Years",
    feet: "40 to 80 feet",
    image: Images.img_tree5,
  },
  {
    id: "2",
    name: "Redbud",
    years: "100-150 Years",
    feet: "30 to 65 feet",
    image: Images.img_tree6,
  },
  {
    id: "3",
    name: "Dogwood",
    years: "300-400 Years",
    feet: "30 to 65 feet",
    image: Images.img_tree1,
  },
  {
    id: "4",
    name: "Red Cedar",
    years: "200-300 Years",
    feet: "60 to 70 feet",
    image: Images.img_tree2,
  },
    {
    id: "5",
    name: "Oak Tree",
    years: "300-400 Years",
    feet: "30 to 90 feet",
    image: Images.img_tree3,
  },
  {
    id: "6",
    name: "Sweet Gum",
    years: "200-300 Years",
    feet: "60 to 80 feet",
    image: Images.img_tree4,
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

const plantsData = [
  { id: "1", name: "Oak Tree", years: "400-600 Years", image: Images.img_tree1 },
];



const formatDate = (isoDate: string) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${month}/${day}/${year}`; // MM/DD/YYYY
};


const AssignToParcel = () => {
    const [date, setDate] = React.useState('')
    const [showCalendar, setShowCalendar] = React.useState(false);


      const renderItem = ({ item }: any) => (
        <View style={styles.cardView}>
          <View style={styles.treeImage}>
            <Image source={item.image} style={styles.treePic} />
            <Text style={styles.treeName}>{item.name}</Text>
            <Text style={styles.timeYears}>{item.years}</Text>
            <Image source={Images.ic_bookmark2} style={styles.bookmark} />
          </View>
          <View style={styles.bottomView}>
            <Image source={Images.ic_zoom_out} style={{height: 8, width: 8}} />
            <Text 
              style={styles.feet} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {item.feet}
            </Text>
        </View>
        </View>
      );

      const renderSelectedItem = ({ item }: any) => (
          <View style={styles.addedPlantsView}>
            <View style={{ flexDirection: "row", flexShrink: 1 }}>
              <Image source={item.image} style={styles.plantImage} />
              <View style={{ justifyContent: "center", marginLeft: 10, flexShrink: 1 }}>
                <Text
                  style={styles.treeName2}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <Text style={styles.years}>{item.years}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={()=>{}}>
               <Image source={Images.ic_round_cross} style={{ marginRight: 5 }} />
            </TouchableOpacity>
          </View>
        );


     return (
        <View style={styles.container}>
           <StatusBar
                  translucent={true}
                  backgroundColor="transparent"
                  barStyle="dark-content"
                />
           <Header title={StringConstants.PLANTING_DATE} /> 
    
           <ScrollView contentContainerStyle={{paddingBottom: 40}}>
             <Image source={Images.img_landscape} style={styles.images} />
             <Image source={Images.ic_i_icon} style={styles.IIcon} />
    
            <View style={styles.topView}>
               <Text style={styles.myParcels}>{'8349 Bank Lane.'}</Text>
            </View>   
            <Text style={styles.soilName}>Cecil Soil</Text>  

            <View style={styles.topView2}>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.parcelsText}>{StringConstants.ADD_TREE}</Text>
                <Text numberOfLines={2} style={styles.recommendationLine}>{StringConstants.YOU_MAY_ADD_MULTIPLE_TREE}</Text>
            </View>
            <TouchableOpacity onPress={()=>{navigate(ScreenConstants.MY_PLANTS)}} style={styles.seeMoreBtn}>
                <Text style={styles.seeMoreText}>See More</Text>
                <Image source={Images.ic_right_arrow} />
            </TouchableOpacity>
            </View>     
            
          <FlatList
                data={treeData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 30 }}
             />

              <FlatList
                data={plantsData}
                renderItem={renderSelectedItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 30, marginBottom : 30}}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />} // space between cards
              />
            <Text style={[styles.parcelsText, {marginLeft: 30, marginBottom: 20}]}>{StringConstants.PLANTING_DATE}</Text>

            {/* 
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={[]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="MM/DD/YYYY"
                dropdownPosition='top'
                value={date}
                onChange={(item) => {
                  setDate(item.value)
                }}
                renderRightIcon={() => (
                  <Image source={Images.ic_dropdown} style={{ width: 45, height: 45 }} />
                )}
                renderItem={(item) => (
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                )}
                renderLeftIcon={() => (
                  <Image source={Images.ic_calender} style={{ width: 45, height: 45 }} />
                )}  
              />  
            */}

          <TouchableOpacity onPress={() => setShowCalendar(true)} activeOpacity={0.8}>
            <View style={styles.dropdown}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.ic_calender} style={{ width: 45, height: 45 }} />
              <Text style={date ? styles.selectedTextStyle : styles.placeholderStyle}>
                {date ? formatDate(date) : "MM/DD/YYYY"}
              </Text>
              </View>
              <Image source={Images.ic_dropdown} style={{ width: 45, height: 45, position: "absolute", right: 8 }} />
            </View>
          </TouchableOpacity>

             {/* Modal Calendar */}
              <Modal
                transparent
                visible={showCalendar}
                animationType="none"
                onRequestClose={() => setShowCalendar(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <Calendar
                      onDayPress={(day: any) => {
                        setDate(day.dateString); // e.g. "2025-09-09"
                        setShowCalendar(false);
                      }}
                      markedDates={{
                        [date]: { selected: true, selectedColor: Colors.FOREST_GREEN },
                      }}
                    />

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setShowCalendar(false)}
                    >
                      <Text style={{ color: Colors.WHITE, fontFamily: Fonts.SEMIBOLD }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

            <TouchableOpacity style={styles.bottomButtons} onPress={()=> navigate(ScreenConstants.PLANTING_TIPS)}>
                 <Text style={styles.buttonText}>{`Submit Date -->`}</Text>
             </TouchableOpacity> 
            
        </ScrollView>
      </View>
    );
    };
export default AssignToParcel;