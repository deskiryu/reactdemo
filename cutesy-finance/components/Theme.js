import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export const COLORS = {
  primary: '#cebffa',
  secondary: '#FEC8D8',
  tertiary: '#FFDFD3',
  white: '#fff',
  textDark: '#555',
};

export const SIZES = {
  radius: 8,
  padding: 12,
};

export function PrimaryButton({ children, style, textStyle, ...props }) {
  return (
    <TouchableOpacity style={[styles.primaryButton, style]} {...props}>
      {typeof children === 'string' ? (
        <Text style={[styles.primaryText, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: COLORS.white,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
});
