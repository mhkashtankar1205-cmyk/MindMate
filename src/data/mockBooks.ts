import { BookItem } from '../types/content';

export const mockBooks: BookItem[] = [
  {
    id: 'book_1',
    title: 'Atomic Habits for Students',
    author: 'James Clear (Adapted Insights)',
    category: 'Habits',
    rating: 4.9,
    readTime: '12 min summary',
    shortDescription: 'How tiny 1% daily changes build unstoppable academic momentum without burnout.',
    keyTakeaways: [
      'Focus on systems, not just goals. Build a daily study trigger environment.',
      'Use habit stacking: link a new study habit to an existing daily routine (e.g. coffee).',
      'Make habits easy: reduce friction for good habits, increase friction for distractions.',
    ],
    coverGradient: ['#E95D2F', '#C94A24'],
  },
  {
    id: 'book_2',
    title: 'Deep Work in the Age of Distraction',
    author: 'Cal Newport',
    category: 'Productivity',
    rating: 4.8,
    readTime: '15 min summary',
    shortDescription: 'Rules for focused success in a noisy world of endless social media and notifications.',
    keyTakeaways: [
      'Deep work is the ability to focus without distraction on a cognitively demanding task.',
      'Batch shallow work like checking messages to fixed 15-minute windows.',
      'Embrace boredom: train your mind to resist constant novelty stimulation.',
    ],
    coverGradient: ['#4F46E5', '#3730A3'],
  },
  {
    id: 'book_3',
    title: 'The Anxiety & Worry Workbook',
    author: 'David A. Clark & Aaron T. Beck',
    category: 'Stress',
    rating: 4.7,
    readTime: '10 min summary',
    shortDescription: 'Cognitive behavioral strategies to manage academic worry and test anxiety.',
    keyTakeaways: [
      'Distinguish between actionable problems and unhelpful catastrophic catastrophizing.',
      'Challenge irrational thoughts with evidence-based questioning.',
      'Practice gradual exposure to anxiety-provoking student scenarios.',
    ],
    coverGradient: ['#059669', '#047857'],
  },
  {
    id: 'book_4',
    title: 'Mindset: The New Psychology of Success',
    author: 'Carol S. Dweck',
    category: 'Mindset',
    rating: 4.9,
    readTime: '14 min summary',
    shortDescription: 'How believing you can develop your abilities changes academic performance.',
    keyTakeaways: [
      'A fixed mindset views intelligence as static; a growth mindset sees effort as the path to mastery.',
      'Add the word "YET" when evaluating difficult concepts (e.g. "I don\'t understand this... yet").',
      'Praise process and effort over innate talent.',
    ],
    coverGradient: ['#D97706', '#B45309'],
  },
];
