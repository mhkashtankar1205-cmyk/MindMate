import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyCheckinData, CheckinInsight } from '../types/checkin';
import { initialMockCheckins } from '../data/mockCheckins';

const CHECKINS_KEY = '@mindmate_daily_checkins';

export const checkinService = {
  async getCheckins(): Promise<DailyCheckinData[]> {
    try {
      const stored = await AsyncStorage.getItem(CHECKINS_KEY);
      if (stored) return JSON.parse(stored);
      await AsyncStorage.setItem(CHECKINS_KEY, JSON.stringify(initialMockCheckins));
      return initialMockCheckins;
    } catch {
      return initialMockCheckins;
    }
  },

  async saveCheckin(entry: Omit<DailyCheckinData, 'id' | 'createdAt'>): Promise<{ checkin: DailyCheckinData; insight: CheckinInsight }> {
    const list = await this.getCheckins();
    const newCheckin: DailyCheckinData = {
      ...entry,
      id: `chk_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newCheckin, ...list];
    await AsyncStorage.setItem(CHECKINS_KEY, JSON.stringify(updated));

    // Generate quick mock insight after check-in
    let insightMessage = 'Your check-in has been logged. Maintaining daily awareness is a great step!';
    let primaryFactor = 'General Wellbeing';
    let recommendedActivityId = 'rec_1';

    if (entry.stressLevel >= 7) {
      insightMessage = 'Your stress level is reported higher today, mainly influenced by academic pressure. Consider taking a 5-minute breathing break.';
      primaryFactor = 'Academic Pressure';
      recommendedActivityId = 'rec_1';
    } else if (entry.sleepQuality === 'Poor') {
      insightMessage = 'Poor sleep seems to be affecting your energy today. Try an evening relaxation wind-down routine tonight.';
      primaryFactor = 'Sleep Quality';
      recommendedActivityId = 'rec_4';
    } else if (entry.stressLevel <= 4) {
      insightMessage = 'You are feeling balanced and energetic today! A great day to maintain your positive habits.';
      primaryFactor = 'Positive Balance';
      recommendedActivityId = 'rec_5';
    }

    return {
      checkin: newCheckin,
      insight: {
        headline: 'Thanks for checking in today!',
        message: insightMessage,
        primaryFactor,
        recommendedActivityId,
      },
    };
  },
};
