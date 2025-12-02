import React from 'react';
import { View, StatusBar, Text, Image, Dimensions, TouchableOpacity, ScrollView, Pressable, FlatList, Modal } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { Calendar } from 'react-native-calendars';
import { Fonts } from '../../Theme/Fonts';
import { postRequest, getRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import { Toast } from 'toastify-react-native';

const formatDate = (isoDate: string) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${month}/${day}/${year}`;
};

const formatDateForAPI = (isoDate: string) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
};

const AssignToParcel = ({ route }: any) => {
  const { parcelId, treeName, treeId } = route.params || {};

  const [date, setDate] = React.useState('');
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [selectedTrees, setSelectedTrees] = React.useState<any[]>([]);
  const [treesData, setTreesData] = React.useState<any[]>([]);
  const [parcelDetails, setParcelDetails] = React.useState<any>(null);

  const fetchParcelDetails = async () => {
    if (!parcelId) return;

    setLoading(true);
    try {
      const response = await getRequest(`${ApiConstants.ASSIGN_TREE_TO_PARCEL}${parcelId}/`);
      console.log("📦 Parcel Details API Response:", response.data);

      if (response?.status === 200) {
        setParcelDetails(response.data?.data);
      } else {
        console.log("❌ Failed to fetch parcel details");
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchParcelDetails();
  }, [parcelId]);



  const getParcelImage = () => {
    if (parcelDetails?.soil_image_url) {
      return { uri: parcelDetails.soil_image_url };
    } else {
      return Images.img_landscape;
    }
  };

  const getTreeImage = (tree: any) => {
    if (tree?.image) {
      return tree.image;
    }
    if (tree?.image_url) {
      return { uri: tree.image_url };
    }
    return Images.img_tree1;
  };

  const fetchTreesData = async () => {
    setLoading(true);
    const url = `plants/?page=1&page_size=10`;

    const response = await getRequest(url);
    console.log("response in get plants api:");


    setLoading(false);

    if (response?.status === 200) {
      setTreesData(response.data?.results || []);
    } else {
      setAlertTitle(response?.data?.message || response?.message || "Failed to load trees data");
      setShowAlertModal(true);
      setTreesData([]);
    }
  };

  React.useEffect(() => {
    fetchTreesData();
  }, []);

  const transformTreesData = () => {
    return treesData.map((item, index) => ({
      id: item.id?.toString() || (index + 1).toString(),
      name: item.tree_name || 'Unknown Tree',
      years: item.age_range || "Age not specified",
      feet: item.size_range || "Size not specified",
      image: item.image ? { uri: item.image } : Images.img_tree1,
      originalData: item
    }));
  };

  const displayTreesData = transformTreesData();

  // ✅ Check if trees are available
  const hasTreesData = displayTreesData.length > 0;

  const toggleTreeSelection = (tree: any) => {
    setSelectedTrees(prev => {
      const isSelected = prev.some(t => t.id == tree.id);

      if (isSelected) {
        return prev.filter(t => t.id !== tree.id);
      } else {
        return [...prev, tree];
      }
    });
  };

  React.useEffect(() => {
    console.log("Selected Tree IDs:", selectedTrees);
  }, [selectedTrees]);

  const submitPlantingDate = async () => {
    if (!date) {
      setAlertTitle('Please select a planting date');
      setShowAlertModal(true);
      return;
    }

    if (selectedTrees.length === 0) {
      setAlertTitle('Please select at least one tree');
      setShowAlertModal(true);
      return;
    }

    if (!parcelId) {
      setAlertTitle('Parcel ID not found. Please go back and try again.');
      setShowAlertModal(true);
      return;
    }

    setLoading(true);

    const requestBody = {
      tree_ids: selectedTrees.map(tree => parseInt(tree.id)),
      planting_date: formatDateForAPI(date),
      notes: `Planting for ${selectedTrees.length} tree(s) on ${formatDate(date)}`
    };

    console.log('🌱 Submitting planting date for parcel ID:', parcelId);
    console.log('📦 Request Body:', requestBody);
    console.log('🔗 Full API URL:', `${ApiConstants.BASE_URL}parcels/${parcelId}/create-planting-date/`);

    const response = await postRequest(`parcels/${parcelId}/create-planting-date/`, requestBody);
    console.log('📋 Planting date API response data:', response?.data);

    setLoading(false);

    if (response?.status === 200 || response?.status === 201) {
       Toast.success('Planting date set successfully!'); 
      setTimeout(() => {
        navigate(ScreenConstants.PLANTING_TIPS, {
          parcelId: parcelId,
          treeName: treeName,
          selectedTrees: selectedTrees,
          parcelImage: getParcelImage(),
        });
      }, 1000);
    } else {
      console.log("error in setting planting date");

    }
  };

  const renderItem = ({ item }: any) => {

    return (
      <Pressable
        style={styles.cardView}
        onPress={() => toggleTreeSelection(item)}
      >
        <View style={styles.treeImage}>
          <Image source={item.image} style={styles.treePic} />
          <Text style={styles.treeName} numberOfLines={1} ellipsizeMode='tail'>{item?.name}</Text>
          <Text style={styles.timeYears}>{item?.years}</Text>
        </View>
        <View style={styles.bottomView}>
          <Image source={Images.ic_zoom_out} style={{ height: 8, width: 8 }} />
          <Text
            style={styles.feet}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.feet}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderSelectedItem = ({ item }: any) => (
    <View style={styles.addedPlantsView}>
      <View style={{ flexDirection: "row", flexShrink: 1 }}>
        <Image source={getTreeImage(item)} style={styles.plantImage} />
        <View style={{ justifyContent: "center", marginLeft: 10, flexShrink: 1 }}>
          <Text
            style={styles.treeName2}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text style={styles.years}>{item.years}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleTreeSelection(item)}>
        <Image source={Images.ic_round_cross} style={{ marginRight: 5 }} />
      </TouchableOpacity>
    </View>
  );

  const isFormValid = date && selectedTrees.length > 0;

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

      <Header title={StringConstants.PLANTING_DATE} />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Image source={getParcelImage()} style={styles.images} />

        <View style={styles.topView}>
          <Text style={styles.myParcels}>{parcelDetails?.parcel_name}</Text>
        </View>

        <Text style={styles.soilName}>{parcelDetails?.soil_type || parcelDetails?.parcel_type}</Text>

        <View style={styles.topView2}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.parcelsText}>{StringConstants.ADD_TREE}</Text>
            <Text numberOfLines={2} style={styles.recommendationLine}>
              {StringConstants.YOU_MAY_ADD_MULTIPLE_TREE}
            </Text>
          </View>

          {hasTreesData && (
            <TouchableOpacity onPress={() => { navigate(ScreenConstants.MY_PLANTS) }} style={styles.seeMoreBtn}>
              <Text style={styles.seeMoreText}>See More</Text>
              <Image source={Images.ic_right_arrow} />
            </TouchableOpacity>
          )}
        </View>

        {hasTreesData ? (
          <>
            <FlatList
              data={displayTreesData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
            />

            {selectedTrees.length > 0 && (
              <>
                <Text style={[styles.parcelsText, { marginLeft: 30, marginTop: 20, marginBottom: 10 }]}>
                  Selected Trees
                </Text>
                <FlatList
                  data={selectedTrees}
                  renderItem={renderSelectedItem}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 30, marginBottom: 20 }}
                  ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                />
              </>
            )}
          </>
        ) : (
          <View style={styles.noTreesContainer}>
            <Text style={styles.noTreesText}>No trees available at the moment</Text>
          </View>
        )}

        <Text style={[styles.parcelsText, { marginLeft: 30, marginBottom: 20 }]}>{StringConstants.PLANTING_DATE}</Text>

        <TouchableOpacity onPress={() => setShowCalendar(true)} activeOpacity={0.8}>
          <View style={styles.dropdown}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={Images.ic_calender} style={{ width: 45, height: 45 }} />
              <Text style={date ? styles.selectedTextStyle : styles.placeholderStyle}>
                {date ? formatDate(date) : "MM/DD/YYYY"}
              </Text>
            </View>
            <Image source={Images.ic_dropdown} style={{ width: 45, height: 45, position: "absolute", right: 8 }} />
          </View>
        </TouchableOpacity>

        {/* Modal Calendar */}
        <Modal
          transparent
          visible={showCalendar}
          animationType="none"
          onRequestClose={() => setShowCalendar(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Calendar
                onDayPress={(day: any) => {
                  setDate(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{
                  [date]: { selected: true, selectedColor: Colors.FOREST_GREEN },
                }}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCalendar(false)}
              >
                <Text style={{ color: Colors.WHITE, fontFamily: Fonts.SEMIBOLD }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[
            styles.bottomButtons,
            {
              backgroundColor: isFormValid ? Colors.FOREST_GREEN : Colors.GREY12,
              opacity: (isFormValid && hasTreesData) ? 1 : 0.6
            }
          ]}
          onPress={submitPlantingDate}
          disabled={!isFormValid || !hasTreesData || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Setting Date...' :
              !hasTreesData ? 'No Trees Available' :
                `Submit Date -->`}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default AssignToParcel;