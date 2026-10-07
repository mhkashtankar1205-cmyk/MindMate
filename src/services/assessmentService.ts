import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersonalityQuestion, PersonalityResponse, LifestyleData, SituationQuestion, SituationResponse } from '../types/assessment';
import { mockPersonalityQuestions, mockSituationQuestions } from '../data/mockAssessments';

const PERSONALITY_RESPONSES_KEY = '@mindmate_personality_resp';
const LIFESTYLE_KEY = '@mindmate_lifestyle';
const SITUATIONS_KEY = '@mindmate_situations_resp';

export const assessmentService = {
  async getPersonalityQuestions(): Promise<PersonalityQuestion[]> {
    return mockPersonalityQuestions;
  },

  async savePersonalityResponses(responses: PersonalityResponse[]): Promise<void> {
    await AsyncStorage.setItem(PERSONALITY_RESPONSES_KEY, JSON.stringify(responses));
  },

  async getPersonalityResponses(): Promise<PersonalityResponse[]> {
    const stored = await AsyncStorage.getItem(PERSONALITY_RESPONSES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async saveLifestyleData(data: LifestyleData): Promise<void> {
    await AsyncStorage.setItem(LIFESTYLE_KEY, JSON.stringify(data));
  },

  async getLifestyleData(): Promise<LifestyleData | null> {
    const stored = await AsyncStorage.getItem(LIFESTYLE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  async getSituationQuestions(): Promise<SituationQuestion[]> {
    return mockSituationQuestions;
  },

  async saveSituationResponses(responses: SituationResponse[]): Promise<void> {
    await AsyncStorage.setItem(SITUATIONS_KEY, JSON.stringify(responses));
  },

  async getSituationResponses(): Promise<SituationResponse[]> {
    const stored = await AsyncStorage.getItem(SITUATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  },
};
