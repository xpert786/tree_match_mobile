import React from 'react';
import {  View, StatusBar, Text, Image, ScrollView, Pressable, TouchableOpacity, Modal } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { Fonts } from '../../Theme/Fonts';
import { Calendar } from 'react-native-calendars';

const tabOptions = [
  { label: "Planting", icon: Images.ic_planting },
  { label: "Watering", icon: Images.ic_watering },
  { label: "Light", icon: Images.ic_light },
  { label: "Pruning", icon: Images.ic_pruning },
  { label: "Pests", icon: Images.ic_pests },
  { label: "Seasonal Care", icon: Images.ic_seasonal },
  { label: "Soil", icon: Images.ic_soil_layers },
];


const PlantingTips = () => {
     const [date, setDate] = React.useState('')
     const [showCalendar, setShowCalendar] = React.useState(false);
     const [selectedValue, setSelectedValue]= React.useState(0);


    const planting = `Time of Year: Best planted during dormant seasons (early spring or fall)
    Hole Depth: Dig a hole 2–3 times wider than the root ball, but no deeper
    Root Care: Loosen circling roots before planting
    Backfill Soil: Use native soil unless otherwise specified
    Mulching: Add 2–3 inches of mulch, but keep it away from the trunk`

    const watering = `First Year: Water deeply once or twice per week depending on rainfall
    Ongoing: Reduce frequency once established, but water during dry periods
    Tip: Water at soil level early in the morning or late afternoon`

    const sunlight = `Full Sun: 6+ hours of direct sunlight per day
    Partial Shade: 3–6 hours of sunlight or filtered light
    Shade Tolerant: Less than 3 hours of direct sunlight`

    const pruning = `When to Prune: Late winter or early spring (before bud break)
    What to Prune: Remove dead, damaged, or crossing branches
    Don’t: Top trees — it weakens structure and health`

    const pests = `Inspect regularly for:
    Leaf discoloration
    Wilting or cankers
    Unusual sap or bark damage`

    const seasonalCare = `Spring: Fertilize if needed, inspect new growth
    Summer: Monitor water levels, pests
    Fall: Clean leaf debris, deep water before winter
    Winter: Protect roots with mulch, wrap young trunks if needed`

    const soil = `Ensure well-draining soil (test during planting)
    Amend compacted soil if roots struggle
    Match pH levels to species preference (from soil scan)`

    const careOptions = [
    { label: "🌱 Planting", content: planting },
    { label: "💧 Watering", content: watering },
    { label: "☀️ Sunlight", content: sunlight },
    { label: "✂️ Pruning", content: pruning },
    { label: "🐛 Pests", content: pests },
    { label: "🍂 Seasonal Care", content: seasonalCare },
    { label: "🧱 Soil", content: soil },
    ];


    const formatDate = (isoDate: string) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${month}/${day}/${year}`; // MM/DD/YYYY
    };



 return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
        />
       <Header title={StringConstants.PLANTING_TIPS} /> 

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

       <View style={styles.topView2}>
            <Text style={styles.myParcels}>{'8349 Bank Lane.'}</Text>
           <Pressable onPress={()=>{navigate(ScreenConstants.REMINDERS)}} style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreText}>Custom Alerts</Text>
            <Image source={Images.ic_plus} style={{tintColor: Colors.WHITE}} />
           </Pressable>
        </View>   
        <Text style={styles.soilName}>Cecil Soil</Text> 
       <Text style={styles.parcelsText}>{StringConstants.PLANTING_DATE}</Text>
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

       <Text style={styles.aboutText}>{StringConstants.ABOUT}</Text>
       <Text style={styles.aboutDescription}>The oak tree is a majestic, long-lived deciduous tree, revered for its strength and longevity. It's easily recognized by its distinctive lobed leaves and the acorns it produces. </Text>
       <Text style={styles.aboutText}>{'Ideal conditions 🌱'}</Text>    
        <View style={styles.appropriateView}>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_sun} style={{marginBottom: 10}} />
            <Text style={styles.treeTitle}>Light</Text>
            <Text style={styles.treeTitle2}>35-40%</Text>
          </View>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_temperature} style={{marginBottom: 10}} />
            <Text style={styles.treeTitle}>TEMPERATURE</Text>
            <Text style={styles.treeTitle2}>70-75 <Text style={{fontSize: 13, fontFamily: Fonts.REGULAR}}>℉</Text></Text>
          </View>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_drop} style={{marginBottom: 10}} />
            <Text style={styles.treeTitle}>Water</Text>
            <Text style={styles.treeTitle2}>250ml</Text>
          </View>
        </View>


       {/* Tab bar */}
        <View style={styles.soilWrapper}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            >
            {tabOptions.map((item, index) => (
                <Pressable
                key={index}
                onPress={() => setSelectedValue(index)}
                style={[
                    styles.tabBar,
                    {
                    backgroundColor: selectedValue === index ? Colors.FOREST_GREEN : "transparent",
                    },
                ]}
                >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                    source={item.icon}
                    style={{ width: 18, height: 18, marginRight: 6 }}
                    resizeMode="contain"
                    />
                    <Text
                    style={[
                        styles.values,
                        {
                        color:
                            selectedValue === index ? Colors.WHITE : Colors.DEEP_GREEN,
                        },
                    ]}
                    >
                    {item.label}
                    </Text>
                </View>
                </Pressable>
            ))}
            </ScrollView>
        </View>  

          {selectedValue == 0 ?
            <Image source={Images.dummy_diagram_planting} style={styles.diagram1} />
            :
            selectedValue == 3 ?
            <Image source={Images.dummy_pruning} style={styles.diagram2} />
            : null
          }

        {/* render selected tab dynamically */}
        {careOptions[selectedValue] && (
        <View style={styles.limitationsBox}>
            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
            }}
            >
            <Text style={styles.limitationsText}>
                {careOptions[selectedValue].label}
            </Text>
            </View>

            {careOptions[selectedValue].content.split("\n").map((line, index) => (
            <Text key={index} style={styles.moderateErosion}>
                {"\u2022"} {line.trim()}
            </Text>
            ))}
        </View>
        )}


       {/* {selectedValue == 0 ?
        <View style={styles.limitationsBox}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.limitationsText}>{"🌱 Planting"}</Text>
        </View>
        {planting.split("\n").map((line, index) => (
            <Text key={index} style={styles.moderateErosion}>
            {"\u2022"} {line.trim()}
            </Text>
        ))}
        </View> 
       : 
       selectedValue == 1 ?
            <View style={styles.limitationsBox}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.limitationsText}>{"💧 Watering"}</Text>
        </View>
        {watering.split("\n").map((line, index) => (
            <Text key={index} style={styles.moderateErosion}>
            {"\u2022"} {line.trim()}
            </Text>
        ))}
        </View> 
         : 
       selectedValue == 2 ?
            <View style={styles.limitationsBox}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.limitationsText}>{"☀️ Sunlight"}</Text>
        </View>
        {sunlight.split("\n").map((line, index) => (
            <Text key={index} style={styles.moderateErosion}>
            {"\u2022"} {line.trim()}
            </Text>
        ))}
        </View> 
         : 
       selectedValue == 3 ?
            <View style={styles.limitationsBox}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.limitationsText}>{"✂️ Pruning"}</Text>
        </View>
        {pruning.split("\n").map((line, index) => (
            <Text key={index} style={styles.moderateErosion}>
            {"\u2022"} {line.trim()}
            </Text>
        ))}
        </View> 
         : 
       selectedValue == 4 ?
            <View style={styles.limitationsBox}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.limitationsText}>{"🐛 Pests"}</Text>
        </View>
        {pests.split("\n").map((line, index) => (
            <Text key={index} style={styles.moderateErosion}>
            {"\u2022"} {line.trim()}
            </Text>
        ))}
        </View> 
         : 
       selectedValue == 5 ?
            <View style={styles.limitationsBox}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.limitationsText}>{"🍂 Seasonal Care"}</Text>
        </View>
        {seasonalCare.split("\n").map((line, index) => (
            <Text key={index} style={styles.moderateErosion}>
            {"\u2022"} {line.trim()}
            </Text>
        ))}
        </View> 
         : 
       selectedValue == 6 ?
            <View style={styles.limitationsBox}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={styles.limitationsText}>{"🧱 Soil"}</Text>
        </View>
        {soil.split("\n").map((line, index) => (
            <Text key={index} style={styles.moderateErosion}>
            {"\u2022"} {line.trim()}
            </Text>
        ))}
        </View> 
        : null
    } */}


        </ScrollView>
      </View>
     );
   };
export default PlantingTips;       