export type BigFiveDimension =
  | 'Openness'
  | 'Conscientiousness'
  | 'Extraversion'
  | 'Agreeableness'
  | 'Emotional Reactivity';

export interface PersonalityQuestion {
  id: number;
  question: string;
  dimension: BigFiveDimension;
  category: string;
}

export interface PersonalityResponse {
  questionId: number;
  score: number; // 1 to 5
}

export interface PersonalitySummary {
  dimensions: Record<BigFiveDimension, number>; // 0 to 100
  traits: string[];
  summaryText: string;
}

export interface LifestyleData {
  sleepHours: number;
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  physicalActivityDays: number;
  screenTimeHours: number;
  studyHours: number;
  breakFrequency: 'Rarely' | 'Every 2 hours' | 'Every 50 mins' | 'Every 25 mins';
  mealRegularity: 'Irregular' | 'Moderate' | 'Regular';
  waterIntakeGlasses: number;
  socialSupportFrequency: 'Rarely' | '1-2 times/week' | '3-4 times/week' | 'Daily';
  overallMood: number; // 1-5
  energyLevel: 'Low' | 'Medium' | 'High';
}

export interface SituationQuestion {
  id: string;
  category: 'Academic' | 'Career' | 'Social' | 'Family' | 'Financial' | 'Relationship';
  scenario: string;
  question: string;
  options: {
    label: string;
    stressWeight: number; // 1 (low stress response) to 5 (high stress response)
  }[];
}

export interface SituationResponse {
  situationId: string;
  selectedOptionIndex: number;
  stressWeight: number;
}
