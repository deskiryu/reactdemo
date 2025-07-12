import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from './Theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProductsScreen() {
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
      color: 'rgba(206,191,250,0.6)',
      icon: { lib: FontAwesome5, name: 'pound-sign', color: COLORS.primary },
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {panels.map((p) => {
        const IconComponent = p.icon.lib;
        return (
          <View key={p.key} style={[styles.panel, { backgroundColor: p.color }]}>
            <Text style={styles.panelHeader}>{p.title}</Text>
            <View style={styles.folderLayerTwo} />
            <View style={styles.folderLayerOne} />
            <View style={styles.panelInner} pointerEvents="none">
              <View style={styles.textBox}>
                <Text style={styles.panelText}>{p.text}</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: COLORS.white,
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
  icon: {
    marginLeft: 5,
  },
});
