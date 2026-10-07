import { UserProfile, NotificationSettings } from '../types/user';

export const initialMockUser: UserProfile = {
  id: 'usr_mahak_01',
  name: 'Mahak',
  ageGroup: '18-21',
  college: 'National Institute of Technology',
  course: 'B.Tech Computer Science',
  year: '3rd Year',
  preferredLanguage: 'English',
  goals: ['Reduce stress', 'Manage career pressure', 'Improve sleep', 'Study better'],
  isOnboardingCompleted: false,
  isGuest: false,
  createdAt: '2026-10-01T00:00:00Z',
};

export const initialNotificationSettings: NotificationSettings = {
  dailyCheckin: true,
  checkinTime: '20:00',
  sleepReminder: true,
  sleepTime: '22:30',
  hydrationReminder: true,
  focusReminder: false,
  weeklyProgress: true,
};
