import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STRINGS } from './strings';
import { COLORS } from './Theme';

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{STRINGS.exploreText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: COLORS.textDark,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
