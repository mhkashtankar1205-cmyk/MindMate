import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { ProgressRing } from '../../src/components/common/ProgressRing';
import { StressLevelBadge } from '../../src/components/common/StressLevelBadge';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { SafetyCard } from '../../src/components/common/SafetyCard';
import { useWellness } from '../../src/context/WellnessContext';
import { BookOpen, Moon, Briefcase, Sparkles, ArrowRight, LifeBuoy } from 'lucide-react-native';

export default function StressResultScreen() {
  const router = useRouter();
  const { stressResult } = useWellness();

  const score = stressResult?.score || 64;
  const level = stressResult?.level || 'MODERATE';

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Assessment Result" showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Main Result Score Card */}
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Your Current Wellbeing Level</Text>
          <View style={styles.ringWrapper}>
            <ProgressRing score={score} level={level} size={150} strokeWidth={12} />
          </View>
          <View style={styles.badgeWrapper}>
            <StressLevelBadge level={level} score={score} />
          </View>
          <Text style={styles.summaryText}>
            "{stressResult?.summary || 'Your recent responses suggest you may be experiencing elevated pressure.'}"
          </Text>
        </View>

        <SafetyCard type="disclaimer" />

        {/* What May Be Contributing (Requirement #14) */}
        <Text style={styles.sectionHeader}>What may be contributing?</Text>
        <View style={styles.factorsList}>
          <View style={styles.factorCard}>
            <View style={[styles.factorIcon, { backgroundColor: Colors.lightOrange }]}>
              <BookOpen size={20} color={Colors.primary} />
            </View>
            <View style={styles.factorContent}>
              <Text style={styles.factorTitle}>Academic Workload & Deadlines</Text>
              <Text style={styles.factorDesc}>Syllabus pacing and upcoming semester exams.</Text>
            </View>
          </View>

          <View style={styles.factorCard}>
            <View style={[styles.factorIcon, { backgroundColor: Colors.cardSecondary }]}>
              <Moon size={20} color={Colors.categorySleep} />
            </View>
            <View style={styles.factorContent}>
              <Text style={styles.factorTitle}>Rest & Sleep Variability</Text>
              <Text style={styles.factorDesc}>Reported sleep hours and late night screen time.</Text>
            </View>
          </View>

          <View style={styles.factorCard}>
            <View style={[styles.factorIcon, { backgroundColor: Colors.warningBg }]}>
              <Briefcase size={20} color={Colors.warning} />
            </View>
            <View style={styles.factorContent}>
              <Text style={styles.factorTitle}>Career & Placement Pressure</Text>
              <Text style={styles.factorDesc}>Interviews, resume prep, and peer competition.</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionBlock}>
          <PrimaryButton
            title="See Personalized Recommendations"
            onPress={() => router.push('/recommendations')}
            icon={<Sparkles size={18} color={Colors.textLight} />}
            style={styles.mainBtn}
          />
          <SecondaryButton
            title="Talk to Someone / Support"
            onPress={() => router.push('/support')}
            icon={<LifeBuoy size={18} color={Colors.primaryDark} />}
            style={styles.secBtn}
          />
        </View>
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
  resultCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.medium,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  ringWrapper: {
    marginVertical: Spacing.xs,
  },
  badgeWrapper: {
    marginVertical: Spacing.md,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    fontStyle: 'italic',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  factorsList: {
    gap: Spacing.xs,
  },
  factorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  factorIcon: {
    padding: 10,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  factorContent: {
    flex: 1,
  },
  factorTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  factorDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionBlock: {
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  mainBtn: {
    width: '100%',
  },
  secBtn: {
    width: '100%',
  },
});
