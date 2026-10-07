import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { StoryItem } from '../../src/types/content';
import { contentService } from '../../src/services/contentService';
import { CheckCircle2, BookOpen, Lightbulb } from 'lucide-react-native';

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [story, setStory] = useState<StoryItem | null>(null);

  useEffect(() => {
    if (id) {
      contentService.getStoryById(id).then((res) => {
        if (res) setStory(res);
      });
    }
  }, [id]);

  if (!story) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={story.category} showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.badgeRow}>
            <View style={styles.catBadge}>
              <Text style={styles.catText}>{story.category}</Text>
            </View>
            {story.isVerifiedReal && (
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={12} color={Colors.success} />
                <Text style={styles.verifiedText}>Verified Real Case</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.authorText}>Documented Source: {story.author} • {story.readTime}</Text>

          <View style={styles.divider} />

          <Text style={styles.fullStoryText}>{story.fullStory}</Text>

          {/* Key Takeaway Banner */}
          <View style={styles.takeawayCard}>
            <View style={styles.takeawayHeader}>
              <Lightbulb size={20} color={Colors.primary} />
              <Text style={styles.takeawayTitle}>Key Student Takeaway</Text>
            </View>
            <Text style={styles.takeawayText}>"{story.takeaway}"</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.xl,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.xs,
  },
  catBadge: {
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  catText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
    marginLeft: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 28,
    marginVertical: 6,
  },
  authorText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.md,
  },
  fullStoryText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  takeawayCard: {
    backgroundColor: Colors.cardSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  takeawayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  takeawayTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 6,
  },
  takeawayText: {
    fontSize: 13,
    color: Colors.primaryDark,
    fontWeight: '600',
    lineHeight: 19,
    fontStyle: 'italic',
  },
});
