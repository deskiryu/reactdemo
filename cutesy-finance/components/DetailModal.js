// Simple modal used to show additional information when a panel is tapped.
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Grab the screen width so the modal pages can match the viewport size
const { width } = Dimensions.get('window');

export default function DetailModal({ onClose }) {
  return (
    // Background dims the screen, inner view contains the pages of details
    <View style={styles.modalBg}>
      <View style={styles.modal}>
        {/* Horizontal pager listing out a few sample items */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {['Item 1 - M2', 'Item 2 - You', 'Item 3 - A1'].map((item) => (
            <View key={item} style={styles.page}>
              <FontAwesome5 name="list" size={40} color="#cebffa" />
              <Text style={styles.item}>{item}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styling for the modal layout and pager pages
const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
    alignItems: 'center',
  },
  page: {
    width: width * 0.8,
    alignItems: 'center',
  },
  item: {
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
  },
  closeText: {
    color: '#cebffa',
    fontFamily: 'Poppins_400Regular',
  },
});
