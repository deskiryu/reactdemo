import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Menu2Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Menu 2 content goes here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDFD3',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
  },
});
