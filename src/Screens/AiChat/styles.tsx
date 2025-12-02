import { Dimensions, StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";
import { Colors } from "../../Theme/Colors";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.LIGHTER_GREY
  },
  // scanResultWrapper: {
  //   width: width * 0.9,
  //   alignSelf: 'center',
  //   position: 'absolute',
  //   borderRadius: 10,
  //   paddingHorizontal: 15,
  //   paddingVertical: 50,
  //   overflow: 'hidden', // ✅ important: keeps blur inside
  //   borderColor: Colors.WHITISH_GREY,
  //   borderWidth: 0.5,
  //   bottom: 110,
  // },
  scanResultWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 50,
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // ✨ transparent light layer
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    bottom: 110,
  },
  sunIcon: {
    alignSelf: 'center',
    tintColor: Colors.WHITE,
    marginBottom: 14
  },
  examples: {
    fontSize: 19,
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
    alignSelf: 'center',
    marginBottom: 18
  },
  suggestionBox: {
    height: 75,
    width: width * 0.8,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 25
  },
  suggestions: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.DEEP_GREEN,
    textAlign: 'center'
  },
  rightArrow: {
    position: 'absolute',
    right: 20,
    bottom: 13,
    height: 14,
    width: 14
  },
  textInputContainer: {
    backgroundColor: Colors.WHITE,
    height: 90,
    width: width,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',  // 👈 this helps show the curve
  },
  chatBubble: {
    marginBottom: 12,
    padding: 14,
  },
  myMessage: {
    alignSelf: 'flex-end',
    width: width * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.WHITE2,
  },
  aiMessage: {
    alignSelf: 'flex-end',
    width: width * 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.WHITE
  },
  myMessageText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: '#1D2129',
    textAlign: 'right',
  },
  aiMessageText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    textAlign: 'left',
  },
  likesDislikeIcons: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 5
  },
  // Add these to your existing styles
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 8,
  },
  activeReaction: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green for active like
  },
  reactionIcon: {
    width: 16,
    height: 16,
    tintColor: '#666',
  },
  activeReactionIcon: {
    tintColor: '#4CAF50', // Green for active like
  },
  reactionCount: {
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
    fontWeight: '500',
  },


  activeLikeButton: {
    backgroundColor: '#007AFF', // Blue background for like
  },

  activeDislikeButton: {
    backgroundColor: '#007AFF', // Blue background for dislike
  },


  activeLikeIcon: {
    tintColor: '#FFFFFF', // White icon when liked
  },

  activeDislikeIcon: {
    tintColor: '#FFFFFF', // White icon when disliked
  },



  activeReactionCount: {
    color: '#FFFFFF', // White text when active
  },
  

})