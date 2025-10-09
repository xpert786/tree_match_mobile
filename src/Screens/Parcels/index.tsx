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

const Parcels = ({navigation}: any) => {
  const [search, setSearch] = React.useState("");
  const [value, setValue] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState("View");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const data = [
    { label: "Clay", value: "clay" },
    { label: "Sandy", value: "sandy" },
    { label: "Loamy", value: "loamy" },
    { label: "Peaty", value: "peaty" },
    { label: "Cecil", value: "cecil" },
    { label: "Chalky", value: "Chalky" },
  ];

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

       <Header title={StringConstants.MY_PARCELS} /> 
       <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search on Map"
        containerStyles={{marginTop: 24}}
      />   

    <View style={styles.topView}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.parcelsText}>{StringConstants.PARCELS}</Text>
        <Text numberOfLines={2} style={styles.recommendationLine}>{StringConstants.RECOMMENDATION_LINE}</Text>
      </View>
      <TouchableOpacity style={styles.addNewBtn} onPress={()=> navigate(ScreenConstants.MAP_SCREEN)}>
        <Image source={Images.ic_plus} />
        <Text style={styles.addNewText}>{StringConstants.ADD_NEW}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.wrapper}>
      <View style={styles.allView}>
        <Text style={styles.allText}>All</Text>
      </View>
       <Dropdown
        style={styles.soilTypeView}
        placeholderStyle={styles.soilTypePlaceholder}
        selectedTextStyle={styles.soilTypePlaceholder}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Soil Type"
        iconStyle={styles.iconStyle}
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <Image source={Images.ic_soil_type} style={styles.leftIcon} />
        )}
        itemTextStyle={styles.itemTextStyle}
      />
    </View>
 
         <FlatList
            data={data2}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            contentContainerStyle={{paddingBottom: 20}}
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

              {/* right corner icon (absolute) */}
              <TouchableOpacity style={styles.threeDots} 
                onPress={() => setSelectedIndex(selectedIndex === index ? null : index)}>
                <Image source={Images.ic_three_dots} />
              </TouchableOpacity>

              {/* A view looks like a modal with position: 'absolute' */}
               {selectedIndex === index && (
                <View style={styles.modalView}>
                  <Pressable
                    style={[styles.modalButton, { backgroundColor: selected === "View" ? Colors.BORDER_GREY : Colors.WHITE }]}
                    onPress={() => setSelected("View")}
                  >
                    <Image source={Images.ic_eye} style={[styles.modalIcons, { tintColor: selected === "View" ? Colors.WHITE : Colors.BORDER_GREY }]} />
                    <Text style={[styles.modalText, { color: selected === "View" ? Colors.WHITE : Colors.BORDER_GREY }]}>View</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.modalButton, { backgroundColor: selected === "Export" ? Colors.BORDER_GREY : Colors.WHITE }]}
                    onPress={() => setSelected("Export")}
                  >
                    <Image source={Images.ic_upper_arrow} style={[styles.modalIcons, { tintColor: selected === "Export" ? Colors.WHITE : Colors.BORDER_GREY }]} />
                    <Text style={[styles.modalText, { color: selected === "Export" ? Colors.WHITE : Colors.BORDER_GREY }]}>Export</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.modalButton, { backgroundColor: selected === "Rename" ? Colors.BORDER_GREY : Colors.WHITE }]}
                    onPress={() => setSelected("Rename")}
                  >
                    <Image source={Images.ic_rename} style={[styles.modalIcons, { tintColor: selected === "Rename" ? Colors.WHITE : Colors.BORDER_GREY }]} />
                    <Text style={[styles.modalText, { color: selected === "Rename" ? Colors.WHITE : Colors.BORDER_GREY }]}>Rename</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.modalButton, { backgroundColor: selected === "Delete" ? Colors.BORDER_GREY : Colors.WHITE }]}
                    onPress={() => setSelected("Delete")}
                  >
                    <Image source={Images.ic_delete} style={[styles.modalIcons, { tintColor: selected === "Delete" ? Colors.WHITE : Colors.BORDER_GREY }]} />
                    <Text style={[styles.modalText, { color: selected === "Delete" ? Colors.WHITE : Colors.BORDER_GREY }]}>Delete</Text>
                  </Pressable>
                </View>
              )}
            </Pressable>
          )}
          />
 
     
    </View>
  );
};
export default Parcels;



