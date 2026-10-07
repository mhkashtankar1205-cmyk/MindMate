import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { CategoryChip } from '../../src/components/common/CategoryChip';
import { BookCard } from '../../src/components/wellness/BookCard';
import { BookItem, BookCategory } from '../../src/types/content';
import { contentService } from '../../src/services/contentService';

const CATEGORIES: ('All' | BookCategory)[] = [
  'All',
  'Stress',
  'Habits',
  'Productivity',
  'Confidence',
  'Emotional Wellbeing',
  'Career',
  'Relationships',
];

export default function BooksIndexScreen() {
  const [selectedCat, setSelectedCat] = useState<'All' | BookCategory>('All');
  const [books, setBooks] = useState<BookItem[]>([]);

  useEffect(() => {
    loadBooks();
  }, [selectedCat]);

  const loadBooks = async () => {
    const data = await contentService.getBooks(selectedCat as BookCategory);
    setBooks(data);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Wellness Library & Summaries" showBack />
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Key takeaways and summaries from top wellness, habit, and productivity books.
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
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
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
