import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { CategoryChip } from '../../src/components/common/CategoryChip';
import { RecommendationCard } from '../../src/components/wellness/RecommendationCard';
import { RecommendationItem, RecommendationCategory } from '../../src/types/recommendation';
import { recommendationService } from '../../src/services/recommendationService';

const CATEGORIES: ('All' | RecommendationCategory)[] = [
  'All',
  'Stress Relief',
  'Study',
  'Sleep',
  'Exercise',
  'Nutrition',
  'Mindset',
  'Career',
  'Social Wellbeing',
];

export default function RecommendationsIndexScreen() {
  const [selectedCat, setSelectedCat] = useState<'All' | RecommendationCategory>('All');
  const [items, setItems] = useState<RecommendationItem[]>([]);

  useEffect(() => {
    loadRecs();
  }, [selectedCat]);

  const loadRecs = async () => {
    const data = await recommendationService.getRecommendations(selectedCat as RecommendationCategory);
    setItems(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Recommended for You" showBack />
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              selected={selectedCat === cat}
              onPress={() => setSelectedCat(cat)}
            />
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.resultsCount}>{items.length} Activities Found</Text>
          {items.map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  chipScroll: {
    marginVertical: Spacing.xs,
    maxHeight: 50,
  },
  listContainer: {
    paddingBottom: Spacing.xxl,
  },
  resultsCount: {
    fontSize: 13,
    color: Colors.textMuted,
    marginVertical: Spacing.xs,
    fontWeight: '600',
  },
});
