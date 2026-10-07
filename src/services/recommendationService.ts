import { RecommendationItem, RecommendationCategory } from '../types/recommendation';
import { mockRecommendations } from '../data/mockRecommendations';

export const recommendationService = {
  async getRecommendations(category?: RecommendationCategory): Promise<RecommendationItem[]> {
    if (!category || category === ('All' as unknown)) {
      return mockRecommendations;
    }
    return mockRecommendations.filter((rec) => rec.category === category);
  },

  async getRecommendationById(id: string): Promise<RecommendationItem | undefined> {
    return mockRecommendations.find((rec) => rec.id === id);
  },
};
