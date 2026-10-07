import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { AppHeader } from '../../src/components/common/AppHeader';
import { GoalType } from '../../src/types/user';
import { useAuth } from '../../src/context/AuthContext';
import { Check } from 'lucide-react-native';

const GOAL_OPTIONS: GoalType[] = [
  'Reduce stress',
  'Improve sleep',
  'Study better',
  'Manage career pressure',
  'Build confidence',
  'Improve daily routine',
  'Feel more balanced',
];

export default function OnboardingProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || 'Mahak');
  const [ageGroup, setAgeGroup] = useState(user?.ageGroup || '18-21');
  const [college, setCollege] = useState(user?.college || 'National Institute of Technology');
  const [course, setCourse] = useState(user?.course || 'B.Tech Computer Science');
  const [year, setYear] = useState(user?.year || '3rd Year');
  const [selectedGoals, setSelectedGoals] = useState<GoalType[]>(user?.goals || ['Reduce stress', 'Manage career pressure']);

  const toggleGoal = (goal: GoalType) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = async () => {
    await updateUser({
      name,
      ageGroup,
      college,
      course,
      year,
      preferredLanguage: 'English',
      goals: selectedGoals,
    });
    router.push('/onboarding/personality');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Profile Setup" showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Let's get to know you</Text>
        <Text style={styles.sectionSubtitle}>
          MindMate uses this to tailor your wellness insights and academic context.
        </Text>

        {/* Name Input */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={Colors.textMuted}
          />
        </View>

        {/* College & Course */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>College / University</Text>
          <TextInput
            style={styles.input}
            value={college}
            onChangeText={setCollege}
            placeholder="e.g. National Institute of Technology"
            placeholderTextColor={Colors.textMuted}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Course / Field</Text>
            <TextInput
              style={styles.input}
              value={course}
              onChangeText={setCourse}
              placeholder="e.g. B.Tech CS"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
          <View style={[styles.fieldGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Academic Year</Text>
            <TextInput
              style={styles.input}
              value={year}
              onChangeText={setYear}
              placeholder="e.g. 3rd Year"
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </View>

        {/* Goals Selection */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>What are your main goals? (Select all that apply)</Text>
          <View style={styles.goalsWrap}>
            {GOAL_OPTIONS.map((goal) => {
              const isSelected = selectedGoals.includes(goal);
              return (
                <Pressable
                  key={goal}
                  onPress={() => toggleGoal(goal)}
                  style={[styles.goalChip, isSelected && styles.selectedGoalChip]}
                >
                  {isSelected && <Check size={14} color={Colors.textLight} style={{ marginRight: 4 }} />}
                  <Text style={[styles.goalText, isSelected && styles.selectedGoalText]}>
                    {goal}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <PrimaryButton title="Continue to Assessment" onPress={handleNext} style={styles.nextBtn} />
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
  fieldGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
  },
  goalsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedGoalChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  goalText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectedGoalText: {
    color: Colors.textLight,
  },
  nextBtn: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
});
