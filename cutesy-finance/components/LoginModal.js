// Simple login form presented as a modal.
// Accepts only a preset username/password for demo purposes.
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Very basic credential check for demonstration.
  // In a real app you would make a request to your backend here.
  const handleLogin = () => {
    if (email === 'a@b.com' && password === 'P@') {
      setError('');
      onSuccess();
    } else {
      setError('Incorrect email or password');
    }
  };

  return (
    // Outer translucent background and inner modal container
    <View style={styles.modalBg}>
      <View style={styles.modal}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
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
    backgroundColor: '#957DAD',
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
    color: '#957DAD',
  },
});
