import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SituationQuestion } from '../../types/assessment';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';
import { BookOpen, Briefcase, Users, Home, DollarSign, Heart } from 'lucide-react-native';

interface ScenarioCardProps {
  question: SituationQuestion;
  selectedIndex?: number;
  onSelectOption: (index: number, stressWeight: number) => void;
  scenarioIndex: number;
  totalScenarios: number;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Academic': return <BookOpen size={18} color={Colors.primary} />;
    case 'Career': return <Briefcase size={18} color={Colors.primary} />;
    case 'Social': return <Users size={18} color={Colors.primary} />;
    case 'Family': return <Home size={18} color={Colors.primary} />;
    case 'Financial': return <DollarSign size={18} color={Colors.primary} />;
    default: return <Heart size={18} color={Colors.primary} />;
  }
};

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  question,
  selectedIndex,
  onSelectOption,
  scenarioIndex,
  totalScenarios,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.categoryBadge}>
          {getCategoryIcon(question.category)}
          <Text style={styles.categoryText}>{question.category} Situation</Text>
        </View>
        <Text style={styles.progressText}>{scenarioIndex} of {totalScenarios}</Text>
      </View>

      <Text style={styles.scenarioBox}>
        "{question.scenario}"
      </Text>

      <Text style={styles.questionTitle}>{question.question}</Text>

      <View style={styles.optionsList}>
        {question.options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <Pressable
              key={idx}
              onPress={() => onSelectOption(idx, opt.stressWeight)}
              style={({ pressed }) => [
                styles.optionItem,
                isSelected && styles.selectedOption,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.bullet, isSelected && styles.selectedBullet]} />
              <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                {opt.label}
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginLeft: 6,
  },
  progressText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  scenarioBox: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textPrimary,
    fontWeight: '600',
    backgroundColor: Colors.cardSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    fontStyle: 'italic',
  },
  questionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  optionsList: {
    gap: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  selectedOption: {
    backgroundColor: Colors.lightOrange,
    borderColor: Colors.primary,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
    marginRight: Spacing.md,
  },
  selectedBullet: {
    backgroundColor: Colors.primary,
    transform: [{ scale: 1.2 }],
  },
  optionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
