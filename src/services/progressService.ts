import { ProgressSummary, mockProgressData } from '../data/mockProgress';

export const progressService = {
  async getProgressSummary(): Promise<ProgressSummary> {
    return mockProgressData;
  },
};
