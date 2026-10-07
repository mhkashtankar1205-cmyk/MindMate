export type GoalType =
  | 'Reduce stress'
  | 'Improve sleep'
  | 'Study better'
  | 'Manage career pressure'
  | 'Build confidence'
  | 'Improve daily routine'
  | 'Feel more balanced';

export type LanguageType = 'English';

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  ageGroup: string;
  college: string;
  course: string;
  year: string;
  preferredLanguage: LanguageType;
  goals: GoalType[];
  isOnboardingCompleted: boolean;
  isGuest: boolean;
  createdAt: string;
}

export interface NotificationSettings {
  dailyCheckin: boolean;
  checkinTime: string;
  sleepReminder: boolean;
  sleepTime: string;
  hydrationReminder: boolean;
  focusReminder: boolean;
  weeklyProgress: boolean;
}
