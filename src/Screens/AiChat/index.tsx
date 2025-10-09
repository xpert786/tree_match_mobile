import React, { useState } from 'react';
import { 
  View, StatusBar, Text, Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, FlatList, ScrollView 
} from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import { BlurView } from "@react-native-community/blur";
import SearchInput from '../../Components/SearchInput';
import OwnerModal from '../../Modal/OwnerModal';

const { width } = Dimensions.get('window');

const AiChat = () => {
  const [search, setSearch] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);

  

  // Sample messages
  const messages = [
    { id: '1', text: 'Why are the new leaves on my apple tree small and crinkled?', sender: 'me' },
    { id: '2', text: 'Likely Reasons: \n1. Aphid Infestation (especially green or woolly aphids) \n2 . Powdery Mildew \n3 . Nutrient Deficiency (especially calciumor boron)\n4 . Herbicide Drift or Chemical Exposure\n5. Environmental Stress (like late frost or drought)', sender: 'ai' },
    { id: '3', text: 'Purpose of communication', sender: 'me' },
    { id: '4', text: 'The purpose of communication is to convey information, ideas, or feelings between individuals or groups. Communication can be verbal or nonverbal, and can take many forms, such as speaking, wr...', sender: 'ai' },
  ];

  const suggestions = ['How do I care for a sugar maple?', 
            'My tree’s leaves are turning yellow—why??', 
            'My pine needles are turning reddish-brown. Is my tree dying?']


  const renderMessage = ({ item, index }: any) => {
  const isMe = item.sender === 'me';

  if (isMe) {
    // User message
    return (
        <View style={[styles.chatBubble, styles.myMessage]}>
          <Text style={styles.myMessageText}>{item.text}</Text>
        </View>
    );
  } else {
    // AI message with icon on left
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image source={Images.ic_chat_gpt} style={{ marginRight: 6, marginTop: 2 }} />
        <View style={[styles.chatBubble, styles.aiMessage]}>
          <Text style={styles.aiMessageText}>{item.text}</Text>
          { index == 1 && <View style={styles.likesDislikeIcons}>
            <Image source={Images.ic_like} />
            <Image source={Images.ic_dislike} style={{marginLeft: 25}} />
          </View>}
        </View>
      </View>
    );
  }
};


  return (
    <ImageBackground source={Images.dummy_image6} style={styles.container}> 
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {showOwnerModal &&
      <OwnerModal
        visible={showOwnerModal}
        onClose={() => setShowOwnerModal(false)}
      />
      }

      <Header 
        title={StringConstants.AI_CHAT} 
        showMessageIcon
        rightIcon={Images.ic_three_lines} 
        onPressMessage={()=> {
          setShowOwnerModal(true)
        }}
      /> 

      {!chatStarted ? (
        <View style={styles.scanResultWrapper}>
          {/* Blur background */}
           {/* <View style={StyleSheet.absoluteFillObject}>
            <BlurView
                style={{ flex: 1, borderRadius: 10 }} // 👈 stays inside wrapper only
                blurType="light"
                blurAmount={15}
                overlayColor="rgba(153, 195, 174, 0.3)"
            />
            </View> */}
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={15}
            overlayColor="rgba(153, 195, 174, 0.3)"  
          />
          <Image source={Images.ic_sun} style={styles.sunIcon} />
          <Text style={styles.examples}>Examples</Text>
          {suggestions.map((example, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.suggestionBox} 
              onPress={() => setChatStarted(true)}
            >
              <Text style={styles.suggestions}>{example}</Text>
              <Image source={Images.ic_arrow_right} style={styles.rightArrow} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Messages view
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingBottom: 110 }}
        />
      )}

      <View style={styles.textInputContainer}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder={StringConstants.SEND_A_MESSAGE}
          tapOnRightIcon={()=>{}}
          leftIcon={Images.ic_microphone}
          rightIcon={Images.ic_search}
        />
      </View> 
    </ImageBackground>
  );
};

export default AiChat;
