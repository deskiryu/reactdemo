// Main screen users see after logging in. Displays simple panels
// and allows opening a detail modal or the burger drawer menu.
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DetailModal from './DetailModal';
import DrawerMenu from './DrawerMenu';

export default function Dashboard({ onLogout }) {
  // State that controls the detail popup visibility
  const [detailVisible, setDetailVisible] = useState(false);
  // State that controls the side drawer visibility
  const [menuVisible, setMenuVisible] = useState(false);
  // Animated value driving the drawer transformation
  const drawerAnim = useRef(new Animated.Value(0)).current;
  // Temporary box proving the burger click was received
  const [showClickBox, setShowClickBox] = useState(false);

  // Hide the box after a short delay
  useEffect(() => {
    if (showClickBox) {
      const t = setTimeout(() => setShowClickBox(false), 1000);
      return () => clearTimeout(t);
    }
  }, [showClickBox]);

  // Animate the dashboard when the menu visibility changes
  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: menuVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuVisible, drawerAnim]);

  // Transform style applied when menu is toggled
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

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      {/* Top burger menu */}
      <TouchableOpacity
        onPress={() => {
          setMenuVisible(true);
          setShowClickBox(true);
        }}
        style={styles.burger}
      >
        <Ionicons name="menu" size={32} color="#cebffa" />
      </TouchableOpacity>
      <Text style={styles.header}>Dashboard</Text>
      {showClickBox && (
        <View style={styles.clickBox} pointerEvents="none">
          <Text style={styles.clickBoxText}>Burger clicked!</Text>
        </View>
      )}
      {/* Dashboard content recreated in code */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#FEC8D8' }]}
          onPress={() => setDetailVisible(true)}
        >
          <Text style={styles.cardTitle}>Balance</Text>
          <Text style={styles.cardValue}>$5,250.00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#FFDFD3' }]}
          onPress={() => setDetailVisible(true)}
        >
          <Text style={styles.cardTitle}>Savings</Text>
          <Text style={styles.cardValue}>$12,800.00</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.card, styles.wideCard, { backgroundColor: '#E0BBE4' }]}
          onPress={() => setDetailVisible(true)}
        >
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <Text style={styles.activityItem}>- Coffee Shop $4.75</Text>
          <Text style={styles.activityItem}>- Grocery $36.20</Text>
          <Text style={styles.activityItem}>+ Paycheck $1,200.00</Text>
        </TouchableOpacity>
      </View>
      {/* Detail modal popup */}
      <Modal visible={detailVisible} transparent animationType="slide">
        <DetailModal onClose={() => setDetailVisible(false)} />
      </Modal>
      {/* Burger drawer menu */}
      <DrawerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} onLogout={onLogout} />
    </Animated.View>
  );
}

// Layout styling for the dashboard screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
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
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  wideCard: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  cardValue: {
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  activityItem: {
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    fontSize: 12,
  },
  clickBox: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#FFDFD3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clickBoxText: {
    fontFamily: 'Poppins_400Regular',
    color: '#cebffa',
  },
});
