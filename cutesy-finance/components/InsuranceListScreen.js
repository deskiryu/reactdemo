import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withOpacity } from './Theme';
import { getInsurance } from '../services/InsuranceService';
import { InsuranceEnum } from '../enums';
import { getEnumKeyByValue } from '../utils/enumUtils';

export default function InsuranceListScreen({ navigation, route }) {
  const [insurances, setInsurances] = useState(
    Array.isArray(route?.params?.insurances) ? route.params.insurances : []
  );

  useEffect(() => {
    if (insurances.length > 0) return;
    const load = async () => {
      try {
        const data = await getInsurance();
        if (Array.isArray(data)) {
          setInsurances(data);
        }
      } catch (e) {
        console.warn('Failed to load insurance', e);
      }
    };
    load();
  }, [insurances]);

  const renderRow = (label, value, icon, index, last = false) => (
    <View key={index}>
      <View style={styles.row}>
        <Image source={icon} style={styles.rowIcon} />
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      {!last && <View style={styles.dashed} />}
    </View>
  );

  const renderBenefits = (notes) => {
    const lines = notes
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    const items = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      items.push({ title: lines[i], desc: lines[i + 1] });
    }
    return items.map((b, idx) => (
      <View key={idx} style={styles.benefitItem}>
        <View style={styles.benefitCountBox}>
          <Text style={styles.benefitCount}>{idx + 1}</Text>
        </View>
        <View style={styles.benefitTextBox}>
          <Text style={styles.benefitTitle}>{b.title}</Text>
          <Text style={styles.benefitDesc}>{b.desc}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={withOpacity(COLORS.primary, 0.6)}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Insurance</Text>
        {insurances.map((ins, idx) => {
          const startDate = new Date(ins.startDate || ins.StartDate || 0);
          const endDate = new Date(ins.endDate || ins.EndDate || 0);
          const reviewDate = new Date(ins.reviewDate || ins.ReviewDate || 0);
          const benefit = ins.benefitAmount || ins.BenefitAmount || '';
          const term = ins.term || ins.Term || '';
          const deferred = ins.deferredPeriod || ins.DeferredPeriod || '';
          const cost = ins.cost || ins.Cost || ins.premium || ins.Premium || '';
          const freq = ins.frequency || ins.Frequency || '';
          const notes = ins.brokerNotes || ins.BrokerNotes || '';
          return (
            <View key={idx} style={styles.panel}>
              <View style={styles.topRow}>
        <Image
          source={require('../assets/myinsurance.png')}
          style={styles.insuranceImage}
        />
                <View style={styles.nameBox}>
                  <Text style={styles.name}>{ins.name || ins.Name}</Text>
                  <Text style={styles.type}>
                    {getEnumKeyByValue(
                      InsuranceEnum,
                      ins.insType || ins.InsType
                    )}
                  </Text>
                </View>
                <View style={styles.costBox}>
                  <Text style={styles.cost}>£{cost}</Text>
                  <Text style={styles.costFreq}>
                    {String(freq).toLowerCase() === 'yearly' ? 'Yearly' : 'Monthly'}
                  </Text>
                </View>
              </View>
              <View style={styles.separator} />
              {renderRow(
                'Start Date',
                isNaN(startDate) ? '' : startDate.toLocaleDateString(),
                require('../assets/calendar-days-solid.png'),
                0
              )}
              {renderRow(
                'End Date',
                isNaN(endDate) ? '' : endDate.toLocaleDateString(),
                require('../assets/calendar-days-solid.png'),
                1
              )}
              {renderRow(
                'Review Date',
                isNaN(reviewDate) ? '' : reviewDate.toLocaleDateString(),
                require('../assets/clock-solid.png'),
                2
              )}
              {renderRow(
                'Benefit amount',
                benefit,
                require('../assets/percent-solid.png'),
                3
              )}
              {renderRow(
                'Term',
                term,
                require('../assets/list-ol-solid.png'),
                4
              )}
              {renderRow(
                'Deferred period',
                deferred,
                require('../assets/list-ol-solid.png'),
                5,
                true
              )}
              {!!notes && (
                <>
                  <View style={styles.fullSeparator} />
                  <View style={styles.addonHeader}>
                    <Image
                      source={require('../assets/receipt-text.png')}
                      style={styles.addonIcon}
                    />
                    <Text style={styles.addonTitleText}>Add on Benefits</Text>
                  </View>
                  {renderBenefits(notes)}
                </>
              )}

              {Array.isArray(ins.supportingDocuments || ins.SupportingDocuments) &&
              (ins.supportingDocuments || ins.SupportingDocuments).length > 0 && (
                <>
                  {!notes && <View style={styles.fullSeparator} />}
                  {(ins.supportingDocuments || ins.SupportingDocuments).map(
                    (d, i) => (
                      <View key={i} style={styles.docRow}>
                        <Image
                          source={require('../assets/notification-status.png')}
                          style={styles.docIcon}
                        />
                        <Text style={styles.docText}>{d.fileName || d.FileName}</Text>
                      </View>
                    )
                  )}
                </>
              )}

              <View style={styles.fullSeparator} />
              <TouchableOpacity style={styles.claimBtn} onPress={() => {}}>
                <Text style={styles.claimBtnText}>Make a claim</Text>
              </TouchableOpacity>
              <View style={styles.claimRow}>
                <Image
                  source={require('../assets/ClaimNotification.png')}
                  style={styles.claimIcon}
                />
                <Text style={styles.claimText}>
                  Notify your broker that you want to claim
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
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
  back: {
    position: 'absolute',
    left: 10,
    top: 40,
    padding: 6,
    borderRadius: 20,
    backgroundColor: withOpacity(COLORS.primary, 0.2),
    zIndex: 1,
  },
  header: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'center',
  },
  panel: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 15,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insuranceImage: {
    width: '20%',
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  nameBox: {
    width: '50%',
  },
  costBox: {
    width: '30%',
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    color: COLORS.black,
  },
  type: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
  },
  cost: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    color: COLORS.black,
  },
  costFreq: {
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(0,0,0,0.6)',
      backgroundColor: withOpacity(COLORS.secondary, 0.8), 
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  dashed: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  rowIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    resizeMode: 'contain',
  },
  rowLabel: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
  },
  rowValue: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
  },
  fullSeparator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  addonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addonIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },
  addonTitleText: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  benefitCountBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: 'rgba(241,199,128,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  benefitCount: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
    fontSize: 12,
  },
  benefitTextBox: {
    flex: 1,
  },
  benefitTitle: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    color: COLORS.black,
  },
  benefitDesc: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  docIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
    marginRight: 8,
  },
  docText: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
  },
  claimBtn: {
    alignSelf: 'flex-start',
    width: '40%',
    backgroundColor: withOpacity(COLORS.secondary, 0.8),
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  claimBtnText: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
    fontSize: 14,
  },
  claimRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  claimIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  claimText: {
    fontFamily: 'Poppins_400Regular',
    color: COLORS.black,
  },
});
