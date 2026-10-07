import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Star, BookOpen } from 'lucide-react-native';
import { BookItem } from '../../types/content';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';

interface BookCardProps {
  book: BookItem;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/books/${book.id}` as never)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.cover, { backgroundColor: book.coverGradient[0] }]}>
        <BookOpen size={28} color={Colors.textLight} />
        <Text style={styles.coverCategory}>{book.category}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.ratingRow}>
          <Star size={14} color="#E5A84B" fill="#E5A84B" />
          <Text style={styles.rating}>{book.rating}</Text>
          <Text style={styles.readTime}>• {book.readTime}</Text>
        </View>

        <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.description} numberOfLines={2}>{book.shortDescription}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.soft,
  },
  cover: {
    width: 70,
    height: 95,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  coverCategory: {
    color: Colors.textLight,
    fontSize: 9,
    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 3,
  },
  readTime: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  author: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
