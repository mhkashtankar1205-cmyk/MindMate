import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PersonalityQuestion as PersonalityQuestionType } from '../../types/assessment';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';

interface PersonalityQuestionProps {
  question: PersonalityQuestionType;
  currentValue?: number;
  onSelect: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const SCALE_LABELS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export const PersonalityQuestionCard: React.FC<PersonalityQuestionProps> = ({
  question,
  currentValue,
  onSelect,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.categoryBadge}>{question.category}</Text>
        <Text style={styles.progressText}>Question {questionNumber} of {totalQuestions}</Text>
      </View>

      <Text style={styles.questionText}>"{question.question}"</Text>

      <View style={styles.scaleContainer}>
        {SCALE_LABELS.map((item) => {
          const isSelected = currentValue === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => onSelect(item.value)}
              style={({ pressed }) => [
                styles.optionBtn,
                isSelected && styles.selectedBtn,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.radioDot, isSelected && styles.selectedRadioDot]}>
                <Text style={[styles.valueNum, isSelected && styles.selectedValueNum]}>
                  {item.value}
                </Text>
              </View>
              <Text style={[styles.label, isSelected && styles.selectedLabel]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    textTransform: 'uppercase',
  },
  progressText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: Spacing.lg,
  },
  scaleContainer: {
    gap: 8,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  selectedBtn: {
    backgroundColor: Colors.lightOrange,
    borderColor: Colors.primary,
  },
  radioDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedRadioDot: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  valueNum: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  selectedValueNum: {
    color: Colors.textLight,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectedLabel: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
