import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from './DrawerMenu';
import { COLORS } from './Theme';
import { getRequiredDocuments } from '../services/DocumentsRequirementService';

export default function DocuvaultScreen({ onLogout }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('requested');
  const [requirements, setRequirements] = useState([]);
  const [loadingReqs, setLoadingReqs] = useState(false);
  const drawerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: menuVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuVisible, drawerAnim]);

  useEffect(() => {
    if (activeTab === 'requested' && requirements.length === 0 && !loadingReqs) {
      loadRequirements();
    }
  }, [activeTab]);

  const loadRequirements = async () => {
    setLoadingReqs(true);
    try {
      const data = await getRequiredDocuments();
      setRequirements(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn('Failed to load requirements', e);
    } finally {
      setLoadingReqs(false);
    }
  };

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

  const uploadsRequested = requirements.length;
  const myUploads = 0;

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.burger}>
        <Ionicons name="menu" size={24} color={COLORS.textDark} />
      </TouchableOpacity>
      <Text style={styles.header}>Docuvault</Text>

      <View style={styles.summaryBox}>
        <View style={styles.summaryHeader}>
          <View>
            <Text style={styles.summaryTitle}>Summary of your Docuvault</Text>
            <Text style={styles.summarySubtitle}>Your current progress</Text>
          </View>
          <Ionicons name="clipboard" size={28} color="#fff" />
        </View>
        <View style={styles.summaryCounts}>
          <View style={styles.countBox}>
            <Text style={styles.countLabel}>Uploads Requested</Text>
            <Text style={styles.count}>{uploadsRequested}</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countLabel}>My Uploads</Text>
            <Text style={styles.count}>{myUploads}</Text>
          </View>
        </View>
      </View>

      <View style={styles.switchBox}>
        <TouchableOpacity
          style={[styles.switchHalf, activeTab === 'requested' && styles.activeHalf]}
          onPress={() => setActiveTab('requested')}
        >
          <Text
            style={[styles.switchText, activeTab === 'requested' && styles.activeText]}
          >
            Uploads Requested ({uploadsRequested})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchHalf, activeTab === 'uploads' && styles.activeHalf]}
          onPress={() => setActiveTab('uploads')}
        >
          <Text style={[styles.switchText, activeTab === 'uploads' && styles.activeText]}>
            My Uploads ({myUploads})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'requested' && (
        <ScrollView style={styles.reqList} contentContainerStyle={styles.reqContent}>
          {loadingReqs && <Text style={styles.loadingText}>Loading...</Text>}
          {requirements.map((r) => (
            <View key={r.id} style={styles.reqPanel}>
              <View style={styles.reqTop}>
                <Ionicons name="document-text" size={24} color={COLORS.textDark} style={styles.reqIcon} />
                <Text style={styles.reqDesc}>{r.description}</Text>
                <TouchableOpacity style={styles.uploadBtn}>
                  <Text style={styles.uploadBtnText}>Upload Now</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.reqBottom}>
                <View style={styles.pendingPill}>
                  <Text style={styles.pendingText}>Pending</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {activeTab === 'uploads' && (
        <View style={styles.uploadPlaceholder}>
          <Ionicons
            name="cloud-upload-outline"
            size={80}
            color={COLORS.textDark}
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadHeader}>You can upload your documents here</Text>
          <Text style={styles.uploadSubtext}>
            You haven't uploaded any documents yet. Tap the icon above to upload a photo or PDF and share it with your broker
          </Text>
        </View>
      )}

      <DrawerMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onLogout={onLogout}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
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
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  summaryBox: {
    width: '90%',
    backgroundColor: 'rgba(206,191,250,0.2)',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
        color: '#000',
    marginBottom: 10,
  },
  summaryTitle: {
        color: '#000',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  summarySubtitle: {
        color: '#000',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },
  summaryCounts: {
    flexDirection: 'row',
        color: '#000',
    justifyContent: 'space-between',
  },
  countBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  countLabel: {
        color: '#000',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginBottom: 4,
  },
  count: {
        color: '#000',
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    fontWeight: '600',
  },
  switchBox: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    borderRadius: 30,
    backgroundColor: 'rgba(206,191,250,0.2)',
    marginTop: 20,
    overflow: 'hidden',
  },
  switchHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHalf: {
    backgroundColor: '#cebffa',
  },
  switchText: {
        color: '#000',
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
  },
  activeText: {
    fontWeight: '600',
  },
  reqList: {
    width: '90%',
    marginTop: 20,
  },
  reqContent: {
    paddingBottom: 20,
  },
  reqPanel: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 15,
    marginBottom: 15,
  },
  reqTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reqIcon: {
    marginRight: 10,
  },
  reqDesc: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
    fontSize: 14,
  },
  uploadBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  uploadBtnText: {
    color: '#000',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  reqBottom: {
    marginTop: 10,
  },
  pendingPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(206,191,250,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pendingText: {
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    fontSize: 12,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
  },
  uploadPlaceholder: {
    width: '90%',
    height: '40%',
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  uploadIcon: {
    marginBottom: 10,
  },
  uploadHeader: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    color: COLORS.textDark,
  },
  uploadSubtext: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.textDark,
  },
});
