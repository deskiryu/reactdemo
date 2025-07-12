import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from './DrawerMenu';
import { COLORS, PrimaryButton } from './Theme';
import { STRINGS } from './strings';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen({ navigation, onLogout }) {
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

  const actions = [
    {
      key: 'mortgage',
      label: STRINGS.actionMortgage,
      icon: require('../assets/circle-plus-solid.png'),
    },
    {
      key: 'insurance',
      label: STRINGS.actionInsurance,
      icon: require('../assets/shield-halved-solid.png'),
    },
    {
      key: 'wealth',
      label: STRINGS.actionWealth,
      icon: require("../assets/wallet-solid 1.png"),
    },
  ];

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burger}>
        <Ionicons name="menu" size={24} color={COLORS.textDark} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Home</Text>

      <View style={styles.budgetBox}>
        <View style={styles.budgetText}>
          <Text style={styles.budgetTitle}>{STRINGS.budgetPlannerTitle}</Text>
          <Text style={styles.budgetDesc}>{STRINGS.budgetPlannerDesc}</Text>
          <PrimaryButton style={styles.budgetBtn}>{STRINGS.budgetPlannerCta}</PrimaryButton>
        </View>
        <Image
          source={require('../assets/coinpurse.png')}
          style={styles.budgetImage}
        />
      </View>

      <View style={styles.profileBox}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>60%</Text>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.profileTitle}>{STRINGS.profileTitle}</Text>
          <Text style={styles.profileProgress}>{STRINGS.profileProgress}</Text>
        </View>
        <PrimaryButton style={styles.profileBtn}>{STRINGS.profileCta}</PrimaryButton>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.actionScroll}
        contentContainerStyle={styles.actionContent}
      >
        {actions.map((a) => (
          <View key={a.key} style={styles.actionPanel}>
            <View style={styles.actionIconContainer}>
              <Image source={a.icon} style={styles.actionIcon} />
            </View>
            <Text style={styles.actionText}>{a.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Products</Text>

      <View style={styles.productsBox}>
        <Text style={styles.productsHeader}>{STRINGS.myProducts}</Text>
        <View style={styles.folderLayerTwo} />
        <View style={styles.folderLayerOne} />
        <View style={styles.explorePanel}>
          <View style={styles.exploreTextBox}>
            <Text style={styles.exploreText}>{STRINGS.exploreText}</Text>
            <PrimaryButton
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Products')}
            >
              {STRINGS.exploreButton}
            </PrimaryButton>
          </View>
          <Image
            source={require('../assets/Acknowledgment.png')}
            style={styles.productsImage}
          />
        </View>
      </View>

        <DrawerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} onLogout={onLogout} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 50,
    alignSelf: 'flex-start',
  },
  budgetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgba(206,191,250,0.4)',
    borderRadius: 12,
    padding: 15,
    minHeight: SCREEN_HEIGHT * 0.2,
    marginTop: 20,
  },
  budgetText: {
    flex: 1,
  },
  budgetTitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 4,
  },
  budgetDesc: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 10,
  },
  budgetBtn: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  budgetImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  productsImage: {
    width: 70,
    height: 70,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgba(206,191,250,0.2)',
    borderRadius: 12,
    padding: 15,
    minHeight: SCREEN_HEIGHT * 0.1,
    marginTop: 20,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  progressText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: COLORS.black,
  },
  profileText: {
    flex: 1,
  },
  profileTitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  profileProgress: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: COLORS.black,
  },
  profileBtn: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionScroll: {
    width: '100%',
    marginTop: 15,
  },
  actionContent: {
    paddingHorizontal: 20,
  },
  actionPanel: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  actionIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },
  actionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: COLORS.black,
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  sectionTitle: {
    width: '90%',
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.black,
  },
  productsBox: {
    width: '90%',
    backgroundColor: 'rgba(206,191,250,0.8)',
    borderRadius: 12,
    padding: 15,
    minHeight: SCREEN_HEIGHT * 0.3,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  productsHeader: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10,
  },
  folderLayerOne: {
    position: 'absolute',
    bottom: 139,
    alignSelf: 'center',
    width: '90%',
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  folderLayerTwo: {
    position: 'absolute',
    bottom: 154,
    alignSelf: 'center',
    width: '80%',
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  explorePanel: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  exploreTextBox: {
    flex: 1,
    marginRight: 10,
  },
  exploreText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 6,
  },
  exploreButton: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  exploreIcon: {
    marginLeft: 5,
  },
});
