export type StressLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface ContributingFactor {
  id: string;
  category: 'Academic' | 'Career' | 'Sleep' | 'Social' | 'Family' | 'Lifestyle';
  title: string;
  impactScore: number; // 1 to 10
  description: string;
  iconName: string;
}

export interface StressPredictionResult {
  score: number; // 0 - 100
  level: StressLevel;
  levelLabel: string; // e.g. "Moderate Stress"
  summary: string;
  factors: ContributingFactor[];
  disclaimer: string;
  createdAt: string;
}
