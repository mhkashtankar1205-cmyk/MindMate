import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { ScenarioCard } from '../../src/components/assessment/ScenarioCard';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { SituationQuestion, SituationResponse } from '../../src/types/assessment';
import { assessmentService } from '../../src/services/assessmentService';

export default function OnboardingSituationsScreen() {
  const router = useRouter();
  const [scenarios, setScenarios] = useState<SituationQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, { index: number; weight: number }>>({});

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    const list = await assessmentService.getSituationQuestions();
    setScenarios(list);
  };

  if (scenarios.length === 0) return null;

  const currentScenario = scenarios[currentIndex];
  const progressPercent = ((currentIndex + 1) / scenarios.length) * 100;
  const currentResp = responses[currentScenario.id];

  const handleSelectOption = (index: number, stressWeight: number) => {
    setResponses({
      ...responses,
      [currentScenario.id]: { index, weight: stressWeight },
    });
  };

  const handleNext = async () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const formatted: SituationResponse[] = Object.entries(responses).map(([sitId, val]) => ({
        situationId: sitId,
        selectedOptionIndex: val.index,
        stressWeight: val.weight,
      }));
      await assessmentService.saveSituationResponses(formatted);
      router.push('/onboarding/summary');
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
      <AppHeader title="Student Life Situations" showBack onBackPress={handleBack} />

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <ScenarioCard
          question={currentScenario}
          selectedIndex={currentResp?.index}
          onSelectOption={handleSelectOption}
          scenarioIndex={currentIndex + 1}
          totalScenarios={scenarios.length}
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
            title={currentIndex === scenarios.length - 1 ? "Complete Assessment" : "Next Scenario"}
            onPress={handleNext}
            disabled={!currentResp}
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
