export interface ProgressSummary {
  currentStressScore: number;
  stressLevel: 'LOW' | 'MODERATE' | 'HIGH';
  checkinStreakDays: number;
  averageSleepHours: number;
  weeklyActivityDays: number;
  weeklyChangePercent: number; // e.g. -12% stress
  insights: string[];
  weeklyTrend: { day: string; score: number }[];
  sleepTrend: { day: string; hours: number }[];
  moodTrend: { day: string; moodScore: number }[];
}

export const mockProgressData: ProgressSummary = {
  currentStressScore: 64,
  stressLevel: 'MODERATE',
  checkinStreakDays: 4,
  averageSleepHours: 6.8,
  weeklyActivityDays: 4,
  weeklyChangePercent: -12,
  insights: [
    'Your stress has decreased by 12% compared to last week.',
    'You\'ve maintained a 4-day check-in streak!',
    'Higher sleep quality correlates with lower reported academic anxiety.',
    'Breathing resets have helped bring down your post-study stress spikes.',
  ],
  weeklyTrend: [
    { day: 'Mon', score: 72 },
    { day: 'Tue', score: 68 },
    { day: 'Wed', score: 70 },
    { day: 'Thu', score: 65 },
    { day: 'Fri', score: 64 },
    { day: 'Sat', score: 55 },
    { day: 'Sun', score: 50 },
  ],
  sleepTrend: [
    { day: 'Mon', hours: 5.5 },
    { day: 'Tue', hours: 6.0 },
    { day: 'Wed', hours: 6.5 },
    { day: 'Thu', hours: 7.0 },
    { day: 'Fri', hours: 6.8 },
    { day: 'Sat', hours: 8.0 },
    { day: 'Sun', hours: 7.5 },
  ],
  moodTrend: [
    { day: 'Mon', moodScore: 2 },
    { day: 'Tue', moodScore: 3 },
    { day: 'Wed', moodScore: 3 },
    { day: 'Thu', moodScore: 4 },
    { day: 'Fri', moodScore: 4 },
    { day: 'Sat', moodScore: 5 },
    { day: 'Sun', moodScore: 4 },
  ],
};
