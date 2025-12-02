import React, { useState } from 'react';
import { View, StatusBar, Text, Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './styles';
import Header from '../../Components/Header';
import { StringConstants } from '../../Theme/StringConstants';
import { Images } from '../../Assets';
import SearchInput from '../../Components/SearchInput';
import OwnerModal from '../../Modal/OwnerModal';
import { postRequest } from '../../Network/apiClient';
import { ApiConstants } from '../../Theme/ApiConstants';
import Loader from '../../Modal/Loader';
import AlertModal from '../../Modal/AlertModal';

const { width } = Dimensions.get('window');

const AiChat = () => {
  const [search, setSearch] = useState<string>("");
  const [chatStarted, setChatStarted] = useState<boolean>(false);
  const [showOwnerModal, setShowOwnerModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>('');
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState<any>([]);
  const [reactingMessageId, setReactingMessageId] = useState(null);

  const suggestions = [
    'How do I care for a sugar maple?',
    'My tree\'s leaves are turning yellow—why??',
    'My pine needles are turning reddish-brown. Is my tree dying?'
  ];

  const handleSendMessage = async (text: any) => {
    if (!text.trim()) return;

    setLoading(true);
    setChatStarted(true);

    const postData = {
      conversation_id: conversationId,
      message: text,
    };

    const response = await postRequest(`${ApiConstants.SEND_MESSAGE}`, postData);
    setLoading(false);

    console.log("HTTP Status Code sendMessage:", response.status);
    console.log("Response in sendMessage:", response.data);

    if (response.status === 200 || response.status === 201) {
      const data = response.data.data;

      if (!conversationId) setConversationId(data.conversation_id);

      setMessages((prev) => [
        ...prev,
        {
          id: data.user_message.id.toString(),
          text: data.user_message.content,
          sender: 'me',
          message_id: data.user_message.id,
        },
        {
          id: data.ai_message.id.toString(),
          text: data.ai_message.content,
          sender: 'ai',
          message_id: data.ai_message.id,
          like_count: data.ai_message.like_count || 0,
          dislike_count: data.ai_message.dislike_count || 0,
          current_reaction: data.ai_message.current_reaction || null,
        },
      ]);

      setSearch('');
    } else {
      setShowAlertModal(true);
      setAlertTitle(response.message || "Failed to send message");
    }
  };

  const handleReactionToggle = async (messageId: any, reactionType: 'like' | 'dislike') => {
    const message = messages.find((msg: any) => msg.message_id === messageId);
    if (!message) return;

    const newReaction = message.current_reaction === reactionType ? null : reactionType;

    console.log(`🎯 Setting reaction: ${message.current_reaction} -> ${newReaction}`);

    // ✅ IMMEDIATELY UPDATE UI - Blue thumb instantly
    setMessages((prevMessages: any) =>
      prevMessages.map((msg: any) =>
        msg.message_id === messageId
          ? {
            ...msg,
            like_count: newReaction === 'like' ? (msg.like_count + 1) :
              (message.current_reaction === 'like' ? (msg.like_count - 1) : msg.like_count),
            dislike_count: newReaction === 'dislike' ? (msg.dislike_count + 1) :
              (message.current_reaction === 'dislike' ? (msg.dislike_count - 1) : msg.dislike_count),
            current_reaction: newReaction
          }
          : msg
      )
    );

    setReactingMessageId(messageId);

    // ✅ API call in background - no waiting
    const response = await postRequest(
      `${ApiConstants.BASE_URL}chat/messages/${messageId}/reaction/`,
      {
        reaction_type: newReaction
      }
    );

    setReactingMessageId(null);

    if (response.status === 200 || response.status === 201) {
      const { data } = response.data;
      console.log('✅ API success');
      
      // ✅ Final sync with server
      setMessages((prevMessages: any) =>
        prevMessages.map((msg: any) =>
          msg.message_id === messageId
            ? {
              ...msg,
              like_count: data.like_count,
              dislike_count: data.dislike_count,
              current_reaction: data.current_reaction
            }
            : msg
        )
      );
    } else {
      // ❌ API failed - but DON'T revert and DON'T show alert
      console.log('❌ API failed, but keeping UI changes');
    }
  };

  const handleSuggestionPress = (suggestion: any) => {
    setSearch(suggestion);
    handleSendMessage(suggestion);
  };

  const handleNewChat = () => {
    console.log('🆕 Starting new chat - clearing all data');

    setMessages([]);
    setConversationId(null);
    setChatStarted(false);
    setSearch('');

    console.log('✅ Chat cleared - messages:', messages.length, 'conversationId:', conversationId);
  };

  const handleSelectConversation = (selectedConversationId: any) => {
    console.log('🎯 Conversation selected:', selectedConversationId);

    setMessages([]);
    setConversationId(selectedConversationId);
    setChatStarted(false);
    setSearch('');
  };

  const renderMessage = ({ item, index }: any) => {
    const isMe = item.sender === 'me';

    if (isMe) {
      return (
        <View style={[styles.chatBubble, styles.myMessage]}>
          <Text style={styles.myMessageText}>{item.text}</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Image source={Images.ic_chat_gpt} style={{ marginRight: 6, marginTop: 2 }} />
          <View style={[styles.chatBubble, styles.aiMessage]}>
            <Text style={styles.aiMessageText}>{item.text}</Text>

            <View style={styles.likesDislikeIcons}>
              <TouchableOpacity
                onPress={() => handleReactionToggle(item.message_id, 'like')}
                disabled={reactingMessageId === item.message_id}
                style={[
                  styles.reactionButton,
                  item.current_reaction === 'like' && styles.activeLikeButton,
                  reactingMessageId === item.message_id && { opacity: 0.7 }
                ]}
              >
                <Image
                  source={Images.ic_like}
                  style={[
                    styles.reactionIcon,
                    item.current_reaction === 'like' && styles.activeReactionIcon
                  ]}
                />
                <Text style={[
                  styles.reactionCount,
                  item.current_reaction === 'like' && styles.activeReactionCount
                ]}>
                  {item.like_count || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleReactionToggle(item.message_id, 'dislike')}
                disabled={reactingMessageId === item.message_id}
                style={[
                  styles.reactionButton,
                  { marginLeft: 15 },
                  item.current_reaction === 'dislike' && styles.activeDislikeButton,
                  reactingMessageId === item.message_id && { opacity: 0.7 }
                ]}
              >
                <Image
                  source={Images.ic_dislike}
                  style={[
                    styles.reactionIcon,
                    item.current_reaction === 'dislike' && styles.activeReactionIcon
                  ]}
                />
                <Text style={[
                  styles.reactionCount,
                  item.current_reaction === 'dislike' && styles.activeReactionCount
                ]}>
                  {item.dislike_count || 0}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <ImageBackground source={Images.dummy_image6} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <Loader visible={loading} />

      <AlertModal
        visible={showAlertModal}
        title={alertTitle}
        onOkPress={() => {
          setAlertTitle('');
          setShowAlertModal(false);
        }}
      />

      {/* ✅ Owner Modal with new handlers */}
      {showOwnerModal && (
        <OwnerModal
          visible={showOwnerModal}
          onClose={() => setShowOwnerModal(false)}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
        />
      )}

      <Header
        title={StringConstants.AI_CHAT}
        showMessageIcon
        rightIcon={Images.ic_three_lines}
        onPressMessage={() => setShowOwnerModal(true)}
      />

      {!chatStarted ? (
        <View style={styles.scanResultWrapper}>
          <Image source={Images.ic_sun} style={styles.sunIcon} />
          <Text style={styles.examples}>Examples</Text>
          {suggestions.map((example, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionBox}
              onPress={() => handleSuggestionPress(example)}
            >
              <Text style={styles.suggestions}>{example}</Text>
              <Image source={Images.ic_arrow_right} style={styles.rightArrow} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
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
          tapOnRightIcon={() => handleSendMessage(search)}
          leftIcon={Images.ic_microphone}
          rightIcon={Images.ic_search}
          onSubmitEditing={() => handleSendMessage(search)}
        />
      </View>
    </ImageBackground>
  );
};

export default AiChat;