import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { LifestyleData } from '../../src/types/assessment';
import { assessmentService } from '../../src/services/assessmentService';
import { Moon, Activity, Monitor, BookOpen, Utensils, Users, Zap } from 'lucide-react-native';

export default function OnboardingLifestyleScreen() {
  const router = useRouter();

  const [sleepHours, setSleepHours] = useState(6.5);
  const [sleepQuality, setSleepQuality] = useState<LifestyleData['sleepQuality']>('Fair');
  const [activityDays, setActivityDays] = useState(3);
  const [screenTimeHours, setScreenTimeHours] = useState(6);
  const [studyHours, setStudyHours] = useState(5);
  const [breakFreq, setBreakFreq] = useState<LifestyleData['breakFrequency']>('Every 2 hours');
  const [mealRegularity, setMealRegularity] = useState<LifestyleData['mealRegularity']>('Moderate');
  const [waterIntake, setWaterIntake] = useState(6);
  const [socialSupport, setSocialSupport] = useState<LifestyleData['socialSupportFrequency']>('3-4 times/week');
  const [energyLevel, setEnergyLevel] = useState<LifestyleData['energyLevel']>('Medium');

  const handleNext = async () => {
    const data: LifestyleData = {
      sleepHours,
      sleepQuality,
      physicalActivityDays: activityDays,
      screenTimeHours,
      studyHours,
      breakFrequency: breakFreq,
      mealRegularity,
      waterIntakeGlasses: waterIntake,
      socialSupportFrequency: socialSupport,
      overallMood: 3,
      energyLevel,
    };
    await assessmentService.saveLifestyleData(data);
    router.push('/onboarding/situations');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Lifestyle Assessment" showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Daily Habits</Text>
        <Text style={styles.sectionSubtitle}>
          Lifestyle factors directly impact your stress resilience and cognitive focus.
        </Text>

        {/* Sleep Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Moon size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Sleep Routine</Text>
          </View>
          <Text style={styles.label}>Average Sleep: {sleepHours} Hours / Night</Text>
          <View style={styles.stepRow}>
            {[4, 5, 6, 6.5, 7, 7.5, 8, 9].map((val) => (
              <Pressable
                key={val}
                onPress={() => setSleepHours(val)}
                style={[styles.valBtn, sleepHours === val && styles.valBtnSelected]}
              >
                <Text style={[styles.valText, sleepHours === val && styles.valTextSelected]}>
                  {val}h
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 12 }]}>Sleep Quality</Text>
          <View style={styles.chipRow}>
            {(['Poor', 'Fair', 'Good', 'Excellent'] as const).map((q) => (
              <Pressable
                key={q}
                onPress={() => setSleepQuality(q)}
                style={[styles.chip, sleepQuality === q && styles.chipSelected]}
              >
                <Text style={[styles.chipText, sleepQuality === q && styles.chipTextSelected]}>
                  {q}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Physical Activity */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Activity size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Physical Activity</Text>
          </View>
          <Text style={styles.label}>Days per week of exercise/brisk walking: {activityDays} Days</Text>
          <View style={styles.stepRow}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((d) => (
              <Pressable
                key={d}
                onPress={() => setActivityDays(d)}
                style={[styles.valBtn, activityDays === d && styles.valBtnSelected]}
              >
                <Text style={[styles.valText, activityDays === d && styles.valTextSelected]}>
                  {d}d
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Screen Time & Study Routine */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Monitor size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Screen & Study Routine</Text>
          </View>

          <Text style={styles.label}>Daily Non-Academic Screen Time: {screenTimeHours} Hours</Text>
          <View style={styles.stepRow}>
            {[2, 4, 6, 8, 10].map((st) => (
              <Pressable
                key={st}
                onPress={() => setScreenTimeHours(st)}
                style={[styles.valBtn, screenTimeHours === st && styles.valBtnSelected]}
              >
                <Text style={[styles.valText, screenTimeHours === st && styles.valTextSelected]}>
                  {st}h
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 12 }]}>Study Break Frequency</Text>
          <View style={styles.chipRow}>
            {(['Rarely', 'Every 2 hours', 'Every 50 mins', 'Every 25 mins'] as const).map((b) => (
              <Pressable
                key={b}
                onPress={() => setBreakFreq(b)}
                style={[styles.chip, breakFreq === b && styles.chipSelected]}
              >
                <Text style={[styles.chipText, breakFreq === b && styles.chipTextSelected]}>
                  {b}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Social Support & Energy */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Zap size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>Energy & Social Support</Text>
          </View>

          <Text style={styles.label}>Typical Daily Energy Level</Text>
          <View style={styles.chipRow}>
            {(['Low', 'Medium', 'High'] as const).map((e) => (
              <Pressable
                key={e}
                onPress={() => setEnergyLevel(e)}
                style={[styles.chip, energyLevel === e && styles.chipSelected]}
              >
                <Text style={[styles.chipText, energyLevel === e && styles.chipTextSelected]}>
                  {e} Energy
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 12 }]}>How often do you talk to someone you trust?</Text>
          <View style={styles.chipRow}>
            {(['Rarely', '1-2 times/week', '3-4 times/week', 'Daily'] as const).map((s) => (
              <Pressable
                key={s}
                onPress={() => setSocialSupport(s)}
                style={[styles.chip, socialSupport === s && styles.chipSelected]}
              >
                <Text style={[styles.chipText, socialSupport === s && styles.chipTextSelected]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <PrimaryButton
          title="Continue to Student Scenarios"
          onPress={handleNext}
          style={styles.nextBtn}
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  stepRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  valBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  valBtnSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  valText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  valTextSelected: {
    color: Colors.textLight,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.textLight,
  },
  nextBtn: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
});
