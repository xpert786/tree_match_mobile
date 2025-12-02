import React from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const Reminders = ({ route }: any) => {
  const { treeName, parcelId, plantingTipsData } = route.params || {};

  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [selectedValues, setSelectedValues] = React.useState<{ [key: number]: string }>({});
  const [loading, setLoading] = React.useState(false);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [alertsData, setAlertsData] = React.useState<any[]>([]);

  // -------------------------------
  // Fetch Dynamic Alerts Data
  // -------------------------------
  React.useEffect(() => {
    const generateAlertsData = async () => {
      setLoading(true);

      const requestBody = {
        tree_name: treeName,
      };

      try {
        const response = await postRequest(
          `${ApiConstants.GET_PARCELS}${parcelId}${ApiConstants.GENERATE_ALERTS}`,
          requestBody
        );

        if (response.status === 200 || response.status === 201) {
          const apiData = response?.data?.data?.alerts || [];
          setAlertsData(apiData);
        } else {
          setAlertTitle(
            response.data?.message || response.message || 'Failed to load alerts data'
          );
          setShowAlertModal(true);
        }
      } catch (error) {
        setAlertTitle('Network error. Please try again.');
        setShowAlertModal(true);
      } finally {
        setLoading(false);
      }
    };

    generateAlertsData();
  }, []);

  // -------------------------------
  // Build Alerts List for UI
  // -------------------------------
  const alertItems = alertsData.map((item: any, index: number) => ({
    id: index + 1,
    title: `${item.title} (${item.window || ''})`,
    dropdown: item.sub_items || [], // Use API sub items
    originalData: item,
  }));

  // -------------------------------
  // Expand / Collapse Dropdown
  // -------------------------------
  const tapOnEdit = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // -------------------------------
  // Select Dropdown Option
  // -------------------------------
  const handleSelect = (index: number, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [index]: value }));
    setExpandedIndex(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />

      <Loader visible={loading} />

      <AlertModal
        visible={showAlertModal}
        title={alertTitle}
        onOkPress={() => setShowAlertModal(false)}
      />

      <Header title={StringConstants.REMINDERS} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Tree Details Section */}
        <View style={styles.treeView}>
          <View style={styles.topView}>
            <Text style={styles.treeName} numberOfLines={1}>
              {plantingTipsData?.tree_name || ''}
            </Text>
          </View>

          <View style={styles.treeDetailsView}>
            <View style={styles.leftDetailsView}>
              <Text style={styles.name}>{plantingTipsData?.scientific_name || ''}</Text>

              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>AGE</Text>
                <Text style={[styles.value, { marginBottom: 26 }]}>
                  {plantingTipsData?.age || 'Unknown age'}
                </Text>

                <Text style={styles.title}>SIZE</Text>
                <Text style={styles.value}>
                  {plantingTipsData?.size || 'Unknown Size'}
                </Text>
              </View>
            </View>

            <View style={styles.treeImageView}>
              <Image
                source={
                  plantingTipsData?.tree_image
                    ? { uri: plantingTipsData.tree_image }
                    : Images.img_landscape
                }
                style={styles.treeImage}
              />
            </View>
          </View>
        </View>

        {/* Alerts Section */}
        <Text style={styles.alerts}>Alerts</Text>

        {alertItems.length > 0 &&
          alertItems.map((item: any, index: number) => {
            const currentValue = selectedValues[index];

            const bracketValue = currentValue
              ? `(${currentValue})`
              : item.title.match(/\(.*?\)/)?.[0] || '';  // existing (value)
            const newTitle = item.title.replace(/\(.*?\)/, bracketValue);

            return (
              <View key={item.id} style={styles.listView}>
                <View style={styles.rowBetween}>
                  <Text style={styles.listText}>{`${index + 1}. ${newTitle}`}</Text>

                  <TouchableOpacity onPress={() => tapOnEdit(index)}>
                    <Image
                      source={
                        expandedIndex === index
                          ? Images.ic_down_arrow
                          : Images.ic_edit_pen
                      }
                    />
                  </TouchableOpacity>
                </View>

                {expandedIndex === index && (
                  <View style={styles.dropdownContainer}>
                    {item.dropdown.length > 0 ? (
                      item.dropdown.map((label: string, i: number) => (
                        <TouchableOpacity key={i} onPress={() => handleSelect(index, label)}>
                          <Text style={styles.dropdownLabel}>{label}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={styles.dropdownLabel}>No options available</Text>
                    )}
                  </View>
                )}
              </View>
            );
          })}

        {/* Set Alerts Button */}
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

export default Reminders;
