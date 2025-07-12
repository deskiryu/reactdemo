import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const COLORS = {
  primary: '#cebffa',
  secondary: '#ee9a0c',
  tertiary: '#2a7e35',
  white: '#fff',
  textDark: '#555',
  black: '#000',
};

export const SIZES = {
  radius: 8,
  padding: 12,
};

export function withOpacity(hex, opacity = 1) {
  const normalized = hex.replace('#', '');
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${opacity})`;
}

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

export const CHAT_STYLES = {
  message: {
    width: '90%',
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginVertical: 5,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.black,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: SIZES.radius,
    marginBottom: 5,
  },
  videoContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 5,
  },
  audioContainer: {
    flexDirection: 'row',
    width: '90%',
    aspectRatio: 9,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginBottom: 5,
  },
  audioPlay: {
    width: '11%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioWave: {
    width: '89%',
    justifyContent: 'center',
    height: '100%',
  },
  waveformIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  waveBar: {
    width: 4,
    backgroundColor: COLORS.white,
    marginHorizontal: 2,
  },
};

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
