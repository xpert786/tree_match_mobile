import React from 'react';
import {  View, StatusBar, Text, Image, ImageBackground, Dimensions, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import SearchInput from '../../Components/SearchInput';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';

const Downloads = ({navigation}: any) => {
  const [selected, setSelected] = React.useState("View");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);


  const data2 =[
    {
     image: Images.dummy_image3,
     placeName: '8349 Bank Lane',
     soilName: 'Cecil Soil',
     moisture: '30%',
     acidity: '6.5',
    },
     {
     image: Images.img_landscape,
     placeName: 'Atlanta, USA',
     soilName: 'Loamy Soil',
     moisture: '45%',
     acidity: '7.3',
    },
     {
     image: Images.dummy_image4,
     placeName: 'Nairobi, Kenya',
     soilName: 'Sandy Soil',
     moisture: '20%',
     acidity: '5.2',
    },
     {
     image: Images.dummy_image5,
     placeName: 'Agra, India',
     soilName: 'Chalky Soil',
     moisture: '43%',
     acidity: '4.7',
    },
     {
     image: Images.dummy_image2,
     placeName: '8349 Bank Lane',
     soilName: 'Cecil Soil',
     moisture: '32%',
     acidity: '6.9',
    },
  ]

  return (
    <View style={styles.container}>
       <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />

       <Header title={StringConstants.DOWNLOADS} /> 
 
         <FlatList
            data={data2}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            contentContainerStyle={{paddingVertical: 20}}
            renderItem={({ item, index }) => (
            <Pressable style={[styles.soilContainer]} onPress={()=> navigate(ScreenConstants.PARCEL_DETAILS)}>
              {/* left view */}
              <Image source={item.image} style={styles.placesImage} />

              {/* right view (constrained) */}
              <View style={styles.rightContent}>
                <Text
                  style={styles.placeName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.placeName}
                </Text>

                <View style={styles.soilView}>
                  <Text style={styles.soilName}>{item.soilName}</Text>
                </View>

                <View style={styles.statsRow}>
                  <View style={[styles.boxView, { marginRight: 10 }]}>
                    <Image source={Images.ic_moisture} style={styles.icons} />
                    <Text style={styles.boxText}>{item.moisture}</Text>
                  </View>
                  <View style={styles.boxView}>
                    <Image source={Images.ic_acidity} style={styles.icons} />
                    <Text style={styles.boxText}>{item.acidity}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
          />
 
     
    </View>
  );
};
export default Downloads;



