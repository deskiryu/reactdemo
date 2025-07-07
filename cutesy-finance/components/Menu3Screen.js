import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Menu3Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Menu 3 content goes here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEC8D8',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
  },
});
