import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, PanResponder } from 'react-native';

const { width } = Dimensions.get('window');

export default function DrawerMenu({ visible, onClose, onLogout }) {
  const transX = useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    Animated.timing(transX, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dx > 10,
      onPanResponderRelease: (_, g) => {
        if (g.dx < -50) onClose();
      },
    })
  ).current;

  if (!visible) return null;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <Animated.View style={[styles.drawer, { transform: [{ translateX: transX }] }]} {...panResponder.panHandlers}>
        {['Option A', 'Option B', 'Option C', 'Option D'].map((t) => (
          <Text key={t} style={styles.item}>{t}</Text>
        ))}
        <TouchableOpacity onPress={onLogout}>
          <Text style={[styles.item, styles.logout]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: '#957DAD',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  item: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    marginVertical: 10,
  },
  logout: {
    marginTop: 20,
  },
});
