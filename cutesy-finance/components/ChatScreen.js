import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import DrawerMenu from './DrawerMenu';
import { getChatMessages } from '../services/ChatService';

export default function ChatScreen({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const drawerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadMessages(1);
  }, []);

  const loadMessages = async (p) => {
    if (loading || !more) return;
    setLoading(true);
    try {
      const data = await getChatMessages(p);
      const newMsgs = data && data.messages ? data.messages : [];
      setMessages((prev) => (p === 1 ? newMsgs : [...prev, ...newMsgs]));
      setMore(data ? data.moreMessagesAvailable : false);
      setPage(p);
    } catch (e) {
      console.warn('Failed loading chat', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: menuVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuVisible, drawerAnim]);

  const animatedStyles = {
    transform: [
      {
        translateX: drawerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 180],
        }),
      },
      {
        scale: drawerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.85],
        }),
      },
    ],
  };

  const renderMessage = ({ item, index }) => {
    const previous = messages[index - 1];
    const showDate = !previous || Math.abs(new Date(item.sentTime) - new Date(previous.sentTime)) > 30 * 60 * 1000;
    const [showTime, setShowTime] = useState(false);
    const messageText = item.hasEmbeddedUrl ? parseEmbeddedUrl(item.message) : item.message;

    return (
      <View>
        {showDate && <Text style={styles.date}>{new Date(item.sentTime).toLocaleString()}</Text>}
        <TouchableOpacity
          onPress={() => setShowTime(!showTime)}
          style={[styles.message, item.brokerSource ? styles.theirMessage : styles.myMessage]}
        >
          {item.image && (
            <Image source={{ uri: `data:image/png;base64,${item.image}` }} style={styles.image} />
          )}
          {item.isVideo && item.videoUrl && (
            <TouchableOpacity onPress={() => setVideoUrl(item.videoUrl)} style={styles.videoContainer}>
              {item.image ? (
                <Image source={{ uri: `data:image/png;base64,${item.image}` }} style={styles.videoImg} />
              ) : (
                <View style={[styles.videoImg, styles.videoPlaceholder]} />
              )}
              <Ionicons name="play-circle" size={48} color="#fff" style={styles.playIcon} />
            </TouchableOpacity>
          )}
          {item.isAudio && item.audioUrl && (
            <TouchableOpacity onPress={() => setAudioUrl(item.audioUrl)} style={styles.videoContainer}>
              <Ionicons name="musical-notes" size={48} color="#fff" style={styles.playIcon} />
            </TouchableOpacity>
          )}
          {typeof messageText === 'string' ? (
            <Text style={styles.text}>{messageText}</Text>
          ) : (
            <Text style={styles.text}>{messageText.prefix}<Text style={styles.link} onPress={() => openUrl(messageText.url)}>{messageText.url}</Text>{messageText.suffix}</Text>
          )}
          {showTime && <Text style={styles.time}>{new Date(item.sentTime).toLocaleTimeString()}</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  const openUrl = async (url) => {
    const WebBrowser = await import('expo-web-browser');
    WebBrowser.openBrowserAsync(url);
  };

  const parseEmbeddedUrl = (msg) => {
    const start = msg.indexOf('<--');
    const end = msg.indexOf('-->');
    if (start !== -1 && end !== -1 && end > start) {
      return {
        prefix: msg.substring(0, start),
        url: msg.substring(start + 3, end).trim(),
        suffix: msg.substring(end + 3),
      };
    }
    return msg;
  };

  const handleEndReached = () => {
    if (!loading && more) {
      loadMessages(page + 1);
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burger}>
        <Ionicons name="menu" size={32} color="#cebffa" />
      </TouchableOpacity>
      <Text style={styles.header}>Chats</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.scroll}
        onEndReachedThreshold={0.2}
        onEndReached={handleEndReached}
      />
      <DrawerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} onLogout={onLogout} />
      <Modal visible={!!videoUrl} transparent onRequestClose={() => setVideoUrl(null)}>
        <View style={styles.modalBg}>
          <TouchableOpacity style={styles.close} onPress={() => setVideoUrl(null)}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          {videoUrl && <Video source={{ uri: videoUrl }} style={styles.media} useNativeControls resizeMode="contain" />}
        </View>
      </Modal>
      <Modal visible={!!audioUrl} transparent onRequestClose={() => setAudioUrl(null)}>
        <View style={styles.modalBg}>
          <TouchableOpacity style={styles.close} onPress={() => setAudioUrl(null)}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          {audioUrl && (
            <Video
              source={{ uri: audioUrl }}
              useNativeControls
              resizeMode="contain"
              style={styles.media}
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) setAudioUrl(null);
              }}
            />
          )}
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  burger: {
    position: 'absolute',
    left: 10,
    top: 50,
    padding: 6,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    color: '#cebffa',
    marginBottom: 30,
    marginLeft: 60,
    marginTop: 5,
  },
  scroll: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  message: {
    maxWidth: '75%',
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEC8D8',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#cebffa',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 8,
  },
  videoContainer: {
    width: 160,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 5,
  },
  videoImg: {
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  videoPlaceholder: {
    backgroundColor: '#ccc',
  },
  time: {
    fontSize: 10,
    color: '#555',
    alignSelf: 'flex-end',
  },
  date: {
    alignSelf: 'center',
    fontSize: 12,
    marginVertical: 10,
    color: '#888',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  media: {
    width: '90%',
    height: '70%',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});
