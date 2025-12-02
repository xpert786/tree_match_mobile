import React, { useRef, useState } from 'react';
import { View, StatusBar, Text, Image, ImageBackground, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from './styles';
import { Images } from '../../Assets';
import { StringConstants } from '../../Theme/StringConstants';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { getRequest, deleteRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import { useFocusEffect } from '@react-navigation/native';
import { capitalize } from '../../Theme/Helper';

const Home = () => {
  const [loading, setLoading] = React.useState(false);
  const [plantsData, setPlantsData] = React.useState([]);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [dashboardData, setDashboardData] = React.useState({
    parcels: [],
    parcel_image: '',
    notifications: {
      list: [],
    }
  });
  const [notificationToDelete, setNotificationToDelete] = React.useState(null);

  const deleteNotification = async (notificationId: any) => {
    console.log("deleteNotification called with ID:", notificationId);
    setLoading(true);

    const url = `${ApiConstants.BASE_URL}notifications/${notificationId}/`;
    console.log("Delete request URL:", url);

    const response = await deleteRequest(url);
    console.log("API response:", response);
    if (response?.status === 200) {
      const updatedNotifications = dashboardData.notifications.list.filter(
        notification => notification.id !== notificationId
      );
      console.log("Updated notifications list:", updatedNotifications);
      setDashboardData(prevData => ({
        ...prevData,
        notifications: {
          ...prevData.notifications,
          list: updatedNotifications
        }
      }));

      setAlertTitle("Notification deleted successfully");
      setShowAlertModal(true);
    } else {
      console.log("Failed to delete notification:", response?.data);
      setAlertTitle(response?.data?.message || "Failed to delete notification");
      setShowAlertModal(true);
    }

    setLoading(false);
  };

  const confirmDelete = (notificationId: any, notificationTitle: any) => {
    setAlertTitle(`Are you sure you want to delete "${notificationTitle}"?`);
    setShowAlertModal(true);
    setNotificationToDelete(notificationId);
  };

  const handleAlertOkPress = () => {
    if (notificationToDelete) {
      deleteNotification(notificationToDelete);
      setNotificationToDelete(null);
    } else {
      setShowAlertModal(false);
      setAlertTitle('');
    }
  };


  const fetchDashboardData = async () => {
    setLoading(true);
    const url = `${ApiConstants.BASE_URL}dashboard/`;

    const response = await getRequest(url);

    if (response?.status === 200) {
      setDashboardData(response.data?.data || {
        parcels: [],
        parcel_image: '',
        notifications: {
          list: [],
        }
      });
      console.log("📊 Dashboard API Response:", response.data?.data);

      fetchPlantsData();
    } else {
      // setAlertTitle(response?.data?.message || "Failed to load dashboard data");
      // setShowAlertModal(true);
      setDashboardData({
        parcels: [],
        parcel_image: '',
        notifications: {
          list: [],
        }
      });
    }

    setLoading(false);
  };

  const fetchPlantsData = async () => {
    const url = `${ApiConstants.BASE_URL}plants/?page=1&page_size=10`;

    const response = await getRequest(url);

    if (response?.status === 200) {
      setPlantsData(response.data?.results || []);
    } else {
      setPlantsData([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('🔄 Home screen focused - refreshing data...');
      fetchDashboardData();
    }, [])
  );

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const transformParcelsData = () => {
    return dashboardData.parcels.map((parcel: any) => ({
      id: parcel.id?.toString(),
      img: parcel.soil_image_url ? { uri: parcel.soil_image_url } : Images.img_landscape,
      name: parcel.parcel_name || 'Unnamed Parcel',
      location_name: parcel.location_name || 'Location not specified',
      moisture: parcel.moisture_percentage,
      acidity: parcel.acidity_ph,
      fertility: parcel.fertility_level,
      minerals: parcel.mineral_content_percentage,
      originalData: parcel
    }));
  };

  const transformPlantsData = () => {
    return plantsData.map((item: any, index: number) => ({
      id: item.id?.toString() || (index + 1).toString(),
      img: item.image ? { uri: item.image } : Images.img_tree1,
      tree_name: item.tree_name,
      originalData: item
    }));
  };

  const transformNotificationsData = () => {
    return dashboardData.notifications.list.slice(0, 3).map((notification: any, index: number) => {
      const isAlert = notification.notification_type.includes('alert') ||
        notification.message.toLowerCase().includes('alert');

      let treeName = notification.title;
      let idealPlantTime = 'Notification:';
      let days = '';

      if (notification.title.includes(':')) {
        treeName = notification.title.split(':')[1]?.trim() || notification.title;
      }

      const notificationDate = new Date(notification.date);
      const time = notificationDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      if (notification.notification_type === 'planting_date_added') {
        const dateMatch = notification.message.match(/date\s+([^ ]+\s+\d{1,2},\s+\d{4})/);
        if (dateMatch) {
          idealPlantTime = 'Planted on:';
          days = dateMatch[1];
        }
      } else if (notification.notification_type === 'plant_assigned') {
        idealPlantTime = 'Added on:';
        days = notificationDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      } else if (notification.notification_type === 'parcel_added') {
        idealPlantTime = 'Added on:';
        days = notificationDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      } else {
        idealPlantTime = 'Received:';
        days = notificationDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      }
      let notificationImage = isAlert ? Images.ic_ladybug : Images.dummy_image1;

      if (notification.plant_image) {
        notificationImage = { uri: notification.plant_image };
        console.log("🌳 Using notification plant_image:", notification.plant_image);
      } else if (notification.parcel_image) {
        notificationImage = { uri: notification.parcel_image };
        console.log("📸 Using notification parcel_image:", notification.parcel_image);
      }

      return {
        id: notification.id?.toString() || index.toString(),
        img: notificationImage,
        time: time,
        treeName: treeName,
        alert: isAlert,
        idealPlantTime: idealPlantTime,
        days: days,
        originalData: notification
      };
    });
  };

  const displayParcelsData = transformParcelsData();
  const displayPlantsData = transformPlantsData();
  const displayNotificationsData = transformNotificationsData();

  console.log("🔔 Transformed Notifications:", displayNotificationsData);

  const dummyParcelsData = [
    {
      id: '1',
      img: Images.img_landscape,
    }
  ];

  const dummyPlantsData = [
    {
      id: '1',
      img: Images.img_tree1,
      tree_name: 'Sample Tree'
    },
    {
      id: '2',
      img: Images.img_tree1,
      tree_name: 'Green Plant'
    }
  ];

  const dummyNotificationsData = [
    {
      id: '1',
      img: Images.dummy_image1,
      time: '09:00',
      treeName: 'Welcome to TreeMatch',
      alert: false,
      idealPlantTime: 'Get started:',
      days: 'Add your first tree'
    }
  ];

  const finalParcelsData = displayParcelsData.length > 0 ? displayParcelsData : dummyParcelsData;
  const finalPlantsData = displayPlantsData.length > 0 ? displayPlantsData : dummyPlantsData;
  const finalNotificationsData = displayNotificationsData.length > 0 ? displayNotificationsData : dummyNotificationsData;

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
            handleAlertOkPress();
            setAlertTitle('');
            setShowAlertModal(false);
          }}
        />
      )}

      <View style={styles.shadowWrapper}>
        <View style={styles.tabWrapper}>
          <Image source={Images.ic_tree_match} style={styles.headerText} />
          <View style={styles.topViewRightIcons}>
            <TouchableOpacity onPress={() => navigate(ScreenConstants.NOTIFICATIONS)}>
              <View style={{ position: 'relative' }}>
                <Image source={Images.ic_notification} style={{ marginRight: 15 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate(ScreenConstants.PROFILE)}>
              <Image source={Images.ic_profile} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.topView}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Image source={Images.ic_soil} />
            <Text style={styles.myParcels}>{StringConstants.MY_PARCELS}</Text>
          </View>
          <TouchableOpacity onPress={() => { navigate(ScreenConstants.PARCELS) }}>
            <Image source={Images.ic_right_arrow} />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={finalParcelsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateTitle}>No Data Available</Text>
                <Text style={styles.emptyStateText}>
                  Start by adding your first parcel to see your dashboard here.
                </Text>
              </View>
            }
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.imageContainer,
                  {
                    marginLeft: index === 0 ? 30 : 14,
                    marginRight: index === finalParcelsData.length - 1 ? 30 : 0,
                  },
                ]}
              >
                <Image source={item.img} style={styles.images} />

                {displayParcelsData.length > 0 && (
                  <View style={styles.detailsWrapper}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                      {item.name}
                    </Text>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                      {item.location_name}
                    </Text>
                    <View style={styles.allDetails}>
                      <View style={styles.details}>
                        <Image source={Images.ic_moisture} />
                        <Text style={styles.mainHead}>{StringConstants.MOISTURE}</Text>
                        <Text style={styles.value}>{item.moisture}%</Text>
                      </View>
                      <View style={styles.details}>
                        <Image source={Images.ic_acidity} />
                        <Text style={styles.mainHead}>{StringConstants.ACIDITY}</Text>
                        <Text style={styles.value}>{item.acidity}</Text>
                      </View>
                      <View style={styles.details}>
                        <Image source={Images.ic_fertility} />
                        <Text style={styles.mainHead}>{StringConstants.FERTILITY}</Text>
                        <Text style={styles.value}>{capitalize(item.fertility)}</Text>
                      </View>
                      <View style={styles.details}>
                        <Image source={Images.ic_minerals} />
                        <Text style={styles.mainHead}>{StringConstants.MINERALS}</Text>
                        <Text style={styles.value}>{item.minerals}%</Text>
                      </View>
                    </View>
                  </View>
                )}

                {displayParcelsData.length === 0 && (
                  <View style={styles.demoBadge}>
                    <Text style={styles.demoBadgeText}>Demo</Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>

        <View style={[styles.topView, { marginTop: 32 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Image source={Images.ic_two_leaves} />
            <Text style={styles.myParcels}>{StringConstants.MY_PLANTS}</Text>
          </View>
          <TouchableOpacity onPress={() => { navigate(ScreenConstants.MY_PLANTS) }}>
            <Image source={Images.ic_right_arrow} />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={finalPlantsData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.plantImageContainer,
                  {
                    marginLeft: index === 0 ? 30 : 14,
                    marginRight: index === finalPlantsData.length - 1 ? 30 : 0,
                  },
                ]}
              >
                <Image source={item.img} style={styles.plantsImages} />

                {displayPlantsData.length === 0 && (
                  <View style={styles.demoBadge}>
                    <Text style={styles.demoBadgeText}>Demo</Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>

        <View style={[styles.topView, { marginTop: 32 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Image source={Images.ic_bell_notification} />
            <Text style={styles.myParcels}>{StringConstants.NOTIFICATIONS}</Text>
          </View>
          <TouchableOpacity onPress={() => { navigate(ScreenConstants.NOTIFICATIONS) }}>
            <Image source={Images.ic_right_arrow} />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={finalNotificationsData}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={[styles.notificationContainer, {
                  backgroundColor: displayNotificationsData.length === 0 ?
                    Colors.LIGHT_GREY :
                    (item.alert ? Colors.RED : Colors.LIGHT_GREEN)
                }]}
              >
                <View style={styles.notificationWrapper}>
                  <View style={styles.timingsView}>
                    <View style={[styles.circle, {
                      borderColor: displayNotificationsData.length === 0 ?
                        Colors.GREY7 :
                        (item.alert ? Colors.RED : Colors.LIGHT_GREEN)
                    }]}>
                      <Text style={[styles.count, {
                        color: displayNotificationsData.length === 0 ?
                          Colors.GREY7 :
                          (item.alert ? Colors.RED : Colors.LIGHT_GREEN)
                      }]}>
                        {index + 1}
                      </Text>
                    </View>
                    <Text style={styles.day}>Today</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>

                  <View style={styles.verticalLine} />

                  <View style={styles.treeInfo}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                      <Image source={item.img} style={styles.treeimage} />
                      <Text
                        style={styles.treeName}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item.treeName}
                      </Text>
                    </View>

                    <Text style={styles.idealTime}>
                      {item.idealPlantTime}{" "}
                      <Text style={styles.days}>{item.days}</Text>
                    </Text>
                  </View>
                  {displayNotificationsData.length > 0 && (
                    <TouchableOpacity
                      onPress={() => confirmDelete(item.originalData.id, item.treeName)}
                      style={styles.crossIcon}
                    >
                      <Image source={Images.ic_cross}  />
                    </TouchableOpacity>
                  )}
                </View>
                {displayNotificationsData.length === 0 && (
                  <View style={styles.demoBadge}>
                    <Text style={styles.demoBadgeText}>Demo</Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;