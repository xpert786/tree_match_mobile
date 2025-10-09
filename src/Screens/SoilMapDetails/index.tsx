import React from 'react';
import {  View, StatusBar, Text, Image, Dimensions, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import TextInputField from '../../Components/TextInputField';
import { Dropdown } from 'react-native-element-dropdown';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';

const width = Dimensions.get('window').width;


const soilOptions = [
  { label: 'Cecil Soil', value: 'cecil' },
  { label: 'Clay Soil', value: 'clay' },
  { label: 'Sandy Soil', value: 'sandy' },
  { label: 'Loamy Soil', value: 'loamy' },
];

const SoilMapDetails = () => {
  const [formData, setFormData] = React.useState({
     parcelName: '',
     soilType: '',
     location: '',
  })

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
        <Text style={styles.title}>Parcel Name</Text>      
             <TextInputField
                value={formData.parcelName}
                onChangeText={(text) =>
                    setFormData({ ...formData, parcelName: text })
                }
                maxLength={50}
                placeholder={'Parcel Name'}
                inputStyles={{height: 58, width: width - 60}}
                placeholderTextColor={Colors.PLACEHOLDER_GREY}
               /> 
        <Text style={styles.title}>Parcel Type</Text>  
         <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={soilOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Soil Type"
            dropdownPosition='top'
            value={formData.soilType}
            onChange={(item) => {
               setFormData({ ...formData, soilType: item.value })
            }}
            renderRightIcon={() => (
              <Image source={Images.ic_dropdown} style={{ width: 45, height: 45 }} />
            )}
              renderItem={(item) => (
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              )}
          />    
           <Text style={styles.title}>Parcel Location</Text>      
             <TextInputField
                value={formData.location}
                onChangeText={(text) =>
                    setFormData({ ...formData, location: text })
                }
                maxLength={50}
                placeholder={'Location'}
                inputStyles={{height: 58, width: width - 60}}
                placeholderTextColor={Colors.PLACEHOLDER_GREY}
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
            <TouchableOpacity style={styles.bottomButtons}>
                <Image source={Images.ic_save} />
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>              

       </ScrollView>
     </View>
    );
  };
export default SoilMapDetails;