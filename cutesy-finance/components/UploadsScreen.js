import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UploadsScreen() {
  const uploads = [
    { name: 'family_photo.jpg', desc: 'Family Photo', icon: 'image' },
    { name: 'bank_statement.pdf', desc: 'Bank Statement', icon: 'document-text' },
    { name: 'tax_docs.pdf', desc: 'Tax Documents', icon: 'document-text' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {uploads.map((u) => (
          <View key={u.name} style={styles.itemRow}>
            <Ionicons name={u.icon} size={20} color="#fff" style={styles.itemIcon} />
            <Text style={styles.itemName}>{u.name}</Text>
            <Text style={styles.itemDesc}>{u.desc}</Text>
          </View>
        ))}
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
    backgroundColor: '#fff',
  },
  list: {
    width: '90%',
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEC8D8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  itemIcon: {
    marginRight: 8,
  },
  itemName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    flex: 1,
    color: '#555',
  },
  itemDesc: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#cebffa',
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
