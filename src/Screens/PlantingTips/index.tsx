import React from 'react';
import { View, StatusBar, Text, Image, ScrollView, Pressable, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const tabOptions = [
  { label: "Planting", icon: Images.ic_planting },
  { label: "Watering", icon: Images.ic_watering },
  { label: "Light", icon: Images.ic_light },
  { label: "Pruning", icon: Images.ic_pruning },
  { label: "Pests", icon: Images.ic_pests },
  { label: "Seasonal Care", icon: Images.ic_seasonal },
  { label: "Soil", icon: Images.ic_soil_layers },
];

const PlantingTips = ({ route }: any) => {
  const { parcelId, treeName, parcelImage } = route.params || {};
  const unavailableMsg = "Content not available yet.";

  console.log("🌱 PlantingTips Route Params:", {
    parcelId,
    treeName,
    parcelImage,
  });

  const [selectedValue, setSelectedValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [plantingTipsData, setPlantingTipsData] = React.useState<any>(null);


  const formatSeasonalCare = (seasonalCare: any) => {
    if (!seasonalCare) return null;
    return `Spring: ${seasonalCare.spring || 'N/A'}
      Summer: ${seasonalCare.summer || 'N/A'}
      Fall: ${seasonalCare.fall || 'N/A'}
      Winter: ${seasonalCare.winter || 'N/A'}`;
  };

  const careOptions = [
    {
      label: "🌱 Planting",
      content:
        plantingTipsData?.planting_tips
          ? Array.isArray(plantingTipsData.planting_tips)
            ? plantingTipsData.planting_tips.join("\n")
            : plantingTipsData.planting_tips
          : unavailableMsg
    },
    {
      label: "💧 Watering",
      content: plantingTipsData?.watering || unavailableMsg
    },
    {
      label: "☀️ Sunlight",
      content: plantingTipsData?.light || unavailableMsg
    },
    {
      label: "✂️ Pruning",
      content: plantingTipsData?.pruning || unavailableMsg
    },
    {
      label: "🐛 Pests",
      content: unavailableMsg
    },
    {
      label: "🍂 Seasonal Care",
      content: plantingTipsData?.seasonal_care
        ? formatSeasonalCare(plantingTipsData.seasonal_care)
        : unavailableMsg
    },
    {
      label: "🧱 Soil",
      content: plantingTipsData?.soil || unavailableMsg
    }
  ];

  const fetchPlantingTips = async () => {
    setLoading(true);

    if (!parcelId) {
      setAlertTitle('Parcel ID not found');
      setShowAlertModal(true);
      setLoading(false);
      return;
    }

    const requestBody = {
      parcel_id: parcelId,
      tree_name: treeName ,
    };

    console.log('🌱 Sending POST data:', requestBody);

    try {
      const response = await postRequest(ApiConstants.PLANTING_TIPS, requestBody);

      console.log('📋 Planting Tips API Response:', response.data);

      if (response?.status === 200 || response?.status === 201) {
        setPlantingTipsData(response.data?.data || response.data);
      } else {
        console.warn('⚠️ API response not successful, using mock data');
      }
    } catch (error) {
      console.error('❌ Error fetching planting tips:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPlantingTips();
  }, [parcelId]);


  const getRootDiagram = () => {
    if (plantingTipsData?.root_diagram) {
      return { uri: plantingTipsData.root_diagram };
    }
    return Images.dummy_diagram_planting;
  };

  const handleNavigateToReminders = () => {
    // const remindersData = {
    //   parcelId: parcelId,
    //   parcelName: plantingTipsData?.parcel_name,
    //   location: plantingTipsData?.location_name,
    //   parcelImage: parcelImage,
    //   plantingTipsData: plantingTipsData,
    //   scientificName: plantingTipsData?.scientific_name,
    //   treeAge: plantingTipsData?.age,
    //   treeSize: plantingTipsData?.size,
    //   soilType: plantingTipsData?.soil_type,
    //   treeImage: plantingTipsData.tree_image,
    // };
    // const parcelData = {
    //   soil_type: plantingTipsData?.soil_type,
    //   location_name: plantingTipsData?.location_name,
    //   recommended_trees: [{ name: treeName  }]
    // }

    // console.log('📤 Passing data to Reminders:', remindersData);

    navigate(ScreenConstants.REMINDERS, {
      treeName,
      soilType: plantingTipsData?.soil,
      locationName: plantingTipsData?.parcel_location,
      parcelId,
      plantingTipsData
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Loader visible={loading} />
      <AlertModal
        visible={showAlertModal}
        title={alertTitle}
        onOkPress={() => setShowAlertModal(false)}
      />

      <Header title={StringConstants.PLANTING_TIPS} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.treeView}>
          <View style={styles.topView}>
            <Text style={styles.treeName} numberOfLines={1}>
              {plantingTipsData?.tree_name || ''}
            </Text>
            {/* <View style={styles.rightIcons}>
              <Image source={Images.ic_download_circle} />
            </View> */}
          </View>

          <View style={styles.treeDetailsView}>
            <View style={styles.leftDetailsView}>
              <Text style={styles.name}>
                {plantingTipsData?.scientific_name || ''}
              </Text>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>AGE</Text>
                <Text style={[styles.value, { marginBottom: 26 }]}>
                  {plantingTipsData?.age || 'N/A'}
                </Text>
                <Text style={styles.title}>SIZE</Text>
                <Text style={styles.value}>
                  {plantingTipsData?.size || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.treeImageView}>
              <Image source={plantingTipsData?.tree_image ? { uri: plantingTipsData.tree_image } : Images.img_landscape} style={styles.treeImage} />
            </View>
          </View>
        </View>

        <View style={styles.topView2}>
          <Text style={styles.myParcels}>
            {plantingTipsData?.parcel_location || 'N/A'}
          </Text>
          <Pressable onPress={handleNavigateToReminders} style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreText}>Custom Alerts</Text>
            <Image source={Images.ic_plus} style={{ tintColor: Colors.WHITE }} />
          </Pressable>
        </View>

        <Text style={styles.soilName}>
          {plantingTipsData?.soil}
          {/* {plantingTipsData?.soil_type ? `${plantingTipsData.soil_type.charAt(0).toUpperCase() + plantingTipsData.soil_type.slice(1)} Soil` : 'N/A'} */}
        </Text>

        <Text style={styles.aboutText}>{StringConstants.ABOUT}</Text>
        <Text style={styles.aboutDescription}>
          {plantingTipsData?.about || 'No description available'}
        </Text>

        <Text style={styles.aboutText}>{'Ideal conditions 🌱'}</Text>
        <View style={styles.appropriateView}>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_sun} style={{ marginBottom: 10 }} />
            <Text style={styles.treeTitle}>Light</Text>
            <Text style={styles.treeTitle2}>
              {plantingTipsData?.ideal_conditions?.light || 'N/A'}
            </Text>
          </View>

          <View style={styles.appropriateItem}>
            <Image source={Images.ic_temperature} style={{ marginBottom: 10 }} />
            <Text style={styles.treeTitle}>TEMPERATURE</Text>
            <Text style={styles.treeTitle2}>
              {plantingTipsData?.ideal_conditions?.temperature_range || 'N/A'}
            </Text>
          </View>

          <View style={styles.appropriateItem}>
            <Image source={Images.ic_drop} style={{ marginBottom: 10 }} />
            <Text style={styles.treeTitle}>Water</Text>
            <Text style={styles.treeTitle2} numberOfLines={3} ellipsizeMode="tail">
              {plantingTipsData?.ideal_conditions?.water || 'N/A'}
            </Text>
          </View>
        </View>


        <View style={styles.soilWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                        color: selectedValue === index ? Colors.WHITE : Colors.DEEP_GREEN,
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

        {selectedValue === 0 && (
          <Image source={getRootDiagram()} style={styles.diagram1} />
        )}
        {/* {selectedValue === 3 && (
          <Image source={Images.dummy_pruning} style={styles.diagram2} />
        )} */}

        {careOptions[selectedValue] && careOptions[selectedValue].content && (
          <View style={styles.limitationsBox}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Text style={styles.limitationsText}>
                {careOptions[selectedValue].label}
              </Text>
            </View>

            {careOptions[selectedValue].content.split("\n").map((line: string, index: number) => (
              line.trim() && (
                <Text key={index} style={styles.moderateErosion}>
                  {"\u2022"} {line.trim()}
                </Text>
              )
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PlantingTips;