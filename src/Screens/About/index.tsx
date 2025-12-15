import React from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { navigate } from '../../Utils/NavigationService';
import { ScreenConstants } from '../../Theme/ScreenConstants';
import { Colors } from '../../Theme/Colors';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const MAX_VISIBLE = 4;

type Props = {
  route?: {
    params?: {
      treeData?: {
        name?: string;
        tree_type?: string;
        tree_name?: string;
        scientific_name?: string;
        age_range?: string;
        size_range?: string;
        image_url?: string;
        id?: string;
      };
      parcelId: string,
      otherDetails?: any
    };
  };
};

const About = ({ route }: Props) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [showAlertModal, setShowAlertModal] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [treeData, setTreeData] = React.useState<any>(null);

  const passedTreeData = route?.params?.treeData;
  const { parcelId, otherDetails } = route?.params || {}

  console.log("passedTreeData in About:", passedTreeData);


  const treeName = treeData?.tree_name || passedTreeData?.name || 'N/A';
  const scientificName = treeData?.scientific_name ?? passedTreeData?.scientific_name ?? "N/A"
  const behaviour = treeData?.behaviour || {};
  const maintenanceTips = treeData?.maintenance_tips
    ? [
      treeData.maintenance_tips.fertilizer,
      treeData.maintenance_tips.pruning,
      treeData.maintenance_tips.pest_control,
      treeData.maintenance_tips.mulching,
      treeData.maintenance_tips.seasonal_care,
    ].filter(Boolean)
    : [];


  React.useEffect(() => {
    const fetchTreeDetails = async () => {
      setLoading(true);

      const postData = {
        soil_type: otherDetails?.soil_type,
        location_name: otherDetails?.location_name,
        tree_name: passedTreeData?.name || "",
      };

      console.log("Sending POST data:", postData);

      const response = await postRequest(ApiConstants.TREE_DETAIL, postData);

      console.log("Tree Details API Response:", response.data);
      // console.log("🌳 API Images:", response.data?.data?.images);

      if (response?.status === 200 || response?.status === 201) {
        setTreeData(response.data?.data || response.data);
      } else {
        setAlertTitle(response?.message || "Failed to load tree details");
        setShowAlertModal(true);
      }

      setLoading(false);
    };

    fetchTreeDetails();
  }, [passedTreeData]);

  const getApiImages = () => {
    if (!treeData?.images) return [];

    const imageArray = Object.values(treeData.images).map((img: any) => img.url);
    console.log("Image URLs:", imageArray);

    return imageArray;
  };

  const getImagesBySelectedCategory = () => {
    if (!treeData?.images) return getApiImages();

    const categoryMap: { [key: number]: string } = {
      1: 'leaf',
      2: 'bark',
      3: 'fruit',
      4: 'tree'
    };

    const selectedCategory = categoryMap[selectedImage];
    console.log("🎯 Selected Category:", selectedCategory);

    if (selectedCategory && treeData.images[selectedCategory]) {
      const categoryImage = treeData.images[selectedCategory];
      console.log("Category Image:", categoryImage);
      return [categoryImage.url];
    }

    return getApiImages();
  };


  const getTreeImage = () => {
    if (treeData?.tree_image_url) {
      return { uri: treeData.tree_image_url };
    }
    if (passedTreeData?.image_url) {
      return { uri: passedTreeData.image_url };
    }
    return Images.img_tree1;
  };

  const detailsData = [
    {
      id: "1",
      icon: Images.ic_flower,
      title: StringConstants.FLOWER,
      value: behaviour.flowering_months || 'N/A',
    },
    {
      id: "2",
      icon: Images.ic_fruit_bowl,
      title: StringConstants.FRUIT,
      value: behaviour.fruiting_months || 'N/A',
    },
    {
      id: "3",
      icon: Images.ic_diseases,
      title: StringConstants.DISEASES,
      value: behaviour.disease_season || 'N/A',
    },
    {
      id: "4",
      icon: Images.ic_minerals,
      title: StringConstants.FALL,
      value: behaviour.leaf_fall_months || 'N/A',
    },
    // {
    //   id: "5",
    //   icon: Images.ic_fruit_bowl,
    //   title: 'USDA ZONE',
    //   value: treeData?.usda_zone || 'N/A',
    // },
    // {
    //   id: "6",
    //   icon: Images.ic_diseases,
    //   title: 'GROWTH RATE',
    //   value: treeData?.growth_rate || 'N/A',
    // },
    // {
    //   id: "7",
    //   icon: Images.ic_minerals,
    //   title: 'SOIL PH',
    //   value: treeData?.soil_ph || 'N/A',
    // },
  ];

  const tapOnAssignToParcel = async() => {
    setLoading(true);

    const body = {
          tree_name: treeName,
          scientific_name: scientificName,
          notes: `Assign ${treeName} to Parcel Id ${parcelId}.`
      }

    console.log("body of tapOnAssignToParcel:", body);

    const response = await postRequest(`${ApiConstants.ASSIGN_TREE_TO_PARCEL}${parcelId}/assign-tree/`, body);
    console.log("tapOnAssignToParcel Response:", response.data);
    console.log("tapOnAssignToParcel Response:", response.status);

    if (response?.status === 200 || response?.status === 201) {
      navigate(ScreenConstants.ASSIGN_TO_PARCEL, {
          parcelId: parcelId,
          treeId: passedTreeData?.id,
          treeName,
        })
     
    } else {
      setAlertTitle(response?.message || "Failed to load tree details");
      setShowAlertModal(true);
    }

    setLoading(false);
  }


  const renderItem = ({ item }: any) => (
    <View style={styles.details}>
      <Image source={item.icon} style={{ alignSelf: "center", marginBottom: 4 }} />
      <Text style={styles.mainHead}>{item.title}</Text>
      <Text style={styles.value2} numberOfLines={1} ellipsizeMode="tail">
        {item.value}
      </Text>
    </View>
  );


  const displayImages = getImagesBySelectedCategory();
  const hasApiImages = displayImages.length > 0;
  const imagesToShow = hasApiImages ? displayImages : [];
  const remainingCount = hasApiImages && displayImages.length > MAX_VISIBLE ?
    displayImages.length - MAX_VISIBLE : 0;

  const treeImageSource = getTreeImage();

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
          setAlertTitle('');
          setShowAlertModal(false);
        }}
      />

      <Header
        title={StringConstants.ABOUT}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.treeView}>
          <View style={styles.topView}>
            <Text style={styles.treeName} numberOfLines={1}>
              {treeName}
            </Text>
            {/* <View style={styles.rightIcons}>
              <TouchableOpacity onPress={handleRefresh}>
                <Image source={Images.ic_refresh} style={{ marginHorizontal: 5, tintColor: Colors.GREEN }} />
              </TouchableOpacity>
              <Image source={Images.ic_share} style={{ marginHorizontal: 5 }} />
              <Image source={Images.ic_download_circle} />
            </View> */}
          </View>

          <View style={styles.treeDetailsView}>
            <View style={styles.leftDetailsView}>
              <Text style={styles.name}>
                {scientificName}
              </Text>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.title}>AGE</Text>
                <Text style={[styles.value, { marginBottom: 10 }]} numberOfLines={3} ellipsizeMode='tail'>
                  {treeData?.age_lifespan ?? passedTreeData?.age_range ?? "N/A"}
                </Text>
                <Text style={styles.title}>SIZE</Text>
                <Text style={styles.value} numberOfLines={2} ellipsizeMode='tail'>
                  {treeData?.average_height_feet ?? passedTreeData?.size_range ?? "N/A"}
                </Text>
              </View>
            </View>
            <View style={styles.treeImageView}>
              <Image
                source={treeImageSource}
                style={styles.treeImage}
                defaultSource={Images.img_tree1}
              />
              {/* <Image source={Images.ic_i_icon} style={styles.iIcon} /> */}
            </View>
          </View>
        </View>

        <Text style={styles.aboutText}>{StringConstants.ABOUT}</Text>
        <Text style={styles.aboutDescription}>
          {treeData?.about || 'No description available.'}
        </Text>

        <Text style={styles.aboutText}>{StringConstants.TREE_APPROPRIATE_LANGUAGE}</Text>
        <View style={styles.appropriateView}>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_sun} style={{ marginBottom: 10 }} />
            <Text style={styles.treeTitle}>Light</Text>
            <Text style={styles.treeTitle2}>
              {treeData?.language?.light || 'N/A'}
            </Text>
          </View>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_moist} style={{ marginBottom: 10 }} />
            <Text style={styles.treeTitle}>Soil Needs</Text>
            <Text style={styles.treeTitle2}>
              {treeData?.language?.soil_needs || 'N/A'}
            </Text>
          </View>
          <View style={styles.appropriateItem}>
            <Image source={Images.ic_drop} style={{ marginBottom: 10 }} />
            <Text style={styles.treeTitle}>Water</Text>
            <Text style={styles.treeTitle2}>
              {treeData?.language?.water || 'N/A'}
            </Text>
          </View>
        </View>

        <Text style={styles.aboutText}>{StringConstants.PHOTOS}</Text>
        <View style={styles.photosView}>
          <View>
            <TouchableOpacity
              style={[styles.photosImage, { backgroundColor: selectedImage === 1 ? Colors.FOREST_GREEN : Colors.GREY13 }]}
              onPress={() => setSelectedImage(1)}
            >
              <Image
                source={Images.ic_one_leaf}
                style={{ tintColor: selectedImage === 1 ? Colors.WHITE : Colors.DARK_GREYISH_BLUE }}
              />
            </TouchableOpacity>
            <Text style={styles.belowText}>{StringConstants.LEAF}</Text>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.photosImage, { backgroundColor: selectedImage === 2 ? Colors.FOREST_GREEN : Colors.GREY13 }]}
              onPress={() => setSelectedImage(2)}
            >
              <Image
                source={Images.ic_bark}
                style={{ tintColor: selectedImage === 2 ? Colors.WHITE : Colors.DARK_GREYISH_BLUE }}
              />
            </TouchableOpacity>
            <Text style={styles.belowText}>{StringConstants.BARK}</Text>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.photosImage, { backgroundColor: selectedImage === 3 ? Colors.FOREST_GREEN : Colors.GREY13 }]}
              onPress={() => setSelectedImage(3)}
            >
              <Image
                source={Images.ic_fruit}
                style={{ tintColor: selectedImage === 3 ? Colors.WHITE : Colors.DARK_GREYISH_BLUE }}
              />
            </TouchableOpacity>
            <Text style={styles.belowText}>{StringConstants.FRUIT}</Text>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.photosImage, { backgroundColor: selectedImage === 4 ? Colors.FOREST_GREEN : Colors.GREY13 }]}
              onPress={() => setSelectedImage(4)}
            >
              <Image
                source={Images.ic_tree}
                style={{ tintColor: selectedImage === 4 ? Colors.WHITE : Colors.DARK_GREYISH_BLUE }}
              />
            </TouchableOpacity>
            <Text style={styles.belowText}>{StringConstants.TREE}</Text>
          </View>
        </View>

        <View style={styles.allPhotosWrapper}>
          {imagesToShow.slice(0, MAX_VISIBLE).map((image, index) => (
            <Image
              key={index}
              source={typeof image === 'string' ? { uri: image } : image}
              style={styles.photos}
              defaultSource={Images.img_dummy_leaf1}
            />
          ))}

          {remainingCount > 0 && (
            <View style={styles.morePhotosView}>
              <Text style={styles.moreItems}>+{remainingCount}</Text>
            </View>
          )}
        </View>

        <Text style={styles.aboutText}>{StringConstants.BEHAVIOUR}</Text>
        <FlatList
          data={detailsData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.allDetails}
          ItemSeparatorComponent={() => <View style={{ width: 7 }} />}
        />

        <View style={styles.limitationsBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={Images.ic_tips} />
            <Text style={styles.limitationsText}>{StringConstants.MAINTENANCE_TIPS}</Text>
          </View>
          {maintenanceTips.length === 0 ? (
            <Text style={styles.moderateErosion}>No maintenance tips available</Text>
          ) : (
            maintenanceTips.map((tip, index) => (
              <Text key={index} style={styles.moderateErosion}>
                • {tip}
              </Text>
            ))
          )}
        </View>

        <TouchableOpacity
          style={styles.bottomButtons}
          onPress={tapOnAssignToParcel}
        // onPress={() => navigate(ScreenConstants.ASSIGN_TO_PARCEL, {
        //   parcelId: parcelId,
        //   treeId: passedTreeData?.id,
        //   treeName,
        // })}
        >
          <Text style={styles.buttonText}>Assign To Parcel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default About;