import React from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { Colors } from '../../Theme/Colors';
import { useOfflineDownloads } from '../../Context/OfflineDownloadsContext';
import { Toast } from 'toastify-react-native';
import { Fonts } from '../../Theme/Fonts';

const Downloads = ({ navigation }: any) => {
  const { downloads, removeDownload } = useOfflineDownloads();

  const handleDelete = async (id: number) => {
    await removeDownload(id);
    Toast.success('Parcel removed from downloads');
  };


  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Header title={StringConstants.DOWNLOADS} />

      <FlatList
        data={downloads}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContent}>
            <Text
              style={{
                color: Colors.BORDER_GREY,
                fontSize: 16,
                textAlign: 'center',
                fontFamily: Fonts.MEDIUM
              }}
            >
              No offline downloads available
            </Text>
          </View>
        )}

        renderItem={({ item, index }) => (
          <Pressable style={[styles.soilContainer]}>
            {/* left view */}
            <Image source={{ uri: item?.soil_image_url }} style={styles.placesImage} />

            {/* right view (constrained) */}
            <View style={styles.rightContent}>
              <Text
                style={styles.placeName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.parcel_name}
              </Text>

              <View style={styles.soilView}>
                <Text style={styles.soilName}>{item.soil_type}</Text>
              </View>

              <View style={styles.statsRow}>
                <View style={[styles.boxView, { marginRight: 10 }]}>
                  <Image source={Images.ic_moisture} style={styles.icons} />
                  <Text style={styles.boxText}>{`${item?.moisture_percentage}%` || 'N/A'}</Text>
                </View>
                <View style={styles.boxView}>
                  <Image source={Images.ic_acidity} style={styles.icons} />
                  <Text style={styles.boxText}>{item?.acidity_ph || 'N/A'}</Text>
                </View>
              </View>


              {/* Delete Icon (top-right corner) */}
              <TouchableOpacity
                style={styles.deleteIconContainer}
                onPress={() => handleDelete(item.id)}
              >
                <Image
                  source={Images.ic_delete}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />


    </View>
  );
};
export default Downloads;



