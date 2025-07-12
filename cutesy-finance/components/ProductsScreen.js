import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import DrawerMenu from './DrawerMenu';
import { COLORS, PrimaryButton } from './Theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProductsScreen({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const drawerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: menuVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuVisible, drawerAnim]);

  const animatedStyles = {
    transform: [
      {
        translateX: drawerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 180],
        }),
      },
      {
        scale: drawerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.85],
        }),
      },
    ],
  };
  const panels = [
    {
      key: 'mortgage',
      title: 'My Mortgage',
      text: 'Explore your mortgage options — from first-time buyers to remortgaging.',
      color: 'rgba(206,191,250,0.6)',
      icon: { lib: Ionicons, name: 'home', color: COLORS.primary },
    },
    {
      key: 'insurance',
      title: 'My Insurance',
      text: 'Discover how to protect your home, income, & more with right coverage.',
      color: 'rgba(238,154,12,0.6)',
      icon: { lib: Ionicons, name: 'document-text', color: COLORS.secondary },
    },
    {
      key: 'wealth',
      title: 'My Wealth',
      text: 'Learn how to grow, manage, and protect your financial future.',
      color: 'rgba(42,126,53,0.4)',
      icon: { lib: FontAwesome5, name: 'pound-sign', color: COLORS.primary },
    },
  ];

  return (
    <Animated.ScrollView
      style={[styles.container, animatedStyles]}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burger}>
        <Ionicons name="menu" size={24} color={COLORS.textDark} />
      </TouchableOpacity>
      <Text style={styles.header}>Products</Text>
      {panels.map((p) => {
        const IconComponent = p.icon.lib;
        return (
          <View key={p.key} style={[styles.panel, { backgroundColor: p.color }]}>
            <Text style={styles.panelHeader}>{p.title}</Text>
            <View style={styles.folderLayerTwo} />
            <View style={styles.folderLayerOne} />
            <View style={styles.panelInner}>
              <View style={styles.textBox}>
                <Text style={styles.panelText}>{p.text}</Text>
                <PrimaryButton style={styles.exploreButton}>Explore Now</PrimaryButton>
              </View>
              <IconComponent
                name={p.icon.name}
                size={40}
                color={p.icon.color}
                style={styles.icon}
              />
            </View>
          </View>
        );
      })}
      <DrawerMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onLogout={onLogout}
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 40,
  },
  content: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  burger: {
    position: 'absolute',
    left: 10,
    top: 40,
    padding: 4,
    zIndex: 1,
  },
  header: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.primary,
    marginTop: 10,
    marginBottom: 10,
  },
  panel: {
    width: '90%',
    borderRadius: 12,
    padding: 15,
    minHeight: SCREEN_HEIGHT * 0.25,
    justifyContent: 'flex-end',
    position: 'relative',
    marginBottom: 30,
  },
  panelHeader: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10,
  },
  folderLayerOne: {
    position: 'absolute',
    bottom: 65,
    alignSelf: 'center',
    width: '90%',
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  folderLayerTwo: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    width: '80%',
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  panelInner: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  textBox: {
    flex: 1,
    marginRight: 10,
  },
  panelText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLORS.black,
  },
  exploreButton: {
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  icon: {
    marginLeft: 5,
  },
});
