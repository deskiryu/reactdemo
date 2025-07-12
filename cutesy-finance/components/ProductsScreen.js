import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from './DrawerMenu';
import { COLORS, PrimaryButton, withOpacity } from './Theme';
import { getInsurance } from '../services/InsuranceService';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProductsScreen({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [insurances, setInsurances] = useState([]);
  const drawerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: menuVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuVisible, drawerAnim]);

  useEffect(() => {
    const loadInsurance = async () => {
      try {
        const data = await getInsurance();
        if (Array.isArray(data) && data.length > 0) {
          setInsurances(data);
        }
      } catch (e) {
        console.warn('Failed to load insurance', e);
      }
    };
    loadInsurance();
  }, []);

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
      color: withOpacity(COLORS.primary, 0.8),
      buttonColor: withOpacity(COLORS.primary, 0.8),
      image: require('../assets/mymortgage.png'),
    },
    {
      key: 'insurance',
      title: 'My Insurance',
      text: 'Discover how to protect your home, income, & more with right coverage.',
      color: withOpacity(COLORS.secondary, 0.8),
      buttonColor: withOpacity(COLORS.secondary, 0.8),
      image: require('../assets/myinsurance.png'),
    },
    {
      key: 'wealth',
      title: 'My Wealth',
      text: 'Learn how to grow, manage, and protect your financial future.',
      color: withOpacity(COLORS.tertiary, 0.8),
      buttonColor: withOpacity(COLORS.tertiary, 0.8),
      image: require('../assets/mywealth.png'),
    },
  ];

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burger}>
        <Ionicons name="menu" size={24} color={COLORS.textDark} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Products</Text>
      {panels.map((p) => {
        if (p.key === 'insurance' && insurances.length > 0) {
          const ins = insurances[0];
          const reviewDate = new Date(ins.reviewDate || ins.ReviewDate || 0);
          const expiryDate = new Date(ins.expiryDate || ins.ExpiryDate || 0);
          const now = new Date();
          const threeMonths = new Date(now);
          threeMonths.setMonth(now.getMonth() + 3);
          let statusLabel = 'Active';
          let statusColor = 'green';
          if (expiryDate < now) {
            statusLabel = 'Lapsed';
            statusColor = 'red';
          } else if (expiryDate <= threeMonths) {
            statusLabel = 'Need Review';
            statusColor = 'orange';
          }

          return (
            <View key={p.key} style={[styles.panel, { backgroundColor: p.color }]}>
              <Text style={styles.panelHeader}>{p.title}</Text>
              <View style={styles.folderLayerTwo} />
              <View style={styles.folderLayerOne} />
              <View style={[styles.panelInner, styles.insurancePanel]}>
                <Image source={p.image} style={styles.insuranceIcon} />
                <View style={styles.insuranceInfo}>
                  <Text style={styles.insuranceType}>{String(ins.insType || ins.InsType)}</Text>
                  <View style={styles.insuranceNameRow}>
                    <Text style={styles.insuranceName}>{ins.name || ins.Name}</Text>

                  </View>
                  <PrimaryButton style={styles.reviewButton} textStyle={styles.reviewButtonText}>
                    Book review
                  </PrimaryButton>
                </View>
                <View style={styles.reviewSection}>
                  <Text style={styles.reviewLabel}>Review date</Text>
                  <Text style={styles.reviewDate}>{isNaN(reviewDate) ? '' : reviewDate.toLocaleDateString()}</Text>
                  <View style={[styles.statusPill, { backgroundColor: statusColor }]}>
                    <Text style={styles.statusText}>{statusLabel}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }
        return (
          <View key={p.key} style={[styles.panel, { backgroundColor: p.color }]}>
            <Text style={styles.panelHeader}>{p.title}</Text>
            <View style={styles.folderLayerTwo} />
            <View style={styles.folderLayerOne} />
            <View style={styles.panelInner}>
              <View style={styles.textBox}>
                <Text style={styles.panelText}>{p.text}</Text>
                <PrimaryButton style={[styles.exploreButton, { backgroundColor: p.buttonColor }]}>Explore Now</PrimaryButton>
              </View>
              <Image source={p.image} style={styles.icon} />
            </View>
          </View>
        );
      })}
        <DrawerMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onLogout={onLogout}
        />
      </ScrollView>
    </Animated.View>
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
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
    marginBottom: 10,
    marginLeft: 50,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  panel: {
    width: '90%',
    borderRadius: 12,
    padding: 15,
    minHeight: SCREEN_HEIGHT * 0.3,
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
    bottom: 145,
    alignSelf: 'center',
    width: '90%',
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  folderLayerTwo: {
    position: 'absolute',
    bottom: 155,
    alignSelf: 'center',
    width: '80%',
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  panelInner: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    minHeight: SCREEN_HEIGHT * 0.18,
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
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  icon: {
    marginLeft: 5,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  insurancePanel: {
    alignItems: 'center',
  },
  insuranceIcon: {
    marginRight: 10,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  insuranceInfo: {
    flex: 1,
  },
  insuranceType: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  insuranceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insuranceName: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
    marginRight: 8,
  },
  reviewButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: '80%',
  },
  reviewButtonText: {
    fontSize: 12,
  },
  reviewSection: {
    width: '30%',
    alignItems: 'flex-start',
  },
  reviewLabel: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    color: COLORS.black,
  },
  reviewDate: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
    marginBottom: 4,
  },
  statusPill: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    color: COLORS.white,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
});
