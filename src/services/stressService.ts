import AsyncStorage from '@react-native-async-storage/async-storage';
import { StressPredictionResult } from '../types/stress';
import { mockPredictStress } from '../utils/mockPrediction';
import { assessmentService } from './assessmentService';

const STRESS_RESULT_KEY = '@mindmate_stress_result';

export const stressService = {
  async predictStressScore(): Promise<StressPredictionResult> {
    const personality = await assessmentService.getPersonalityResponses();
    const lifestyle = await assessmentService.getLifestyleData();
    const situations = await assessmentService.getSituationResponses();

    const result = mockPredictStress(personality, lifestyle || undefined, situations);
    await AsyncStorage.setItem(STRESS_RESULT_KEY, JSON.stringify(result));
    return result;
  },

  async getLatestStressResult(): Promise<StressPredictionResult> {
    const stored = await AsyncStorage.getItem(STRESS_RESULT_KEY);
    if (stored) return JSON.parse(stored);
    return this.predictStressScore();
  },
};
