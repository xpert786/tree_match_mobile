import React from 'react';
import {  View, StatusBar, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';

const data = [
  { id: 1, title: "Watering Seeds (48h)", dropdown: ["50h", "48h", "45h"]  },
  { id: 2, title: "Pesticides (1-2 times in Months )",  dropdown: ["1-2 times in Months", "2-3 times in Months", "3-4 times in Months"]  },
  { id: 3, title: "Sunlight (2-3 days in weeks)" , dropdown: ["3-5 days in weeks", "2-3 days in weeks", "7 days in weeks"] },
  { id: 4, title: "Pruning (4-6 times in Months )",  dropdown: ["1-3 times in Months", "3-4 times in Months", "4-6 times in Months"]  },
  { id: 5, title: "Soil (4-6 times in Months )",  dropdown: ["1-3 times in Months", "3-4 times in Months", "4-6 times in Months"]  },
  
];

 const Reminders = () => {
   const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
   const [selectedValues, setSelectedValues] = React.useState<{ [key: number]: string }>({});

    const tapOnEdit = (index: number) => {
      setExpandedIndex(expandedIndex === index ? null : index); // toggle
    };

    const handleSelect = (index: number, value: string) => {
        setSelectedValues(prev => ({ ...prev, [index]: value }));
        setExpandedIndex(null); // close dropdown after selection
    };

  return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
       <Header title={StringConstants.REMINDERS} /> 

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

        {/* Alerts */}
        <Text style={styles.alerts}>Alerts</Text>

        {data.map((item, index) => {
            // Use selected value if exists, otherwise keep original
              const currentValue = selectedValues[index];
              const bracketValue = currentValue ? `(${currentValue})` : item.title.match(/\(.*?\)/)?.[0] || "";

            // Replace old bracket with new one
              const newTitle = item.title.replace(/\(.*?\)/, bracketValue);

            return (
            <View key={item.id} style={styles.listView}>
                {/* Row for title + icon */}
                <View style={styles.rowBetween}>
                <Text style={styles.listText}>{`${index + 1}. ${newTitle}`}</Text>
                <TouchableOpacity onPress={() => tapOnEdit(index)}>
                    <Image
                    source={expandedIndex === index ? Images.ic_down_arrow : Images.ic_edit_pen}
                    />
                </TouchableOpacity>
                </View>

                {/* Dropdown Section */}
                {expandedIndex === index && (
                <View style={styles.dropdownContainer}>
                    {item.dropdown.map((label, i) => (
                    <TouchableOpacity key={i} onPress={() => handleSelect(index, label)}>
                        <Text style={styles.dropdownLabel}>{label}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
                )}
            </View>
            );
        })}
        <TouchableOpacity style={styles.setAlertBtn} 
        // onPress={()=> navigate(ScreenConstants.NOTIFICATION_SETTINGS)}
        >
            <Text style={styles.setAlerts}>Set Alerts</Text>
        </TouchableOpacity>
       </ScrollView>

    </View>
    );
  };
export default Reminders;