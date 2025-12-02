import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { ApiConstants } from '../../Theme/ApiConstants';
import { postRequest } from '../../Network/apiClient';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import { Toast } from 'toastify-react-native';

const ParcelAlerts = ({ route }: any) => {
  const { parcelData } = route.params || {};

  console.log("🔔 ParcelAlerts Route Params:", parcelData);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedValues, setSelectedValues] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertsData, setAlertsData] = useState<any>(null);

  useEffect(() => {
    const fetchAlertsData = async () => {
      setLoading(true);

      const requestBody = {
        tree_name: parcelData?.recommended_trees[0]?.name,
        soil_type: parcelData?.soil_type,
        location_name: parcelData?.location_name
      };

      console.log("🌳 Sending dynamic request body:", requestBody);

      try {
        const response = await postRequest(ApiConstants.TREE_ALERTS, requestBody);

        console.log("✅ HTTP Status Code:", response.status);
        console.log("📋 API Response:", response.data);

        if (response.status === 200 || response.status === 201) {
          setAlertsData(response.data.data || response.data);
        } else {
          setAlertTitle(response.data?.message || response.message || "Failed to load alerts data");
          setShowAlertModal(true);
        }
      } catch (error) {
        console.log("❌ API Error:", error);
        setAlertTitle("Network error. Please try again.");
        setShowAlertModal(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAlertsData();
  }, [parcelData]);

  const getTreeImage = () => {
    if (alertsData?.tree_image_url) {
      return { uri: alertsData.tree_image_url };
    }
    if (parcelData?.soil_image_url) {
      return { uri: parcelData.soil_image_url };
    }
    return Images.img_landscape;
  };

  const getTreeName = () => {
    return alertsData?.tree_name || parcelData?.parcel_name || '';
  };

  const getScientificName = () => {
    return alertsData?.scientific_name || '';
  };

  const getAgeRange = () => {
    return alertsData?.age_range  || 'N/A';
  };

  const getSizeRange = () => {
    return alertsData?.size_range || 'Not specified';
  };

  const tapOnEdit = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSelect = (index: number, value: string) => {
    setSelectedValues(prev => ({ ...prev, [index]: value }));
    setExpandedIndex(null);
  };

  const formatAlertData = () => {
    if (!alertsData?.alert_items) return [];

    return alertsData.alert_items.map((item: any, index: number) => {
      const dropdownOptions = item.sub_items || [
        item.window,
        `Reschedule ${item.title}`,
        `Skip ${item.title}`
      ];

      return {
        id: index + 1,
        title: `${item.title} (${item.window})`,
        dropdown: dropdownOptions,
        originalItem: item
      };
    });
  };

  const alertItems = formatAlertData();


 

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Loader visible={loading} />
      {showAlertModal && (
        <AlertModal
          visible={showAlertModal}
          title={alertTitle}
          onOkPress={() => {
            setAlertTitle('');
            setShowAlertModal(false);
          }}
        />
      )}

      <Header title={StringConstants.PARCEL_ALERTS} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.treeView}>
          <View style={styles.topView}>
            <Text style={styles.treeName} numberOfLines={1}>
              {getTreeName()}
            </Text>
            {/* <Pressable style={styles.rightIcons} onPress={downloadParcelInAsync}>
              <Image source={Images.ic_download_circle} style={{ marginHorizontal: 5 }} />
            </Pressable> */}
          </View>

          <View style={styles.treeDetailsView}>
            <View style={styles.leftDetailsView}>
              <Text style={styles.name}>
                {getScientificName()}
              </Text>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>AGE</Text>
                <Text style={[styles.value, { marginBottom: 26 }]}>
                  {getAgeRange()}
                </Text>
                <Text style={styles.title}>SIZE</Text>
                <Text style={styles.value}>
                  {getSizeRange()}
                </Text>
              </View>
            </View>
            <View style={styles.treeImageView}>
              <Image
                source={getTreeImage()}
                style={styles.treeImage}
              />
              <Pressable style={styles.iIcon} onPress={()=> Toast.success(alertsData.ai_summary)}>
              <Image source={Images.ic_i_icon}  />
              </Pressable>
            </View>
          </View>
        </View>

        <Text style={styles.alerts}>Alerts</Text>

        {alertItems.length > 0 ? (
          alertItems.map((item: any, index: number) => {
            const currentValue = selectedValues[index];

            let displayTitle = item.title;
            if (currentValue) {
              const titleWithoutWindow = item.originalItem.title;
              displayTitle = `${titleWithoutWindow} (${currentValue})`;
            }

            return (
              <View key={item.id} style={styles.listView}>
                <View style={styles.rowBetween}>
                  <Text style={styles.listText}>{`${index + 1}. ${displayTitle}`}</Text>
                  <TouchableOpacity onPress={() => tapOnEdit(index)}>
                    <Image
                      source={expandedIndex === index ? Images.ic_down_arrow : Images.ic_edit_pen}
                    />
                  </TouchableOpacity>
                </View>

                {expandedIndex === index && (
                  <View style={styles.dropdownContainer}>
                    {item.dropdown.map((label: string, i: number) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => handleSelect(index, label)}
                        style={styles.dropdownItem}
                      >
                        <Text style={styles.dropdownLabel}>{label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })
        ) : null}

        <TouchableOpacity
          style={styles.setAlertBtn}
          onPress={() => navigate(ScreenConstants.NOTIFICATION_SETTINGS)}
        >
          <Text style={styles.setAlerts}>Set Alerts</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ParcelAlerts;