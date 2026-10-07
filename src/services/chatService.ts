import { ChatMessage, initialChatMessages, mockAssistantResponses } from '../data/mockChat';

export const chatService = {
  async getInitialMessages(): Promise<ChatMessage[]> {
    return initialChatMessages;
  },

  async sendMessage(userText: string): Promise<ChatMessage> {
    // Simulate short network delay for natural feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Check if match in predefined topics
    const matchedKey = Object.keys(mockAssistantResponses).find((key) =>
      userText.toLowerCase().includes(key.toLowerCase())
    );

    if (matchedKey && mockAssistantResponses[matchedKey]) {
      return {
        ...mockAssistantResponses[matchedKey],
        id: `msg_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    // Default supportive non-diagnostic AI message
    return {
      id: `msg_${Date.now()}`,
      sender: 'assistant',
      text: `I hear you. Dealing with "${userText}" can be stressful during college. Breaking things into smaller steps often helps.\n\nWould you like to try a calming breathing reset or explore some practical habit techniques?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: ['5-Min Breathing', 'Explore Habits', 'Talk to Counselor'],
      suggestedAction: {
        label: 'Try 5-Min Breathing',
        route: '/relax/breathing',
      },
    };
  },
};
