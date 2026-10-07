export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  suggestedAction?: {
    label: string;
    route: string;
  };
}

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'assistant',
    text: 'Hi Mahak 👋 I\'m your MindMate AI Assistant. I\'m here to listen and help you organize your thoughts during busy college days.\n\nHow can I support you right now?',
    timestamp: '10:00 AM',
    quickReplies: [
      'Placements & Resume',
      'Exam Stress',
      'Sleep & Fatigue',
      'Relationships',
      'Just need to vent',
    ],
  },
];

export const mockAssistantResponses: Record<string, ChatMessage> = {
  'Placements & Resume': {
    id: 'resp_placements',
    sender: 'assistant',
    text: 'Placement pressure can feel really heavy, especially when it feels like everyone around is getting offers. Remember that recruitment cycles move at different paces.\n\nWould you like to try a 5-minute breathing reset or break down your preparation into a focused 25-minute study sprint?',
    timestamp: 'Just now',
    quickReplies: ['Start 5-Min Breathing', '25-Min Focus Sprint', 'Tell me more advice'],
    suggestedAction: {
      label: '5-Minute Breathing Reset',
      route: '/relax/breathing',
    },
  },
  'Exam Stress': {
    id: 'resp_exams',
    sender: 'assistant',
    text: 'It is completely natural to feel anxious when exams approach. When the syllabus looks huge, your brain tends to freeze.\n\nLet\'s take a step back: what is ONE small 15-minute topic you can tackle right now?',
    timestamp: 'Just now',
    quickReplies: ['Start Focus Timer', 'Try Grounding Exercise', 'Review study habits'],
    suggestedAction: {
      label: 'Start Focus Challenge',
      route: '/relax/games/focus',
    },
  },
  'Sleep & Fatigue': {
    id: 'resp_sleep',
    sender: 'assistant',
    text: 'Sleep deprivation directly increases cortisol and makes academic tasks feel twice as hard.\n\nHave you tried taking a 10-minute evening wind-down meditation or setting a screen-free boundary before bed?',
    timestamp: 'Just now',
    quickReplies: ['Evening Wind-down', 'Sleep Habits Book', 'Other topics'],
    suggestedAction: {
      label: 'Evening Sleep Wind-down',
      route: '/relax/meditation',
    },
  },
  'Relationships': {
    id: 'resp_rel',
    sender: 'assistant',
    text: 'Navigating peer dynamics, group project friction, or family expectations alongside studies takes emotional energy.\n\nWriting your feelings down or taking a short walk can give you space to gain perspective.',
    timestamp: 'Just now',
    quickReplies: ['Try Gratitude Garden', 'Read Real Stories', 'Talk to someone'],
  },
  'Just need to vent': {
    id: 'resp_vent',
    sender: 'assistant',
    text: 'I\'m here and listening. Take all the space you need. What is currently weighing most on your mind today?',
    timestamp: 'Just now',
    quickReplies: ['I feel overwhelmed', 'I feel behind in studies', 'I feel lonely'],
  },
};
