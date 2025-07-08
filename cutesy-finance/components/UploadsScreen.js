import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UploadsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.item}>family_photo.jpg</Text>
        <Text style={styles.item}>bank_statement.pdf</Text>
        <Text style={styles.item}>tax_docs.pdf</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="document" size={20} color="#fff" />
          <Text style={styles.buttonText}>Upload PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="image" size={20} color="#fff" />
          <Text style={styles.buttonText}>Upload Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#FFDFD3',
  },
  list: {
    width: '80%',
    marginBottom: 20,
  },
  item: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginVertical: 4,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cebffa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    marginLeft: 6,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
});
