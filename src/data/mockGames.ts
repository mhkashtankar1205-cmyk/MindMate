import { GameItem } from '../types/content';

export const mockGames: GameItem[] = [
  {
    id: 'game_memory',
    title: 'Memory Match',
    description: 'Flip and match calm wellness cards to test memory and quiet racing thoughts.',
    iconName: 'grid',
    category: 'Cognitive Calm',
    benefit: 'Enhances working memory while grounding attention.',
    route: '/relax/games/memory',
  },
  {
    id: 'game_calm_tap',
    title: 'Calm Tap',
    description: 'Rhythmically tap expanding soft circles to slow down elevated heart rate.',
    iconName: 'sparkles',
    category: 'Sensory Reset',
    benefit: 'Directly lowers acute stress spikes and exam jitters.',
    route: '/relax/games/calm-tap',
  },
  {
    id: 'game_focus',
    title: 'Focus Challenge',
    description: 'Hold a steady breath tap to train calm impulse control and concentration.',
    iconName: 'target',
    category: 'Mindfulness',
    benefit: 'Strengthens focus before deep study sessions.',
    route: '/relax/games/focus',
  },
  {
    id: 'game_gratitude',
    title: 'Gratitude Garden',
    description: 'Plant daily positive notes and watch your personal stress-relief garden flourish.',
    iconName: 'flower-2',
    category: 'Positivity',
    benefit: 'Fosters emotional resilience and self-appreciation.',
    route: '/relax/games/gratitude',
  },
];
