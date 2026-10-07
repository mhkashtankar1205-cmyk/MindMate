import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SafetyCard } from '../../src/components/common/SafetyCard';
import { StressLevelBadge } from '../../src/components/common/StressLevelBadge';
import { useAuth } from '../../src/context/AuthContext';
import { useWellness } from '../../src/context/WellnessContext';
import { ShieldCheck, Sparkles, CheckCircle2, UserCheck } from 'lucide-react-native';

export default function OnboardingSummaryScreen() {
  const router = useRouter();
  const { completeOnboarding, user } = useAuth();
  const { stressResult, refreshStressPrediction } = useWellness();

  useEffect(() => {
    refreshStressPrediction();
  }, []);

  const handleFinish = async () => {
    await completeOnboarding();
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Sparkles size={32} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Your Personalized Profile</Text>
          <Text style={styles.subtitle}>
            Welcome aboard, {user?.name || 'Mahak'}! We've analyzed your initial responses to build your student wellness snapshot.
          </Text>
        </View>

        {/* Snapshot Summary Card */}
        {stressResult && (
          <View style={styles.summaryCard}>
            <View style={styles.cardTop}>
              <Text style={styles.cardHeader}>Initial Wellbeing Snapshot</Text>
              <StressLevelBadge level={stressResult.level} score={stressResult.score} />
            </View>

            <Text style={styles.summaryText}>{stressResult.summary}</Text>

            <View style={styles.traitsBox}>
              <Text style={styles.traitsHeader}>Your Mindset Tendencies:</Text>
              <View style={styles.traitItem}>
                <CheckCircle2 size={16} color={Colors.primary} />
                <Text style={styles.traitText}>Think deeply before making academic decisions</Text>
              </View>
              <View style={styles.traitItem}>
                <CheckCircle2 size={16} color={Colors.primary} />
                <Text style={styles.traitText}>Prefer structured planning when under exam pressure</Text>
              </View>
              <View style={styles.traitItem}>
                <CheckCircle2 size={16} color={Colors.primary} />
                <Text style={styles.traitText}>Value supportive peer and trusted mentor relationships</Text>
              </View>
            </View>
          </View>
        )}

        {/* Privacy Section (Requirement #7 Screen 3) */}
        <View style={styles.privacyCard}>
          <View style={styles.privacyHeader}>
            <ShieldCheck size={22} color={Colors.primary} />
            <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
          </View>
          <View style={styles.privacyPoint}>
            <Text style={styles.privacyBullet}>•</Text>
            <Text style={styles.privacyDesc}>Your personal responses and check-ins are strictly private.</Text>
          </View>
          <View style={styles.privacyPoint}>
            <Text style={styles.privacyBullet}>•</Text>
            <Text style={styles.privacyDesc}>College admin dashboards show only anonymous aggregated trends.</Text>
          </View>
          <View style={styles.privacyPoint}>
            <Text style={styles.privacyBullet}>•</Text>
            <Text style={styles.privacyDesc}>MindMate never provides medical or deterministic diagnoses.</Text>
          </View>
        </View>

        <SafetyCard type="disclaimer" />

        <PrimaryButton
          title="Enter MindMate Dashboard"
          onPress={handleFinish}
          style={styles.finishBtn}
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
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
    marginBottom: Spacing.md,
  },
  traitsBox: {
    backgroundColor: Colors.cardSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: 8,
  },
  traitsHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  traitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  traitText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  privacyCard: {
    backgroundColor: Colors.cardSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  privacyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  privacyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  privacyBullet: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 8,
    fontWeight: '700',
  },
  privacyDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  finishBtn: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
});
