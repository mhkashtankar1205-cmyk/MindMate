import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { CategoryChip } from '../../src/components/common/CategoryChip';
import { StoryCard } from '../../src/components/wellness/StoryCard';
import { StoryItem, StoryCategory } from '../../src/types/content';
import { contentService } from '../../src/services/contentService';

const CATEGORIES: ('All' | StoryCategory)[] = [
  'All',
  'Academic',
  'Career',
  'Failure',
  'Sports',
  'Entrepreneurship',
  'Personal Growth',
];

export default function StoriesIndexScreen() {
  const [selectedCat, setSelectedCat] = useState<'All' | StoryCategory>('All');
  const [stories, setStories] = useState<StoryItem[]>([]);

  useEffect(() => {
    loadStories();
  }, [selectedCat]);

  const loadStories = async () => {
    const data = await contentService.getStories(selectedCat as StoryCategory);
    setStories(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Real Student & Leader Stories" showBack />
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Verified real-life case studies on overcoming rejections, exam panic, and burnout.
        </Text>

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
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
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
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  chipScroll: {
    marginVertical: Spacing.xs,
    maxHeight: 50,
  },
  listContainer: {
    paddingBottom: Spacing.xxl,
  },
});
