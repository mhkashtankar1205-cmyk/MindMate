import { StressPredictionResult, ContributingFactor } from '../types/stress';
import { PersonalityResponse, LifestyleData, SituationResponse } from '../types/assessment';

/**
 * Mock Frontend Stress Prediction Function
 * 
 * IMPORTANT: This function acts as a client-side placeholder for future ML API endpoints:
 * POST /api/stress/predict
 */
export function mockPredictStress(
  personality?: PersonalityResponse[],
  lifestyle?: LifestyleData,
  situations?: SituationResponse[]
): StressPredictionResult {
  let score = 50; // baseline

  // 1. Calculate impact from Personality (Emotional Reactivity & Conscientiousness)
  if (personality && personality.length > 0) {
    const emotScore = personality
      .filter((p) => [1, 6, 11, 15].includes(p.questionId))
      .reduce((acc, curr) => acc + curr.score, 0);
    const avgEmot = emotScore / 4; // 1 to 5
    score += (avgEmot - 3) * 6;
  }

  // 2. Calculate impact from Lifestyle
  if (lifestyle) {
    // Sleep hours (< 6 hours increases stress)
    if (lifestyle.sleepHours < 6) score += 12;
    else if (lifestyle.sleepHours >= 7.5) score -= 8;

    // Physical activity (< 2 days increases stress)
    if (lifestyle.physicalActivityDays < 2) score += 6;
    else if (lifestyle.physicalActivityDays >= 4) score -= 6;

    // Screen time (> 7 hours)
    if (lifestyle.screenTimeHours > 7) score += 8;

    // Energy level
    if (lifestyle.energyLevel === 'Low') score += 7;
    else if (lifestyle.energyLevel === 'High') score -= 5;
  }

  // 3. Calculate impact from Situation questions
  if (situations && situations.length > 0) {
    const sitAvg = situations.reduce((acc, s) => acc + s.stressWeight, 0) / situations.length;
    score += (sitAvg - 2.5) * 8;
  }

  // Clamp score between 15 and 95
  score = Math.max(15, Math.min(95, Math.round(score)));

  let level: 'LOW' | 'MODERATE' | 'HIGH' = 'MODERATE';
  let levelLabel = 'Moderate Stress';
  let summary = 'Your recent responses suggest you may be experiencing some pressure related to college academics and lifestyle routines.';

  if (score < 40) {
    level = 'LOW';
    levelLabel = 'Low Stress';
    summary = 'Your responses indicate a stable, balanced routine with manageable stress levels. Keep prioritizing your self-care routines!';
  } else if (score >= 70) {
    level = 'HIGH';
    levelLabel = 'High Stress';
    summary = 'Your responses indicate significant stress and elevated pressure across multiple areas. Consider connecting with a counselor or trying calming activities.';
  }

  const factors: ContributingFactor[] = [
    {
      id: 'f_1',
      category: 'Academic',
      title: 'Academic Workload & Deadlines',
      impactScore: score > 60 ? 8 : 5,
      description: 'Upcoming semester exams and project submissions.',
      iconName: 'book-open',
    },
    {
      id: 'f_2',
      category: 'Sleep',
      title: 'Rest & Sleep Quality',
      impactScore: lifestyle && lifestyle.sleepHours < 6.5 ? 7 : 4,
      description: 'Sleep duration and nighttime screen exposure.',
      iconName: 'moon',
    },
    {
      id: 'f_3',
      category: 'Career',
      title: 'Career & Placement Uncertainty',
      impactScore: 6,
      description: 'Campus placement preparation and peer comparison.',
      iconName: 'briefcase',
    },
  ];

  return {
    score,
    level,
    levelLabel,
    summary,
    factors,
    disclaimer: 'MindMate is a wellness self-awareness tool, not a medical diagnostic system. If you feel overwhelmed, consider speaking with a qualified counselor.',
    createdAt: new Date().toISOString(),
  };
}
