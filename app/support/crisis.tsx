import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { SafetyCard } from '../../src/components/common/SafetyCard';
import { mockSupportResources } from '../../src/data/mockSupport';
import { ShieldAlert, PhoneCall, Heart } from 'lucide-react-native';

export default function CrisisSupportScreen() {
  const router = useRouter();
  const emergencyResources = mockSupportResources.filter((r) => r.isEmergency);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Crisis & Helplines" showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.alertCard}>
          <ShieldAlert size={36} color={Colors.danger} />
          <Text style={styles.alertTitle}>You deserve immediate support.</Text>
          <Text style={styles.alertDesc}>
            If you are experiencing overwhelming distress or thoughts of self-harm, please connect with one of these 24/7 confidential helplines.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Toll-Free 24/7 Helplines</Text>
        <View style={styles.helplineList}>
          {emergencyResources.map((item) => (
            <View key={item.id} style={styles.helplineCard}>
              <View style={styles.helplineHeader}>
                <PhoneCall size={18} color={Colors.danger} />
                <Text style={styles.helplineTitle}>{item.title}</Text>
              </View>
              <Text style={styles.helplineNumber}>{item.contactInfo}</Text>
              <Text style={styles.helplineSub}>{item.description}</Text>
            </View>
          ))}
        </View>

        <SafetyCard type="disclaimer" />

        <SecondaryButton
          title="Return to MindMate Dashboard"
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.returnBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  alertCard: {
    backgroundColor: Colors.dangerBg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: `${Colors.danger}40`,
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.danger,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  alertDesc: {
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  helplineList: {
    gap: Spacing.sm,
  },
  helplineCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  helplineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  helplineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  helplineNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.danger,
    marginVertical: 4,
  },
  helplineSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  returnBtn: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
});
