export type StoryCategory =
  | 'Academic'
  | 'Career'
  | 'Failure'
  | 'Sports'
  | 'Entrepreneurship'
  | 'Personal Growth';

export interface StoryItem {
  id: string;
  title: string;
  category: StoryCategory;
  author: string;
  readTime: string;
  isVerifiedReal: boolean;
  shortDescription: string;
  fullStory: string;
  takeaway: string;
  imageUrl?: string;
}

export type BookCategory =
  | 'Stress'
  | 'Habits'
  | 'Productivity'
  | 'Confidence'
  | 'Emotional Wellbeing'
  | 'Mindset'
  | 'Career'
  | 'Relationships';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  rating: number;
  readTime: string;
  shortDescription: string;
  keyTakeaways: string[];
  coverGradient: string[];
}

export type MusicCategory = 'Piano' | 'Meditation' | 'Ambient' | 'Sleep';

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  category: MusicCategory;
  mood: string;
  durationSeconds: number;
  url: string;
}

export interface GameItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
  benefit: string;
  route: string;
}
