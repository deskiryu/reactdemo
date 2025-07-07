// Main screen users see after logging in. Displays simple panels
// and allows opening a detail modal or the burger drawer menu.
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import DetailModal from './DetailModal';
import DrawerMenu from './DrawerMenu';

export default function Dashboard({ onLogout }) {
  // State that controls the detail popup visibility
  const [detailVisible, setDetailVisible] = useState(false);
  // State that controls the side drawer visibility
  const [menuVisible, setMenuVisible] = useState(false);
  // Temporary box proving the burger click was received
  const [showClickBox, setShowClickBox] = useState(false);

  // Hide the box after a short delay
  useEffect(() => {
    if (showClickBox) {
      const t = setTimeout(() => setShowClickBox(false), 1000);
      return () => clearTimeout(t);
    }
  }, [showClickBox]);

  return (
    <View style={styles.container}>
      {/* Top burger menu */}
      <TouchableOpacity
        onPress={() => {
          setMenuVisible(true);
          setShowClickBox(true);
        }}
        style={styles.burger}
      >
        <Ionicons name="menu" size={32} color="#957DAD" />
      </TouchableOpacity>
      <Text style={styles.header}>Dashboard</Text>
      {showClickBox && (
        <View style={styles.clickBox} pointerEvents="none">
          <Text style={styles.clickBoxText}>Burger clicked!</Text>
        </View>
      )}
      {/* Interest panels */}
      <View style={styles.panelRow}>
        <TouchableOpacity style={[styles.panel, { backgroundColor: '#FEC8D8' }]} onPress={() => setDetailVisible(true)}>
          <FontAwesome5 name="piggy-bank" size={40} color="#fff" />
          <Text style={styles.panelText}>Interest Area 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.panel, { backgroundColor: '#FFDFD3' }]} onPress={() => setDetailVisible(true)}>
          <Ionicons name="card" size={40} color="#fff" />
          <Text style={styles.panelText}>Interest Area 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.panel, { backgroundColor: '#E0BBE4' }]} onPress={() => setDetailVisible(true)}>
          <Ionicons name="checkmark-circle" color="#fff" size={40} />

          <Text style={styles.panelText}>Interest Area 3</Text>
        </TouchableOpacity>
      </View>
      {/* Detail modal popup */}
      <Modal visible={detailVisible} transparent animationType="slide">
        <DetailModal onClose={() => setDetailVisible(false)} />
      </Modal>
      {/* Burger drawer menu */}
      <DrawerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} onLogout={onLogout} />
    </View>
  );
}

// Layout styling for the dashboard screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  burger: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    color: '#957DAD',
    marginBottom: 30,
  },
  panelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  panel: {
    width: 110,
    height: 110,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelText: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginTop: 5,
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
    color: '#957DAD',
  },
});
