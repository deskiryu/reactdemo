// Simple flyout menu displayed over the current screen.
// No sliding drawer animation to keep it lightweight.
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export default function DrawerMenu({ visible, onClose, onLogout }) {
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
          {[
            'Option A',
            'Option B',
            'Option C',
            'Option D',
            'Option E',
            'Option F',
            'Option G',
            'Option H',
          ].map((t) => (
            <Text key={t} style={styles.item}>{t}</Text>
          ))}
          <TouchableOpacity onPress={onLogout}>
            <Text style={[styles.item, styles.logout]}>Logout</Text>
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
    backgroundColor: '#957DAD',
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
  logout: {
    marginTop: 20,
  },
});
