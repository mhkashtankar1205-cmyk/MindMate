import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { BookItem } from '../../src/types/content';
import { contentService } from '../../src/services/contentService';
import { BookOpen, Star, CheckCircle2 } from 'lucide-react-native';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<BookItem | null>(null);

  useEffect(() => {
    if (id) {
      contentService.getBookById(id).then((res) => {
        if (res) setBook(res);
      });
    }
  }, [id]);

  if (!book) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Book Key Takeaways" showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={[styles.coverHeader, { backgroundColor: book.coverGradient[0] }]}>
            <BookOpen size={36} color={Colors.textLight} />
            <Text style={styles.coverTitle}>{book.title}</Text>
            <Text style={styles.coverAuthor}>by {book.author}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Star size={16} color="#E5A84B" fill="#E5A84B" />
            <Text style={styles.ratingText}>{book.rating} / 5.0</Text>
            <Text style={styles.readTimeText}>• {book.readTime}</Text>
          </View>

          <Text style={styles.summaryTitle}>Overview</Text>
          <Text style={styles.descriptionText}>{book.shortDescription}</Text>

          <View style={styles.divider} />

          <Text style={styles.takeawaysHeader}>Key Student Action Points</Text>
          <View style={styles.pointsList}>
            {book.keyTakeaways.map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <CheckCircle2 size={16} color={Colors.primary} style={{ marginTop: 2 }} />
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
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
  coverHeader: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  coverTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  coverAuthor: {
    fontSize: 13,
    color: Colors.textLight,
    opacity: 0.9,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 4,
  },
  readTimeText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.md,
  },
  takeawaysHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  pointsList: {
    gap: 10,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pointText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});
