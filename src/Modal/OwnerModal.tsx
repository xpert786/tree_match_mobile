import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Animated, TouchableWithoutFeedback, PanResponder, FlatList, ActivityIndicator, Alert } from "react-native";
import { Images } from "../Assets";
import { Fonts } from "../Theme/Fonts";
import { Colors } from "../Theme/Colors";
import { getRequest, deleteRequest, postRequest } from "../Network/apiClient";
import { ApiConstants } from "../Theme/ApiConstants";
import Loader from '../Modal/Loader';
import AlertModal from '../Modal/AlertModal';

const { height, width } = Dimensions.get("window");

const CLOSE_THRESHOLD = Math.max(50, width * 0.12);

type Conversation = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  message_count: number;
  last_message: {
    content: string;
    role: string;
    timestamp: string;
  } | null;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectConversation: (conversationId: number) => void;
  onNewChat: () => void;
};

const OwnerModal: React.FC<Props> = ({ visible, onClose, onSelectConversation, onNewChat }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [creatingChat, setCreatingChat] = useState(false);

  const baseAnim = useRef(new Animated.Value(-width)).current;
  const dragAnim = useRef(new Animated.Value(0)).current;

  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      const response = await getRequest(ApiConstants.USER_PROFILE);

      console.log("Profile API Response:", JSON.stringify(response, null, 2));
      console.log("HTTP Status Code fetchUserProfile:", response?.status);

      if (response?.status === 200 || response?.status === 201) {
        const profileData = response.data?.data || response.data || response;
        console.log("Profile data:", profileData);

        setUserProfile(profileData);
      } else {
        setAlertTitle(response?.message || "Failed to load profile");
        setShowAlertModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      setLoading(true)

      const response = await getRequest(ApiConstants.CHAT_CONVERSATIONS);

      console.log("Conversations API Response:", response);

      if (response?.status === 200 || response?.status === 201) {
        setConversations(response.data?.results || []);
      } else {
        setAlertTitle(response?.message || "Failed to load conversations");
        setShowAlertModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🆕 NEW CHAT CREATION FUNCTION - WITHOUT CATCH
  const createNewChat = async () => {
    try {
      setCreatingChat(true);

      console.log('🚀 Creating new chat conversation...');

      const requestBody = {
        title: "Soil Analysis Discussion",
      };

      console.log('📦 Request Body:', requestBody);

      const response = await postRequest(ApiConstants.CHAT_CONVERSATIONS, requestBody);

      console.log('📨 New Chat API Response:', response);
      console.log('Response Status:', response?.status);
      console.log('Response Data:', response?.data);

      if (response?.status === 200 || response?.status === 201) {
        const newConversation = response.data?.data || response.data;

        console.log('✅ New conversation created:', newConversation);

        setConversations(prev => [newConversation, ...prev]);

        setAlertTitle(response.data?.message || "New chat created successfully!");
        setShowAlertModal(true);

        onNewChat();

        if (newConversation?.id) {
          onSelectConversation(newConversation.id);
        }

      } else {
        console.log('❌ Failed to create new chat');
        setAlertTitle(response?.data?.message || response?.message || "Failed to create new chat");
        setShowAlertModal(true);

        onNewChat();
      }

    } finally {
      setCreatingChat(false);
      closeWithAnimation();
    }
  };

  const deleteConversation = async (conversationId: number, conversationTitle: string) => {
    Alert.alert(
      "Delete Conversation",
      `Are you sure you want to delete "${conversationTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(conversationId);

              const response = await deleteRequest(`${ApiConstants.CHAT_CONVERSATIONS}${conversationId}/`);

              console.log("Delete conversation response:", response);

              if (response?.status === 200 || response?.status === 204) {
                setConversations(prev => prev.filter(conv => conv.id !== conversationId));

                if (selectedIndex !== null && conversations[selectedIndex]?.id === conversationId) {
                  setSelectedIndex(null);
                }

                setAlertTitle(response?.data?.message || "Conversation deleted successfully");
                setShowAlertModal(true);
              } else {
                setAlertTitle(response?.message || "Failed to delete conversation");
                setShowAlertModal(true);
              }
            } finally {
              setDeleting(null);
            }
          }
        }
      ]
    );
  };

  const clearAllConversationsBulk = async () => {
    Alert.alert(
      "Clear All Conversations",
      "Are you sure you want to delete all conversation history? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              let successCount = 0;
              let errorCount = 0;

              for (const conversation of conversations) {
                try {
                  const response = await deleteRequest(`${ApiConstants.CHAT_CONVERSATIONS}${conversation.id}/`);
                  if (response?.status === 200 || response?.status === 204) {
                    successCount++;
                  } else {
                    errorCount++;
                  }
                } finally {
                }
              }

              if (errorCount === 0) {
                setConversations([]);
                setAlertTitle(`All ${successCount} conversations deleted successfully`);
                setShowAlertModal(true);
              } else if (successCount > 0) {
                fetchConversations();
                setAlertTitle(`${successCount} conversations deleted, ${errorCount} failed to delete`);
                setShowAlertModal(true);
              } else {
                setAlertTitle("Failed to delete conversations");
                setShowAlertModal(true);
              }
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const getProfileField = (field: string) => {
    if (!userProfile) return "Loading...";

    const profile = userProfile as any;

    return profile[field] ||
      (profile.data && profile.data[field]) ||
      "Not available";
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (visible) {
      fetchConversations();
    }
  }, [visible]);

  useEffect(() => {
    Animated.timing(baseAnim, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) dragAnim.setValue(0);
    });
  }, [visible, baseAnim, dragAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 6 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderMove: (_, gs) => {
        const dx = Math.min(0, gs.dx);
        dragAnim.setValue(dx);
      },
      onPanResponderRelease: (_, gs) => {
        const dx = gs.dx;
        const vx = gs.vx;

        if (dx < -CLOSE_THRESHOLD || vx < -0.5) {
          Animated.timing(baseAnim, {
            toValue: -width,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            dragAnim.setValue(0);
            onClose();
          });
        } else {
          Animated.spring(dragAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(dragAnim, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  const translateX = Animated.add(baseAnim, dragAnim);

  const closeWithAnimation = () => {
    Animated.timing(baseAnim, {
      toValue: -width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      dragAnim.setValue(0);
      onClose();
    });
  };

  const handleNewChat = () => {
    console.log('🎯 New Chat button pressed');
    createNewChat();
  };

  const handleSelectConversation = (conversation: Conversation, index: number) => {
    setSelectedIndex(index);
    onSelectConversation(conversation.id);
    closeWithAnimation();
  };

  const renderConversationItem = ({ item, index }: { item: Conversation; index: number }) => {
    const isSelected = selectedIndex === index;
    const isDeleting = deleting === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.historyList,
          {
            backgroundColor: isSelected ? Colors.YELLOWISH_GREEN : Colors.WHITE,
            opacity: isDeleting ? 0.6 : 1
          },
        ]}
        onPress={() => handleSelectConversation(item, index)}
        onLongPress={() => deleteConversation(item.id, item.title)}
        disabled={isDeleting}
      >
        {isDeleting && (
          <View style={styles.deletingOverlay}>
            <ActivityIndicator size="small" color={Colors.GREEN} />
          </View>
        )}

        {item.last_message && (
          <Text style={styles.lastMessage} numberOfLines={2}>
            {truncateText(item.last_message.content, 60)}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="none" transparent>
      <TouchableWithoutFeedback onPress={closeWithAnimation}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.modalContent, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <Loader visible={loading && !userProfile} />

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

        <View style={styles.row}>
          <Image source={Images.ic_profile} style={styles.profileImage} />
          <View style={styles.textColumn}>
            <Text style={styles.ownerName}>
              {getProfileField('full_name')}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.chatButton,
            creatingChat && { opacity: 0.7 }
          ]}
          onPress={handleNewChat}
          disabled={creatingChat}
        >
          {creatingChat ? (
            <ActivityIndicator size="small" color={Colors.BLACK} />
          ) : (
            <Image source={Images.ic_plus} />
          )}
          <Text style={styles.newChat}>
            {creatingChat ? 'Creating...' : 'New Chat'}
          </Text>
        </TouchableOpacity>

        <Image source={Images.ic_line} style={{ alignSelf: 'center', marginVertical: 40 }} />

        <TouchableOpacity
          style={styles.deleteView}
          onPress={clearAllConversationsBulk}
          disabled={loading || conversations.length === 0}
        >
          <Image source={Images.ic_delete} style={styles.deleteIcon} />
          <Text style={[
            styles.clearHistoryText,
            { opacity: (loading || conversations.length === 0) ? 0.5 : 1 }
          ]}>
            Clear conversations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.deleteView, { marginBottom: 10 }]}>
          <Image source={Images.ic_history} />
          <Text style={styles.clearHistoryText}>History</Text>
        </TouchableOpacity>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.GREEN} />
            <Text style={styles.loadingText}>Loading conversations...</Text>
          </View>
        ) : conversations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No conversations yet</Text>
            <Text style={styles.emptySubText}>Start a new chat to begin</Text>
          </View>
        ) : (
          <FlatList
            data={conversations}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={renderConversationItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Animated.View>
    </Modal>
  );
};

export default OwnerModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    position: "absolute",
    left: 0,
    top: 0,
    height: height,
    width: width * 0.65,
    backgroundColor: "white",
    padding: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    resizeMode: "cover",
  },
  textColumn: {
    flexDirection: "column",
  },
  ownerLabel: {
    fontSize: 11,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
  },
  ownerName: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
  },
  ownerEmail: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY,
    marginTop: 2,
  },
  chatButton: {
    borderColor: Colors.WHITE2,
    borderWidth: 1.17,
    borderRadius: 10,
    height: 47,
    width: width * 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  newChat: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginLeft: 10,
  },
  mainText: {
    fontSize: 11,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    textTransform: 'uppercase',
    marginLeft: 10,
    marginBottom: 10
  },
  deleteView: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginLeft: 10,
  },
  clearHistoryText: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    marginLeft: 15
  },
  deleteIcon: {
    height: 24,
    width: 24,
    tintColor: Colors.FOREST_GREEN
  },
  historyList: {
    width: width * 0.5,
    padding: 12,
    borderRadius: 10,
    borderColor: Colors.LIGHT_GREY,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationTitle: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.DEEP_GREEN,
    flex: 1,
    marginRight: 8,
  },
  messageCount: {
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY,
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  lastMessage: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.DARK_GREY,
    marginBottom: 4,
    lineHeight: 16,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY,
    textAlign: 'right',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.GREY,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    opacity: 0.5,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.GREY,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.LIGHT_GREY,
    textAlign: 'center',
  },
  deletingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});