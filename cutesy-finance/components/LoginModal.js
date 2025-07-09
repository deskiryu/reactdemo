// Simple login form presented as a modal.
// Accepts only a preset username/password for demo purposes.
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { login as loginRequest } from '../services/LoginService';

export default function LoginModal({ onClose, onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const result = await loginRequest(username, password);
      if (result && result.loggedIn) {
        setError('');
        Alert.alert('Login Successful', `${result.firstName} ${result.lastName}`);
        onSuccess();
      } else {
        setError('Login failed');
      }
    } catch (e) {
      setError('Login failed');
    }
  };

  return (
    // Outer translucent background and inner modal container
    <View style={styles.modalBg}>
      <View style={styles.modal}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          returnKeyType="done"
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  error: {
    color: 'red',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#cebffa',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  closeButton: {
    alignItems: 'center',
    padding: 5,
  },
  closeText: {
    color: '#cebffa',
  },
});
