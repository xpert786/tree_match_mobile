import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, Dimensions, TouchableOpacity, ScrollView, Pressable, FlatList } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { ApiConstants } from '../../Theme/ApiConstants';
import { getRequest } from '../../Network/apiClient';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import { Fonts } from '../../Theme/Fonts';
import { BarChart } from 'react-native-chart-kit';
// import { Toast } from 'toastify-react-native';
import Toast from 'react-native-toast-message';
import { capitalize } from '../../Theme/Helper';
const screenWidth = Dimensions.get("window").width;

const ParcelDetails = ({ route }: any) => {
  const { parcel } = route.params;
  const [parcelData, setParcelData] = useState(parcel);
  const [showAlertModal, setShowAlertModal] = React.useState(false)
  const [alertTitle, setAlertTitle] = React.useState('')
  const [loading, setLoading] = React.useState(false);
  const [plantingGuidanceData, setPlantingGuidanceData] = useState<any[]>([]);
  const [limitationsText, setLimitationsText] = useState("");

  // console.log("parcelData in ParcelDetails", parcelData);

  const data = {
    labels: parcelData?.land_use_history?.ph_levels_by_year.map((item: any) => item.year.toString()),
    datasets: [
      {
        data: parcelData?.land_use_history?.ph_levels_by_year.map((item: any) => item.ph),
        colors: parcelData?.land_use_history?.ph_levels_by_year.map((_: any, index: any) => () =>
          index % 2 === 0 ? "#086800" : "#51C248"
        ),
      },
    ],
  };

  useEffect(() => {
    const restApiToGetParcels = async () => {
      if (parcel?.id) {
        setLoading(true);
        const response = await getRequest(`${ApiConstants.GET_PARCELS}${parcel.id}/`);
        setLoading(false);

        console.log("HTTP Status Code restApiToGetParcels:", response.status);
        console.log("Response in restApiToGetParcels:", response.data);

        if (response.status === 200 || response.status === 201) {
          const updatedParcel = response.data.data || response.data;
          setParcelData(updatedParcel);
          const formattedGuidance =
            updatedParcel?.planting_guidance?.map((item: any, index: number) => ({
              id: index.toString(),
              name: item.name,
              description: `Sown in ${item.sow_in} • Harvest in ${item.harvest_in}`,
              yield: `${item.expected_yield_kg_per_hectare} Kg/Hec`,
              image: item.icon || item.image_url || Images.dummy_placeholder,
            })) || [];

          setPlantingGuidanceData(formattedGuidance);

          const formattedLimitations =
            updatedParcel?.limitations
              ?.map(
                (item: any) =>
                  `${item.type}: ${item.description}. ${item.mitigation}`
              )
              .join("\n") || "";
          setLimitationsText(formattedLimitations);
        }
        else {
          setShowAlertModal(true);
          setAlertTitle(response.message);
        }
      }
    };

    restApiToGetParcels();
  }, [parcel?.id]);

  const renderTreeItem = ({ item, index }: any) => {
    // console.log("item in plantation history:", item);
    console.log("item?.image_url in renderTreeItem", item?.image_url);

    return (
      <View style={styles.treeDetailsWrapper} key={index}>
        <Image source={item?.image_url ? { uri: item?.image_url } : Images.dummy_placeholder} style={styles.treeImage} />
        <View style={{ marginLeft: 22 }}>
          <Text style={styles.plantName}>{item?.name}</Text>
          <Text style={styles.plantYear}>{item?.period}</Text>
        </View>
      </View>
    )
  };

  const renderItem = ({ item }: any) => {
    // console.log("item in planting guidance renderitem:", item);

    return (
      <View style={styles.plantingGuidanceWrapper}>
        <Image source={{ uri: item.image }} style={styles.treeImage2} />

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
    )
  };

  const handleCustomAlertsPress = () => {
    console.log("📤 Navigating to ParcelAlerts with data:", { parcelData });

    navigate(ScreenConstants.PARCEL_ALERTS, { parcelData });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Loader visible={loading} />
      {showAlertModal &&
        <AlertModal
          visible={showAlertModal}
          title={alertTitle}
          onOkPress={() => {
            setAlertTitle('')
            setShowAlertModal(false)
          }}
        />
      }

      <Header title={StringConstants.PARCEL_DETAIL} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Image
          source={parcelData?.soil_image_url ? { uri: parcelData.soil_image_url } : Images.img_landscape}
          style={styles.images}
        />
        <Pressable style={styles.IIcon}
          onPress={() => {
            // Toast.success(parcelData?.soil_description)
            Toast.show({
              type: 'success',
              text1: parcelData?.soil_description
            });
          }}>
          <Image source={Images.ic_i_icon} />
        </Pressable>

        <View style={styles.topView}>
          <Text style={styles.myParcels}>
            {parcelData?.parcel_name || ''}
          </Text>
          <Pressable onPress={handleCustomAlertsPress} style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreText}>Custom Alerts</Text>
            <Image source={Images.ic_plus} style={{ tintColor: Colors.WHITE }} />
          </Pressable>
        </View>

        <Text style={styles.soilName}>
          {parcelData?.soil_type ? `${parcelData.soil_type.charAt(0).toUpperCase() + parcelData.soil_type.slice(1)}` : ''}
        </Text>
        <Text style={styles.soilName2}>
          {parcelData?.parcel_type || ''}
        </Text>

        <View style={styles.allDetails}>
          <View style={styles.details}>
            <Image source={Images.ic_moisture} />
            <Text style={styles.mainHead}>{StringConstants.MOISTURE}</Text>
            <Text style={[styles.mainHead, styles.value]}>
              {parcelData?.moisture_percentage ? `${parcelData.moisture_percentage}%` : 'N/A'}
            </Text>
          </View>
          <View style={styles.details}>
            <Image source={Images.ic_acidity} />
            <Text style={styles.mainHead}>{StringConstants.ACIDITY}</Text>
            <Text style={[styles.mainHead, styles.value]}>
              {parcelData?.acidity_ph || 'N/A'}
            </Text>
          </View>
          <View style={styles.details}>
            <Image source={Images.ic_fertility} />
            <Text style={styles.mainHead}>{StringConstants.FERTILITY}</Text>
            <Text style={[styles.mainHead, styles.value]}>
              {capitalize(parcelData?.fertility_level) || 'N/A'}
            </Text>
          </View>
          <View style={styles.details}>
            <Image source={Images.ic_minerals} />
            <Text style={styles.mainHead}>{StringConstants.MINERALS}</Text>
            <Text style={[styles.mainHead, styles.value]}>
              {parcelData?.mineral_content_percentage ? `${parcelData.mineral_content_percentage}%` : 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.topView2}>
          <Text style={styles.myParcels2}>{StringConstants.LAND_USE_HISTORY}</Text>
          <TouchableOpacity onPress={() => { }} style={styles.seeMoreBtn2}>
            <Text style={styles.seeMoreText2}>
              {parcelData?.land_use_history?.time_range ?
                parcelData.land_use_history.time_range.split('_').map((word: string) =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')
                : StringConstants.TIME_RANGE
              }
            </Text>
            {/* <Image source={Images.ic_right_arrow} /> */}
          </TouchableOpacity>
        </View>

        {parcelData?.land_use_history?.ph_levels_by_year &&
          <View style={styles.graphContainer}>
            <Text style={styles.phLevels}>pH Levels by Years</Text>

            <BarChart
              data={data}
              width={screenWidth - 100}
              height={160}
              fromZero
              withCustomBarColorFromData={true}
              flatColor={true}
              showValuesOnTopOfBars={false}
              chartConfig={{
                backgroundGradientFrom: Colors.WHITE,
                backgroundGradientTo: Colors.WHITE,
                decimalPlaces: 0,
                color: () => Colors.FOREST_GREEN,
                labelColor: () => Colors.FOREST_GREEN,
                propsForLabels: {
                  fontFamily: Fonts.MEDIUM,
                },
                propsForVerticalLabels: {
                  fontSize: 7,
                },
                propsForHorizontalLabels: {
                  fontSize: 9,
                },
                barPercentage: 0.5,
              }}
              withInnerLines={false}
              style={{
                marginVertical: 8,
                borderRadius: 8,
              }}
            />
          </View>}

        <Text style={styles.soilName2}>{StringConstants.PLANTATION_HISTORY}</Text>

        <FlatList
          data={parcelData?.plantation_history}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderTreeItem}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        <View style={styles.topView2}>
          <Text style={styles.myParcels2}>{StringConstants.PLANTING_GUIDANCE}</Text>
          <TouchableOpacity onPress={() => {
            navigate(ScreenConstants.PLANTING_GUIDANCE, { parcelId: parcel?.id })
          }} style={[styles.seeMoreBtn2, { width: 110 }]}>
            <Text style={styles.seeMoreText2}>{"See More"}</Text>
            <Image source={Images.ic_right_arrow} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={plantingGuidanceData}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 15 }}
        />

        {limitationsText &&
          <View style={styles.limitationsBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Image source={Images.ic_warning} />
              <Text style={styles.limitationsText}>{StringConstants.LIMITATIONS}</Text>
            </View>
            <Text style={styles.moderateErosion}>
              {limitationsText}
            </Text>
          </View>}
      </ScrollView>
    </View>
  );
};
export default ParcelDetails;