import React from 'react';
import { View, StatusBar, Text, Image, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import SearchInput from '../../Components/SearchInput';
import { getRequest, postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';
import { Fonts } from '../../Theme/Fonts';

const MyPlants = () => {
  const [search, setSearch] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [plantsData, setPlantsData] = React.useState([]);
  const [locationTreesData, setLocationTreesData] = React.useState([]);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedTree, setSelectedTree] = React.useState<any>(null);
  const [showLocationTrees, setShowLocationTrees] = React.useState(false);

  const fetchPlantsData = async (searchQuery = '') => {
    setLoading(true);
    const url = `plants/?search=${searchQuery}&page=1&page_size=10`;

    const response = await getRequest(url);
    console.log('response in fetchPlantsData:', response.data);
    setLoading(false);

    if (response?.status === 200) {
      setPlantsData(response.data?.results || []);
    } else {
      setAlertTitle(response?.data?.message || response?.message || "Failed to load plants data");
      setShowAlertModal(true);
      setPlantsData([]);
    }
  };

  const fetchTreesByLocation = async (locationName: any) => {
    setLoading(true);
    const url = `trees/list-by-location/`;
    const postData = {
      location_name: locationName
    };

    const response = await postRequest(url, postData);

    setLoading(false);

    if (response?.status === 200 || response?.status === 201) {
      setLocationTreesData(response.data?.data?.trees || []);
      setShowLocationTrees(true);
      console.log("Location trees data:", response.data?.data?.trees);
    } else {
      setAlertTitle(response?.data?.message || response?.message || "Failed to load trees for this location");
      setShowAlertModal(true);
      setLocationTreesData([]);
    }
  };

  const assignTreeToPlants = async (treeName: any) => {
    setLoading(true);
    const url = `plants/assign-tree/`;

    // Get the image URL from the selected tree
    const treeImage = selectedTree?.imageUrl || selectedTree?.originalData?.image_url || null;

    const postData = {
      tree_name: treeName,
      image: treeImage
    };

    console.log("Adding tree to plants:", treeName);
    console.log("Request data:", postData);

    const response = await postRequest(url, postData);

    setLoading(false);
    console.log("Add tree response:", response);

    if (response?.status === 200 || response?.status === 201) {
      setAlertTitle(response.data?.message || "Tree added to plants successfully!");
      setShowAlertModal(true);
      setShowAddModal(false);
      setSelectedTree(null);
      fetchPlantsData();
      setShowLocationTrees(false);
      setSearch("");
    } else {
      setAlertTitle(response?.data?.message || response?.message || "Failed to add tree to plants");
      setShowAlertModal(true);
    }
  };

  const handleSearch = async () => {
    const searchText = search.trim();
    if (searchText) {
      await fetchTreesByLocation(searchText);
    } else {
      setAlertTitle("Please enter a location to search");
      setShowAlertModal(true);
    }
  };

  const handleAddTree = (tree: any) => {
    console.log("Tree selected for adding:", tree);
    console.log("Tree image URL:", tree.imageUrl || tree.originalData?.image_url);
    setSelectedTree(tree);
    setShowAddModal(true);
  };

  const confirmAddTree = async () => {
    if (selectedTree) {
      await assignTreeToPlants(selectedTree.name);
    }
  };

  const transformPlantsData = () => {
    return plantsData.map((item: any, index: number) => ({
      id: item.id?.toString() || (index + 1).toString(),
      name: item.tree_name || 'Unknown Tree',
      years: item.age_range || "Age not specified",
      feet: item.size_range || "Size not specified",
      image: item.image ? { uri: item.image } : Images.img_tree1,
      imageUrl: item.image,
      originalData: item
    }));
  };

  const transformLocationTreesData = () => {
    return locationTreesData.map((item: any, index: number) => ({
      id: (index + 1).toString(),
      name: item.name,
      years: item.age_range,
      feet: item.size_range,
      image: item.image_url ? { uri: item.image_url } : Images.img_tree1,
      imageUrl: item.image_url,
      originalData: item
    }));
  };

  const displayData = showLocationTrees ? transformLocationTreesData() : transformPlantsData();

  React.useEffect(() => {
    fetchPlantsData();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.cardView}>
      <View style={styles.treeImage}>
        <Image source={item.image} style={styles.treePic} />
        <Text style={styles.treeName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.timeYears}>{item.years}</Text>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.feetWrapper}>
          <Image source={Images.ic_zoom_out} />
          <Text style={styles.feet} numberOfLines={1} ellipsizeMode="tail">
            {item.feet}
          </Text>
        </View>
        {showLocationTrees && (
          <TouchableOpacity onPress={() => handleAddTree(item)}>
            <Image source={Images.ic_round_add} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

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

      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { fontFamily: Fonts.SEMIBOLD }]}>
              Add Tree to Plants
            </Text>

            <Text style={[styles.modalMessage, { fontFamily: Fonts.REGULAR }]}>
              Are you sure you want to add{" "}
              <Text style={{ fontFamily: Fonts.SEMIBOLD }}>"{selectedTree?.name}"</Text>
              {" "}to your plants?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={[styles.cancelButtonText, { fontFamily: Fonts.MEDIUM }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmAddTree}
              >
                <Text style={[styles.confirmButtonText, { fontFamily: Fonts.MEDIUM }]}>
                  Add Tree
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Header title={StringConstants.MY_PLANTS} showLeavesIcon />

      <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder={StringConstants.ENTER_YOUR_LOCATION}
          onSubmitEditing={handleSearch}
          tapOnRightIcon={handleSearch}
        />

        <View style={styles.topView}>
          <Text style={[styles.myParcels, { fontFamily: Fonts.SEMIBOLD }]}>
            {showLocationTrees ? "Trees for Location" : "My Plants"}
          </Text>
        </View>

        {displayData.length > 0 ? (
          <FlatList
            data={displayData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 30,
              marginBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        ) : (
          !loading && (
            <View style={styles.noDataContainer}>
              <Text style={[styles.noDataText, { fontFamily: Fonts.REGULAR }]}>
                {showLocationTrees
                  ? "No trees found for this location"
                  : "No plants added yet. Search for plants location to add them in My Plants section."}
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default MyPlants;