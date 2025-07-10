import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Animated, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import DrawerMenu from './DrawerMenu';
import ChatMessage from './ChatMessage';
import { getChatMessages, getChatDocument, sendChatMessage } from '../services/ChatService';
import PdfViewerModal from './PdfViewer';

export default function ChatScreen({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [messageText, setMessageText] = useState('');
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

  const renderMessage = ({ item, index }) => (
    <ChatMessage
      item={item}
      previous={messages[index - 1]}
      styles={styles}
      setVideoUrl={setVideoUrl}
      setAudioUrl={setAudioUrl}
      setImageUri={setImageUri}
      openPdf={openPdf}
      openUrl={openUrl}
    />
  );

  const openUrl = async (url) => {
    const WebBrowser = await import('expo-web-browser');
    WebBrowser.openBrowserAsync(url);
  };

  // Open a PDF document in an in-app viewer. If base64 content isn't already
  // available, fetch it from the API using the document GUID.
  const openPdf = async (docGuid, base64) => {
    let data = base64;
    if (!data && docGuid) {
      try {
        const doc = await getChatDocument(docGuid);
        data = doc.File || doc.file;
      } catch (e) {
        console.warn('Failed to load document', e);
      }
    }

    if (!data) return;
    data = data.replace(/\s/g, '');
    setPdfData(data);
  };

  const handleSendMessage = async () => {
    const text = messageText.trim();
    if (!text) return;
    try {
      const tempMsg = {
        id: Date.now(),
        message: text,
        sentTime: new Date().toISOString(),
      };
      setMessages((prev) => [tempMsg, ...prev]);
      setMessageText('');
      await sendChatMessage(text);
    } catch (e) {
      console.warn('Failed to send message', e);
    }
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
        inverted
        initialNumToRender={15}
        onEndReachedThreshold={0.2}
        onEndReached={handleEndReached}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
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
              style={styles.audioPlayer}
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) setAudioUrl(null);
              }}
            />
          )}
        </View>
      </Modal>
      <Modal visible={!!imageUri} transparent onRequestClose={() => setImageUri(null)}>
        <View style={styles.modalBg}>
          <TouchableOpacity style={styles.close} onPress={() => setImageUri(null)}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.media} resizeMode="contain" />
          )}
        </View>
      </Modal>
      <PdfViewerModal
        visible={!!pdfData}
        base64={pdfData}
        onClose={() => setPdfData(null)}
      />
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
    flexGrow: 1,
    justifyContent: 'flex-end',
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
  audioContainer: {
    flexDirection: 'row',
    width: 200,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#cebffa',
    marginBottom: 5,
  },
  audioPlay: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioWave: {
    width: '80%',
    justifyContent: 'center',
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
  audioPlayer: {
    width: 250,
    height: 50,
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  waveformIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    height: 30,
  },
  waveBar: {
    width: 4,
    backgroundColor: '#fff',
    marginHorizontal: 2,
  },
  docIcon: {
    marginTop: 5,
    alignSelf: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: 'Poppins_400Regular',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#cebffa',
    padding: 10,
    borderRadius: 20,
  },
});
