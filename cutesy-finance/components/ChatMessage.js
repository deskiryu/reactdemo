import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const soundwaveImg = require('../assets/soundwave.png');

export default function ChatMessage({ item, previous, styles, setVideoUrl, setAudioUrl, setImageUri, openPdf, openUrl }) {

  const showDate =
    !previous ||
    new Date(item.sentTime).toDateString() !==
      new Date(previous.sentTime).toDateString();

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

  const docType = parseInt(item.chatDocument?.supportingDocumentType, 10);
  const docGuid = item.chatDocument?.guidId;

  let attachment = null;
  if ((docGuid || (item.chatDocumentId && item.chatDocumentId > 0)) && !isNaN(docType)) {
    if (docType === 1) {
      attachment = (
        <TouchableOpacity onPress={() => openPdf(docGuid || item.chatDocumentId, item.chatDocument?.File)}>
          <Ionicons
            name="document-text"
            size={48}
            color="#555"
            style={styles.docIcon}
          />
        </TouchableOpacity>
      );
    } else if (docType === 2 || docType === 3) {
      const type = docType === 2 ? 'png' : 'jpeg';
      const fileData = (item.chatDocument?.File || item.chatDocument?.file || '')
        .replace(/\s/g, '');
      if (fileData) {
        const uri = `data:image/${type};base64,${fileData}`;
        attachment = (
          <TouchableOpacity onPress={() => setImageUri(uri)}>
            <Image source={{ uri }} style={styles.image} />
          </TouchableOpacity>
        );
      }
    }
  }

  const hasContent =
    (typeof messageText === 'string' && messageText) ||
    messageText ||
    attachment ||
    item.image ||
    (item.isVideo && item.videoUrl) ||
    (item.isAudio && item.audioUrl);

  if (!hasContent) {
    return null;
  }

  return (
    <View>
      {showDate && (
        <Text style={styles.date}>{new Date(item.sentTime).toLocaleDateString()}</Text>
      )}
      <Swipeable renderLeftActions={() => <View />} renderRightActions={() => <View /> }>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.message,
            item.brokerSource ? styles.theirMessage : styles.myMessage,
            !item.isVideo && !item.image && !item.isAudio && !attachment
              ? { width: undefined, maxWidth: '70%' }
              : null,
          ]}
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
            item.image && (
              <TouchableOpacity onPress={() => setImageUri(`data:image/png;base64,${item.image}`)}>
                <Image source={{ uri: `data:image/png;base64,${item.image}` }} style={styles.image} />
              </TouchableOpacity>
            )
          )}
          {item.isAudio && item.audioUrl && (
            <TouchableOpacity
              onPress={() => setAudioUrl(item.audioUrl)}
              style={styles.audioContainer}
            >
              <View style={styles.audioPlay}>
                <Ionicons name="play-circle" size={32} color="#fff" />
              </View>
              <View style={styles.audioWave}>
                <Image source={soundwaveImg} style={styles.audioWaveImage} />
              </View>
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
          {attachment}
          <Text
            style={[
              styles.time,
              item.brokerSource ? styles.timeLeft : styles.timeRight,
            ]}
          >
            {new Date(item.sentTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}
