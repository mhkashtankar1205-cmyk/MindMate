import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types/user';
import { initialMockUser } from '../data/mockUser';

const USER_STORAGE_KEY = '@mindmate_user_profile';

export const authService = {
  async getUserProfile(): Promise<UserProfile> {
    try {
      const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Save initial mock user if none exists
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(initialMockUser));
      return initialMockUser;
    } catch {
      return initialMockUser;
    }
  },

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const current = await this.getUserProfile();
    const updated = { ...current, ...updates };
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  async completeOnboarding(): Promise<UserProfile> {
    return this.updateUserProfile({ isOnboardingCompleted: true });
  },

  async continueAsGuest(): Promise<UserProfile> {
    return this.updateUserProfile({ isGuest: true, isOnboardingCompleted: true });
  },
};
