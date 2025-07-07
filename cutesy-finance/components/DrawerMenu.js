// Simple flyout menu displayed over the current screen.
// No sliding drawer animation to keep it lightweight.
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerMenu({ visible, onClose, onLogout }) {
  const options = [
    { label: 'Option A', icon: 'star' },
    { label: 'Option B', icon: 'planet' },
    { label: 'Option C', icon: 'rocket' },
    { label: 'Option D', icon: 'leaf' },
    { label: 'Option E', icon: 'paw' },
    { label: 'Option F', icon: 'snow' },
    { label: 'Option G', icon: 'basket' },
    { label: 'Option H', icon: 'bed' },
  ];
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={styles.menu} pointerEvents="auto">
          <TouchableOpacity onPress={onClose} style={styles.homeButton}>
            <Ionicons name="home" size={24} color="#fff" />
          </TouchableOpacity>
          {options.map((o) => (
            <View key={o.label} style={styles.itemRow}>
              <Ionicons name={o.icon} size={20} color="#fff" style={styles.itemIcon} />
              <Text style={styles.item}>{o.label}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={onLogout}>
            <View style={styles.itemRow}>
              <Ionicons name="log-out" size={20} color="#fff" style={styles.itemIcon} />
              <Text style={[styles.item, styles.logout]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Styling for the flyout menu and its backdrop
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 200,
    backgroundColor: '#cebffa',
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  item: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 10,
  },
  homeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  logout: {
    marginTop: 20,
  },
});
