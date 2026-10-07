import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PersonalityQuestionCard } from '../../src/components/assessment/PersonalityQuestion';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { PersonalityQuestion, PersonalityResponse } from '../../src/types/assessment';
import { assessmentService } from '../../src/services/assessmentService';

export default function OnboardingPersonalityScreen() {
  const router = useRouter();
  const [questions, setQuestions] = useState<PersonalityQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const list = await assessmentService.getPersonalityQuestions();
    setQuestions(list);
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const currentScore = responses[currentQ.id];

  const handleSelectScore = (score: number) => {
    setResponses({ ...responses, [currentQ.id]: score });
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Save all personality responses
      const formatted: PersonalityResponse[] = Object.entries(responses).map(([qId, score]) => ({
        questionId: Number(qId),
        score,
      }));
      await assessmentService.savePersonalityResponses(formatted);
      router.push('/onboarding/lifestyle');
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Personality Assessment" showBack onBackPress={handleBack} />

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <PersonalityQuestionCard
          question={currentQ}
          currentValue={currentScore}
          onSelect={handleSelectScore}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
        />

        <View style={styles.btnRow}>
          {currentIndex > 0 && (
            <SecondaryButton
              title="Back"
              onPress={handleBack}
              style={{ flex: 1, marginRight: 8 }}
            />
          )}
          <PrimaryButton
            title={currentIndex === questions.length - 1 ? "Save & Next" : "Next Question"}
            onPress={handleNext}
            disabled={!currentScore}
            style={{ flex: 2, marginLeft: currentIndex > 0 ? 8 : 0 }}
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
  progressTrack: {
    height: 4,
    backgroundColor: Colors.borderLight,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  container: {
    padding: Spacing.lg,
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
});
