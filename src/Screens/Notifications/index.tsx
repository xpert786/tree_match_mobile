import React from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { getRequest, deleteRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const Notifications = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = React.useState<boolean>(false);
  const [alertTitle, setAlertTitle] = React.useState<string>('');
  const [notifications, setNotifications] = React.useState<any>([]);
  const [notificationToDelete, setNotificationToDelete] = React.useState<any>(null);

  const formatTime = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDay = (dateString: any) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const deleteNotification = async (notificationId: any) => {
    console.log("deleteNotification called with ID:", notificationId);
    setLoading(true);

    const url = `${ApiConstants.BASE_URL}notifications/${notificationId}/`;
    console.log("Delete request URL:", url);

    try {
      const response = await deleteRequest(url);
      console.log("API response:", response);

      if (response?.status === 200) {
        console.log("Current notifications before deletion:", notifications);

        const updatedNotifications = notifications.filter(
          (notification: any) => notification.id.toString() !== notificationId.toString()
        );

        console.log("Updated notifications list:", updatedNotifications);
        setNotifications(updatedNotifications);

        setAlertTitle("Notification deleted successfully");
        setShowAlertModal(true);
      } else {
        console.log("Failed to delete notification:", response?.data);
        setAlertTitle(response?.data?.message || "Failed to delete notification");
        setShowAlertModal(true);
      }
    } catch (error) {
      console.log("Error in deleteNotification:", error);
      setAlertTitle("An error occurred while deleting notification");
      setShowAlertModal(true);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (notificationType: any, parcelImage: any) => {
    if (parcelImage) {
      return { uri: parcelImage };
    }

    switch (notificationType) {
      case 'plant_assigned':
        return Images.ic_round_add;
      case 'parcel_added':
        return Images.dummy_image1;
      case 'subscription_created':
        return Images.ic_ladybug;
      default:
        return Images.dummy_image1;
    }
  };

  const getNotificationColor = (notificationType: any) => {
    switch (notificationType) {
      case 'plant_assigned':
        return '#7DC94F';
      case 'parcel_added':
        return '#40E2FF';
      case 'subscription_created':
        return '#ecec71ff';
      default:
        return '#c78221ff';
    }
  };

  const getNotificationCount = (isRead: any) => {
    return isRead ? null : 1;
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const url = `${ApiConstants.BASE_URL}notifications/`;
      const response = await getRequest(url);

      if (response?.status === 200) {
        console.log("Fetched notifications:", response.data?.data?.notifications);
        setNotifications(response.data?.data?.notifications || []);
      } else {
        setAlertTitle(response?.data?.message || response?.message || "Failed to load notifications");
        setShowAlertModal(true);
        setNotifications([]);
      }
    } catch (error) {
      console.log("Error fetching notifications:", error);
      setAlertTitle("An error occurred while fetching notifications");
      setShowAlertModal(true);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (notificationId: any, notificationTitle: any) => {
    console.log("Confirm delete for:", notificationId, notificationTitle);
    setAlertTitle(`Are you sure you want to delete "${notificationTitle}"?`);
    setShowAlertModal(true);
    setNotificationToDelete(notificationId);
  };

  const handleAlertOkPress = () => {
    console.log("Alert OK pressed, notificationToDelete:", notificationToDelete);
    if (notificationToDelete) {
      deleteNotification(notificationToDelete);
      setNotificationToDelete(null);
    } else {
      setShowAlertModal(false);
      setAlertTitle('');
    }
  };

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const transformNotificationData = () => {
    console.log("Transforming notifications, count:", notifications.length);
    return notifications.map((item: any, index: number) => ({
      id: item.id.toString(),
      img: getNotificationIcon(item.notification_type, item.parcel_image),
      time: formatTime(item.date),
      treeName: item.title,
      alert: false,
      idealPlantTime: item.message.split(':')[0],
      days: item.message.split(':').slice(1).join(':').trim(),
      showImage: true,
      today: formatDay(item.date),
      count: getNotificationCount(item.is_read),
      color: getNotificationColor(item.notification_type),
      serialNumber: index + 1,
      originalData: item
    }));
  };

  const notificationData = transformNotificationData();
  console.log("Final notificationData for render:", notificationData);

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
        onOkPress={() => {
          handleAlertOkPress();
          setAlertTitle('');
          setShowAlertModal(false);
        }}
      />

      <Header title={StringConstants.NOTIFICATION} />

      <FlatList
        data={notificationData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 30 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={[styles.notificationContainer, {
            backgroundColor: item.color
          }]}>
            <View style={styles.notificationWrapper}>
              <View style={styles.timingsView}>
                {item.count &&
                  <View style={[styles.circle, { borderColor: item.alert ? Colors.RED : Colors.LIGHT_GREEN }]}>
                    <Text style={[styles.count, {
                      color: item.alert ? Colors.RED : Colors.LIGHT_GREEN
                    }]}>
                      {index + 1}
                    </Text>
                  </View>
                }
                <Text style={styles.day}>{item.today}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <View style={styles.verticalLine} />

              <View style={styles.treeInfo}>
                {item.img &&
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
                }

                <Text style={styles.idealTime}>
                  {item.idealPlantTime}{" "}
                  {item.days !== "" && <Text style={styles.days}>{item.days}</Text>}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => confirmDelete(item.id, item.treeName)}
                style={styles.deleteButton}
              >
                <Image source={Images.ic_cross} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Notifications;