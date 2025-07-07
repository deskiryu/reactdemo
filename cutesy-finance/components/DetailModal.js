import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DetailModal({ onClose }) {
  return (
    <View style={styles.modalBg}>
      <View style={styles.modal}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {['Item 1 - M2', 'Item 2 - You', 'Item 3 - A1'].map((item) => (
            <View key={item} style={styles.page}>
              <FontAwesome5 name="list" size={40} color="#957DAD" />
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
    color: '#957DAD',
    fontFamily: 'Poppins_400Regular',
  },
});
