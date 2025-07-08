import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from './DrawerMenu';

export default function ChatScreen({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const drawerAnim = useRef(new Animated.Value(0)).current;

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

  // Simple chat history with text, image, video thumbnail and audio entry
  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        style={styles.burger}
      >
        <Ionicons name="menu" size={32} color="#cebffa" />
      </TouchableOpacity>
      <Text style={styles.header}>Chats</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Incoming text */}
        <View style={[styles.message, styles.theirMessage]}>
          <Text style={styles.text}>Hi! How are you?</Text>
        </View>
        {/* Outgoing text */}
        <View style={[styles.message, styles.myMessage]}>
          <Text style={styles.text}>Doing great! Check out this photo.</Text>
        </View>
        {/* Outgoing image */}
        <View style={[styles.message, styles.myMessage]}>
          <Image source={require('../assets/fake-image.png')} style={styles.image} />
        </View>
        {/* Incoming text */}
        <View style={[styles.message, styles.theirMessage]}>
          <Text style={styles.text}>Nice! Here is a short video.</Text>
        </View>
        {/* Incoming video thumbnail */}
        <View style={[styles.message, styles.theirMessage]}>
          <View style={styles.videoContainer}>
            <Image source={require('../assets/fake-video.png')} style={styles.videoImg} />
            <Ionicons name="play-circle" size={48} color="#fff" style={styles.playIcon} />
          </View>
        </View>
        {/* Outgoing text introducing audio */}
        <View style={[styles.message, styles.myMessage]}>
          <Text style={styles.text}>Great! Listen to this voice memo.</Text>
        </View>
        {/* Outgoing audio placeholder */}
        <View style={[styles.message, styles.myMessage]}>
          <View style={styles.audioContainer}>
            <Ionicons name="play" size={24} color="#fff" />
            <View style={styles.waveform}>
              {[4,8,12,8,4].map((h,i) => (
                <View key={i} style={[styles.bar,{height:h*2}]} />
              ))}
            </View>
          </View>
        </View>
        {/* Repeat messages to enable scrolling */}
        {/* 2nd set */}
        <View style={[styles.message, styles.theirMessage]}>
          <Text style={styles.text}>Hi! How are you?</Text>
        </View>
        <View style={[styles.message, styles.myMessage]}>
          <Text style={styles.text}>Doing great! Check out this photo.</Text>
        </View>
        <View style={[styles.message, styles.myMessage]}>
          <Image source={require('../assets/fake-image.png')} style={styles.image} />
        </View>
        <View style={[styles.message, styles.theirMessage]}>
          <Text style={styles.text}>Nice! Here is a short video.</Text>
        </View>
        <View style={[styles.message, styles.theirMessage]}>
          <View style={styles.videoContainer}>
            <Image source={require('../assets/fake-video.png')} style={styles.videoImg} />
            <Ionicons name="play-circle" size={48} color="#fff" style={styles.playIcon} />
          </View>
        </View>
        <View style={[styles.message, styles.myMessage]}>
          <Text style={styles.text}>Great! Listen to this voice memo.</Text>
        </View>
        <View style={[styles.message, styles.myMessage]}>
          <View style={styles.audioContainer}>
            <Ionicons name="play" size={24} color="#fff" />
            <View style={styles.waveform}>
              {[4,8,12,8,4].map((h,i) => (
                <View key={i} style={[styles.bar,{height:h*2}]} />
              ))}
            </View>
          </View>
        </View>
        {/* 3rd set */}
        <View style={[styles.message, styles.theirMessage]}>
          <Text style={styles.text}>Hi! How are you?</Text>
        </View>
        <View style={[styles.message, styles.myMessage]}>
          <Text style={styles.text}>Doing great! Check out this photo.</Text>
        </View>
        <View style={[styles.message, styles.myMessage]}>
          <Image source={require('../assets/fake-image.png')} style={styles.image} />
        </View>
        <View style={[styles.message, styles.theirMessage]}>
          <Text style={styles.text}>Nice! Here is a short video.</Text>
        </View>
        <View style={[styles.message, styles.theirMessage]}>
          <View style={styles.videoContainer}>
            <Image source={require('../assets/fake-video.png')} style={styles.videoImg} />
            <Ionicons name="play-circle" size={48} color="#fff" style={styles.playIcon} />
          </View>
        </View>
        <View style={[styles.message, styles.myMessage]}>
          <Text style={styles.text}>Great! Listen to this voice memo.</Text>
        </View>
        <View style={[styles.message, styles.myMessage]}>
          <View style={styles.audioContainer}>
            <Ionicons name="play" size={24} color="#fff" />
            <View style={styles.waveform}>
              {[4,8,12,8,4].map((h,i) => (
                <View key={i} style={[styles.bar,{height:h*2}]} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <DrawerMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onLogout={onLogout}
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
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveform: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  bar: {
    width: 4,
    backgroundColor: '#fff',
    marginHorizontal: 1,
  },
});
