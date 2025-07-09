import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from './DrawerMenu';

export default function UploadsScreen({ onLogout }) {
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

  const uploads = [
    { name: 'family_photo.jpg', desc: 'Family Photo', icon: 'image' },
    { name: 'bank_statement.pdf', desc: 'Bank Statement', icon: 'document-text' },
    { name: 'tax_docs.pdf', desc: 'Tax Documents', icon: 'document-text' },
  ];

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        style={styles.burger}
      >
        <Ionicons name="menu" size={32} color="#cebffa" />
      </TouchableOpacity>
      <Text style={styles.header}>Uploads</Text>
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
  header: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    color: '#cebffa',
    marginBottom: 30,
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
