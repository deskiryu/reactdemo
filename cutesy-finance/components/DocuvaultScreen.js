import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from './DrawerMenu';

export default function DocuvaultScreen({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('requested');
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

  const uploadsRequested = 3;
  const myUploads = 5;

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burger}>
        <Ionicons name="menu" size={32} color="#cebffa" />
      </TouchableOpacity>

      <View style={styles.summaryBox}>
        <View style={styles.summaryHeader}>
          <View>
            <Text style={styles.summaryTitle}>Summary of your Docuvault</Text>
            <Text style={styles.summarySubtitle}>Your current progress</Text>
          </View>
          <Ionicons name="clipboard" size={28} color="#fff" />
        </View>
        <View style={styles.summaryCounts}>
          <View style={styles.countBox}>
            <Text style={styles.countLabel}>Uploads Requested</Text>
            <Text style={styles.count}>{uploadsRequested}</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countLabel}>My Uploads</Text>
            <Text style={styles.count}>{myUploads}</Text>
          </View>
        </View>
      </View>

      <View style={styles.switchBox}>
        <TouchableOpacity
          style={[styles.switchHalf, activeTab === 'requested' && styles.activeHalf]}
          onPress={() => setActiveTab('requested')}
        >
          <Text
            style={[styles.switchText, activeTab === 'requested' && styles.activeText]}
          >
            Uploads Requested ({uploadsRequested})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchHalf, activeTab === 'uploads' && styles.activeHalf]}
          onPress={() => setActiveTab('uploads')}
        >
          <Text style={[styles.switchText, activeTab === 'uploads' && styles.activeText]}>
            My Uploads ({myUploads})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom content will be implemented later */}

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
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  burger: {
    position: 'absolute',
    left: 10,
    top: 50,
    padding: 6,
    zIndex: 1,
  },
  summaryBox: {
    width: '90%',
    backgroundColor: '#E0BBE4',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  summarySubtitle: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  summaryCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  countLabel: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginBottom: 4,
  },
  count: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    fontWeight: '600',
  },
  switchBox: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    borderRadius: 30,
    backgroundColor: '#E0BBE4',
    marginTop: 20,
    overflow: 'hidden',
  },
  switchHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHalf: {
    backgroundColor: '#cebffa',
  },
  switchText: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
  },
  activeText: {
    fontWeight: '600',
  },
});
