export type MoodEmoji = '😞' | '😕' | '😐' | '🙂' | '😊';

export interface DailyCheckinData {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  mood: MoodEmoji;
  moodLabel: 'Sad' | 'Uncertain' | 'Neutral' | 'Good' | 'Great';
  stressLevel: number; // 1 to 10
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Great';
  academicPressure: number; // 1 to 5
  energyLevel: 'Low' | 'Medium' | 'High';
  didExercise: boolean;
  didConnectSocially: boolean;
  notes?: string;
  createdAt: string;
}

export interface CheckinInsight {
  headline: string;
  message: string;
  primaryFactor: string;
  recommendedActivityId?: string;
}
