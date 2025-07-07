// Welcome screen shown on first launch.  Provides options to register
// or log in.  Also displays a fun image carousel at the top.
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Modal, Alert } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// Small modal component where the user can input their login details
import LoginModal from './LoginModal';

const { width } = Dimensions.get('window');

export default function WelcomeScreen({ navigation, onLogin }) {
  // Controls whether the login modal is shown
  const [loginVisible, setLoginVisible] = useState(false);

  // Helper functions to open and close the modal
  const openLogin = () => setLoginVisible(true);
  const closeLogin = () => setLoginVisible(false);

  return (
    <View style={styles.container}>
      {/* Carousel of happy family images */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
        <View style={[styles.slide, { backgroundColor: '#E0BBE4' }]}>
          <Ionicons name="people" size={120} color="#fff" />
        </View>
        <View style={[styles.slide, { backgroundColor: '#cebffa' }]}>
          <FontAwesome5 name="dog" size={120} color="#fff" />
        </View>
        <View style={[styles.slide, { backgroundColor: '#D291BC' }]}>
          <MaterialIcons name="elderly" size={120} color="#fff" />
        </View>
      </ScrollView>
      <Text style={styles.title}>Welcome to Cutesy Finance</Text>
      <View style={styles.iconRow}>
        {/* Apple signup icon */}
        <TouchableOpacity onPress={() => Alert.alert('Apple Sign Up')} style={styles.iconButton}>
          <FontAwesome5 name="apple" size={32} color="#fff" />
        </TouchableOpacity>
        {/* Google signup icon */}
        <TouchableOpacity onPress={() => Alert.alert('Google Sign Up')} style={styles.iconButton}>
          <FontAwesome5 name="google" size={32} color="#fff" />
        </TouchableOpacity>
        {/* Manual registration icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.iconButton}>
          <Ionicons name="create" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Existing user login button */}
      <TouchableOpacity onPress={openLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Existing user? Login</Text>
      </TouchableOpacity>
      {/* Popup modal for login */}
      <Modal visible={loginVisible} animationType="slide" transparent>
        <LoginModal onClose={closeLogin} onSuccess={() => { closeLogin(); onLogin(); }} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    flexGrow: 0,
  },
  slide: {
    width,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    marginVertical: 20,
    color: '#555',
  },
  iconRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  iconButton: {
    backgroundColor: '#b4a0e5',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  loginButton: {
    marginTop: 30,
    padding: 10,
  },
  loginText: {
    color: '#cebffa',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
});
