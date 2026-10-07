export type RecommendationCategory =
  | 'Stress Relief'
  | 'Study'
  | 'Sleep'
  | 'Exercise'
  | 'Nutrition'
  | 'Mindset'
  | 'Career'
  | 'Social Wellbeing';

export interface RecommendationItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: RecommendationCategory;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  whyRecommended: string;
  iconName: string;
  actionType: 'breathing' | 'meditation' | 'focus' | 'grounding' | 'game' | 'article' | 'external';
  actionRoute?: string;
}
