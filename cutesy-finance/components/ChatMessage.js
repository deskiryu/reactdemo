import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';


const WaveformIcon = ({ styles }) => (
  <View style={styles.waveformIcon}>
    {[4, 7, 5, 6, 4].map((h, i) => (
      <View key={i} style={[styles.waveBar, { height: h * 2 }]} />
    ))}
  </View>
);

export default function ChatMessage({ item, previous, styles, setVideoUrl, setAudioUrl, openUrl }) {
  const [showTime, setShowTime] = useState(false);

  const showDate = !previous || Math.abs(new Date(item.sentTime) - new Date(previous.sentTime)) > 30 * 60 * 1000;

  const parseEmbeddedUrl = (msg) => {
    if (!msg) return msg;
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

  const messageText =
    item.hasEmbeddedUrl && item.message
      ? parseEmbeddedUrl(item.message)
      : item.message;

  const docType = parseInt(item.supportingDocumentType, 10);

  let docLabel = null;
  if (item.chatDocumentId && item.chatDocumentId > 0 && !isNaN(docType)) {
    if (docType === 1) docLabel = 'PDFPDFPDF';
    else if (docType === 2) docLabel = 'pngpngpng';
    else if (docType === 3) docLabel = 'JPGJPGJPG';
  }

  return (
    <View>
      {showDate && <Text style={styles.date}>{new Date(item.sentTime).toLocaleString()}</Text>}
      <Swipeable
        renderLeftActions={() => <View />}
        renderRightActions={() => <View />}
        onSwipeableOpen={() => setShowTime(true)}
        onSwipeableClose={() => setShowTime(false)}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.message, item.brokerSource ? styles.theirMessage : styles.myMessage]}
        >
          {item.isVideo && item.videoUrl ? (
            <TouchableOpacity onPress={() => setVideoUrl(item.videoUrl)} style={styles.videoContainer}>
              {item.image ? (
                <Image source={{ uri: `data:image/png;base64,${item.image}` }} style={styles.videoImg} />
              ) : (
                <View style={[styles.videoImg, styles.videoPlaceholder]} />
              )}
              <Ionicons name="play-circle" size={48} color="#fff" style={styles.playIcon} />
            </TouchableOpacity>
          ) : (
            item.image && <Image source={{ uri: `data:image/png;base64,${item.image}` }} style={styles.image} />
          )}
          {item.isAudio && item.audioUrl && (
            <TouchableOpacity onPress={() => setAudioUrl(item.audioUrl)} style={styles.videoContainer}>

              <WaveformIcon styles={styles} />
            </TouchableOpacity>
          )}
          {typeof messageText === 'string' && messageText ? (
            <Text style={styles.text}>{messageText}</Text>
          ) : messageText ? (
            <Text style={styles.text}>
              {messageText.prefix}
              <Text style={styles.link} onPress={() => openUrl(messageText.url)}>
                {messageText.url}
              </Text>
              {messageText.suffix}
            </Text>
          ) : null}
          {docLabel && <Text style={styles.text}>{docLabel}</Text>}
          {showTime && (
            <Text style={styles.time}>{new Date(item.sentTime).toLocaleTimeString()}</Text>
          )}
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}
