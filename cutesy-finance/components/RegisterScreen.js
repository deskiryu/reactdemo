// Registration form allowing the user to sign up.
// Includes a simple password strength meter for education.
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  // Evaluate password complexity and update the "strength" state
  // with a human readable value
  const checkStrength = (text) => {
    setPassword(text);
    let lvl = 0;
    if (/[A-Z]/.test(text)) lvl++;
    if (/[0-9]/.test(text)) lvl++;
    if (/[^A-Za-z0-9]/.test(text)) lvl++;
    if (text.length >= 12) lvl++;
    if (lvl <= 1) setStrength('weak');
    else if (lvl === 2 || lvl === 3) setStrength('medium');
    else setStrength('strong');
  };

  // Map password strength keywords to colors shown in the UI
  const colorMap = { weak: 'red', medium: 'orange', strong: 'green' };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
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
        onChangeText={checkStrength}
      />
      {strength ? (
        <Text style={[styles.strength, { color: colorMap[strength] }]}>Password strength: {strength}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the various elements on the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  strength: {
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#957DAD',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
});
