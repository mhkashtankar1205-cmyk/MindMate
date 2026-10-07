import React, { createContext, useContext, useState, useEffect } from 'react';
import { StressPredictionResult } from '../types/stress';
import { DailyCheckinData, CheckinInsight } from '../types/checkin';
import { stressService } from '../services/stressService';
import { checkinService } from '../services/checkinService';

interface WellnessContextType {
  stressResult: StressPredictionResult | null;
  checkins: DailyCheckinData[];
  isLoading: boolean;
  refreshStressPrediction: () => Promise<StressPredictionResult>;
  addCheckin: (entry: Omit<DailyCheckinData, 'id' | 'createdAt'>) => Promise<CheckinInsight>;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stressResult, setStressResult] = useState<StressPredictionResult | null>(null);
  const [checkins, setCheckins] = useState<DailyCheckinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [result, checkinList] = await Promise.all([
        stressService.getLatestStressResult(),
        checkinService.getCheckins(),
      ]);
      setStressResult(result);
      setCheckins(checkinList);
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStressPrediction = async () => {
    const updated = await stressService.predictStressScore();
    setStressResult(updated);
    return updated;
  };

  const addCheckin = async (entry: Omit<DailyCheckinData, 'id' | 'createdAt'>) => {
    const { checkin, insight } = await checkinService.saveCheckin(entry);
    setCheckins((prev) => [checkin, ...prev]);
    await refreshStressPrediction();
    return insight;
  };

  return (
    <WellnessContext.Provider
      value={{
        stressResult,
        checkins,
        isLoading,
        refreshStressPrediction,
        addCheckin,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) throw new Error('useWellness must be used within a WellnessProvider');
  return context;
};
