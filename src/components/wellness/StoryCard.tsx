import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CheckCircle2, Clock, BookOpen } from 'lucide-react-native';
import { StoryItem } from '../../types/content';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';

interface StoryCardProps {
  story: StoryItem;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/stories/${story.id}` as never)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.topRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{story.category}</Text>
        </View>
        {story.isVerifiedReal && (
          <View style={styles.verifiedBadge}>
            <CheckCircle2 size={12} color={Colors.success} />
            <Text style={styles.verifiedText}>Verified Real Story</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{story.shortDescription}</Text>

      <View style={styles.footer}>
        <Text style={styles.author}>{story.author}</Text>
        <View style={styles.readTime}>
          <Clock size={12} color={Colors.textMuted} />
          <Text style={styles.readTimeText}>{story.readTime}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.soft,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  categoryBadge: {
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successBg,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.success,
    marginLeft: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginVertical: 4,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  author: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
