import React from 'react';
import { View, StatusBar, Text, Switch } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Colors } from '../../Theme/Colors';
import { getRequest, patchRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const NotificationSettings = () => {
  const [smartAlert, setSmartAlert] = React.useState(false);
  const [customReminder, setCustomReminder] = React.useState(false);
  const [seasonalTips, setSeasonalTips] = React.useState(false);
  const [syncCalender, setSyncCalender] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');

  const fetchNotificationSettings = async () => {
    setLoading(true);

    const response = await getRequest(ApiConstants.NOTIFICATION_SETTINGS);

    console.log('📋 Notification Settings API Response:', response.data);

    if (response?.status === 200 || response?.status === 201) {
      const settingsData = response.data?.data;
      console.log('🔧 Notification settings data:', settingsData);

      if (settingsData) {
        setSmartAlert(settingsData.smart_alerts ?? false);
        setCustomReminder(settingsData.custom_reminders ?? false);
        setSeasonalTips(settingsData.seasonal_tips ?? false);
        setSyncCalender(settingsData.sync_with_calendar ?? false);
      }
    } else {
      setAlertTitle(response?.message || "Failed to load notification settings");
      setShowAlertModal(true);
    }

    setLoading(false);
  };

  const updateNotificationSettings = async (field: string, value: boolean) => {
    const requestBody = {
      [field]: value
    };

    console.log('🔄 Updating notification settings:', requestBody);

    const response = await patchRequest(ApiConstants.NOTIFICATION_SETTINGS, requestBody);

    console.log('📋 Update Notification Settings API Response:', response.data);

    if (response?.status === 200 || response?.status === 201) {
      // setAlertTitle(response.data?.message || "Settings updated successfully");
      // setShowAlertModal(true);
    } else {
      if (field === 'smart_alerts') setSmartAlert(!value);
      if (field === 'custom_reminders') setCustomReminder(!value);
      if (field === 'seasonal_tips') setSeasonalTips(!value);
      if (field === 'sync_with_calendar') setSyncCalender(!value);

      setAlertTitle(response?.message || "Failed to update settings");
      setShowAlertModal(true);
    }
  };

  // Handler functions for each switch
  const handleSmartAlertToggle = (value: boolean) => {
    setSmartAlert(value);
    updateNotificationSettings('smart_alerts', value);
  };

  const handleCustomReminderToggle = (value: boolean) => {
    setCustomReminder(value);
    updateNotificationSettings('custom_reminders', value);
  };

  const handleSeasonalTipsToggle = (value: boolean) => {
    setSeasonalTips(value);
    updateNotificationSettings('seasonal_tips', value);
  };

  const handleSyncCalendarToggle = (value: boolean) => {
    setSyncCalender(value);
    updateNotificationSettings('sync_with_calendar', value);
  };

  React.useEffect(() => {
    fetchNotificationSettings();
  }, []);

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

      <Header title={StringConstants.NOTIFICATION} />

      <View style={[styles.alertsView, { marginTop: 20 }]}>
        <Text style={styles.leftText}>Smart Alerts</Text>
        <Switch
          value={smartAlert}
          onValueChange={handleSmartAlertToggle}
          trackColor={{ false: "#ccc", true: Colors.GREEN2 }}
          thumbColor={Colors.WHITE}
          disabled={loading}
        />
      </View>
      <View style={styles.alertsView}>
        <Text style={styles.leftText}>Custom Reminders</Text>
        <Switch
          value={customReminder}
          onValueChange={handleCustomReminderToggle}
          trackColor={{ false: "#ccc", true: Colors.GREEN2 }}
          thumbColor={Colors.WHITE}
          disabled={loading}
        />
      </View>
      <View style={styles.alertsView}>
        <Text style={styles.leftText}>Seasonal Tips</Text>
        <Switch
          value={seasonalTips}
          onValueChange={handleSeasonalTipsToggle}
          trackColor={{ false: "#ccc", true: Colors.GREEN2 }}
          thumbColor={Colors.WHITE}
          disabled={loading}
        />
      </View>
      <View style={styles.alertsView}>
        <Text style={styles.leftText}>Sync with Calendar</Text>
        <Switch
          value={syncCalender}
          onValueChange={handleSyncCalendarToggle}
          trackColor={{ false: "#ccc", true: Colors.GREEN2 }}
          thumbColor={Colors.WHITE}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default NotificationSettings;