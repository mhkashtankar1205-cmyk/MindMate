import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { MoodEmoji, CheckinInsight } from '../../src/types/checkin';
import { useWellness } from '../../src/context/WellnessContext';
import { Sparkles, CheckCircle2, ArrowRight, Heart } from 'lucide-react-native';

const MOODS: { emoji: MoodEmoji; label: 'Sad' | 'Uncertain' | 'Neutral' | 'Good' | 'Great' }[] = [
  { emoji: '😞', label: 'Sad' },
  { emoji: '😕', label: 'Uncertain' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😊', label: 'Great' },
];

export default function DailyCheckinScreen() {
  const router = useRouter();
  const { addCheckin } = useWellness();

  const [selectedMood, setSelectedMood] = useState<MoodEmoji>('😐');
  const [selectedMoodLabel, setSelectedMoodLabel] = useState<'Sad' | 'Uncertain' | 'Neutral' | 'Good' | 'Great'>('Neutral');
  const [stressLevel, setStressLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState<'Poor' | 'Fair' | 'Good' | 'Great'>('Fair');
  const [academicPressure, setAcademicPressure] = useState(3);
  const [energyLevel, setEnergyLevel] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [didExercise, setDidExercise] = useState(true);
  const [didConnectSocially, setDidConnectSocially] = useState(true);
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInsight, setSubmittedInsight] = useState<CheckinInsight | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const insight = await addCheckin({
        date: new Date().toISOString().split('T')[0],
        mood: selectedMood,
        moodLabel: selectedMoodLabel,
        stressLevel,
        sleepQuality,
        academicPressure,
        energyLevel,
        didExercise,
        didConnectSocially,
        notes: notes.trim(),
      });
      setSubmittedInsight(insight);
    } catch {
      // error handled
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedInsight(null);
    setNotes('');
  };

  if (submittedInsight) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader title="Check-in Complete" />
        <ScrollView contentContainerStyle={styles.insightContainer}>
          <View style={styles.insightSuccessCard}>
            <View style={styles.insightIconBadge}>
              <CheckCircle2 size={40} color={Colors.success} />
            </View>

            <Text style={styles.insightHeadline}>{submittedInsight.headline}</Text>
            <Text style={styles.insightMessage}>{submittedInsight.message}</Text>

            <View style={styles.factorTag}>
              <Text style={styles.factorTagText}>Primary Factor: {submittedInsight.primaryFactor}</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.recPromptText}>We recommend trying this 5-minute activity right now:</Text>

            <PrimaryButton
              title="Start Recommended Activity"
              onPress={() => router.push('/relax/breathing')}
              icon={<Sparkles size={18} color={Colors.textLight} />}
              style={styles.actionBtn}
            />

            <Pressable onPress={handleReset} style={styles.secondaryResetBtn}>
              <Text style={styles.resetText}>Log Another Entry</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="30-Second Daily Check-in" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Mood Selection */}
        <Text style={styles.sectionQuestion}>How are you feeling today?</Text>
        <View style={styles.moodRow}>
          {MOODS.map((item) => {
            const isSelected = selectedMood === item.emoji;
            return (
              <Pressable
                key={item.emoji}
                onPress={() => {
                  setSelectedMood(item.emoji);
                  setSelectedMoodLabel(item.label);
                }}
                style={[styles.moodItem, isSelected && styles.selectedMoodItem]}
              >
                <Text style={styles.moodEmoji}>{item.emoji}</Text>
                <Text style={[styles.moodLabel, isSelected && styles.selectedMoodLabel]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Stress Level 1-10 */}
        <View style={styles.card}>
          <Text style={styles.cardQuestion}>How stressful does today feel? ({stressLevel} / 10)</Text>
          <View style={styles.scaleRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isSel = stressLevel === num;
              return (
                <Pressable
                  key={num}
                  onPress={() => setStressLevel(num)}
                  style={[styles.numTile, isSel && styles.selectedNumTile]}
                >
                  <Text style={[styles.numText, isSel && styles.selectedNumText]}>{num}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Sleep & Academic Pressure */}
        <View style={styles.card}>
          <Text style={styles.cardQuestion}>How did you sleep last night?</Text>
          <View style={styles.chipRow}>
            {(['Poor', 'Fair', 'Good', 'Great'] as const).map((q) => (
              <Pressable
                key={q}
                onPress={() => setSleepQuality(q)}
                style={[styles.chip, sleepQuality === q && styles.selectedChip]}
              >
                <Text style={[styles.chipText, sleepQuality === q && styles.selectedChipText]}>
                  {q}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.cardQuestion, { marginTop: 14 }]}>Academic Pressure Level</Text>
          <View style={styles.scaleRow}>
            {[1, 2, 3, 4, 5].map((level) => (
              <Pressable
                key={level}
                onPress={() => setAcademicPressure(level)}
                style={[styles.numTile, academicPressure === level && styles.selectedNumTile, { flex: 1 }]}
              >
                <Text style={[styles.numText, academicPressure === level && styles.selectedNumText]}>
                  Lvl {level}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Energy & Movement */}
        <View style={styles.card}>
          <Text style={styles.cardQuestion}>Energy Level & Habits Today</Text>
          <View style={styles.chipRow}>
            {(['Low', 'Medium', 'High'] as const).map((e) => (
              <Pressable
                key={e}
                onPress={() => setEnergyLevel(e)}
                style={[styles.chip, energyLevel === e && styles.selectedChip]}
              >
                <Text style={[styles.chipText, energyLevel === e && styles.selectedChipText]}>
                  {e} Energy
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Did you exercise/walk today?</Text>
            <Pressable
              onPress={() => setDidExercise(!didExercise)}
              style={[styles.toggleBtn, didExercise && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleBtnText, didExercise && styles.toggleBtnTextActive]}>
                {didExercise ? 'Yes' : 'No'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Connected with a friend/family?</Text>
            <Pressable
              onPress={() => setDidConnectSocially(!didConnectSocially)}
              style={[styles.toggleBtn, didConnectSocially && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleBtnText, didConnectSocially && styles.toggleBtnTextActive]}>
                {didConnectSocially ? 'Yes' : 'No'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Free text note */}
        <View style={styles.card}>
          <Text style={styles.cardQuestion}>What's bothering or on your mind today?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Write anything that's on your mind... (e.g. recursion lab, placement test)"
            placeholderTextColor={Colors.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        <PrimaryButton
          title="Save Check-in"
          onPress={handleSubmit}
          loading={isSubmitting}
          style={styles.submitBtn}
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
  sectionQuestion: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  moodItem: {
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    flex: 1,
    marginHorizontal: 3,
  },
  selectedMoodItem: {
    backgroundColor: Colors.lightOrange,
    borderColor: Colors.primary,
  },
  moodEmoji: {
    fontSize: 30,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 4,
  },
  selectedMoodLabel: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardQuestion: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  scaleRow: {
    flexDirection: 'row',
    gap: 4,
  },
  numTile: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedNumTile: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  numText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  selectedNumText: {
    color: Colors.textLight,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectedChipText: {
    color: Colors.textLight,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm + 4,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toggleBtnActive: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  toggleBtnTextActive: {
    color: Colors.success,
  },
  textInput: {
    backgroundColor: Colors.cardSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 14,
    color: Colors.textPrimary,
    minHeight: 70,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  submitBtn: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  insightContainer: {
    padding: Spacing.lg,
    flexGrow: 1,
    justifyContent: 'center',
  },
  insightSuccessCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  insightIconBadge: {
    marginBottom: Spacing.md,
  },
  insightHeadline: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  insightMessage: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  factorTag: {
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  factorTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    width: '100%',
    marginVertical: Spacing.md,
  },
  recPromptText: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
  secondaryResetBtn: {
    marginTop: Spacing.md,
    padding: 8,
  },
  resetText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
