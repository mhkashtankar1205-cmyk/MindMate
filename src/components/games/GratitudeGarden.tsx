import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Flower2, Plus, Sparkles } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';

interface PlantNote {
  id: string;
  note: string;
  plantType: '🌸' | '🌻' | '🌿' | '🌷' | '🌼';
  date: string;
}

export const GratitudeGarden: React.FC = () => {
  const [notes, setNotes] = useState<PlantNote[]>([
    { id: '1', note: 'Grateful for study session with Rahul.', plantType: '🌻', date: 'Today' },
    { id: '2', note: 'Had a restful 7.5 hours of sleep.', plantType: '🌸', date: 'Yesterday' },
    { id: '3', note: 'Got positive feedback on lab project.', plantType: '🌿', date: '2 days ago' },
  ]);
  const [inputNote, setInputNote] = useState('');

  const handleAddNote = () => {
    if (!inputNote.trim()) return;
    const plantTypes: ('🌸' | '🌻' | '🌿' | '🌷' | '🌼')[] = ['🌸', '🌻', '🌿', '🌷', '🌼'];
    const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];
    const newNote: PlantNote = {
      id: Date.now().toString(),
      note: inputNote.trim(),
      plantType: randomPlant,
      date: 'Just now',
    };
    setNotes([newNote, ...notes]);
    setInputNote('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.gardenHeader}>
        <Flower2 size={32} color={Colors.primary} />
        <Text style={styles.title}>Gratitude Garden</Text>
        <Text style={styles.subtitle}>Plant a positive thought to nourish your mindset.</Text>
      </View>

      <View style={styles.inputCard}>
        <TextInput
          style={styles.textInput}
          placeholder="What is one small thing you're grateful for today?"
          placeholderTextColor={Colors.textMuted}
          value={inputNote}
          onChangeText={setInputNote}
          multiline
        />
        <Pressable onPress={handleAddNote} style={styles.plantBtn}>
          <Plus size={18} color={Colors.textLight} />
          <Text style={styles.plantBtnText}>Plant Note</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionHeader}>Your Blooming Garden ({notes.length} Plants)</Text>

      <ScrollView contentContainerStyle={styles.gardenGrid} showsVerticalScrollIndicator={false}>
        {notes.map((item) => (
          <View key={item.id} style={styles.plantCard}>
            <Text style={styles.plantEmoji}>{item.plantType}</Text>
            <View style={styles.plantInfo}>
              <Text style={styles.plantNoteText}>"{item.note}"</Text>
              <Text style={styles.plantDate}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    flex: 1,
  },
  gardenHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  inputCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.lg,
  },
  textInput: {
    fontSize: 14,
    color: Colors.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  plantBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.xs,
  },
  plantBtnText: {
    color: Colors.textLight,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  gardenGrid: {
    gap: 10,
  },
  plantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  plantEmoji: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  plantInfo: {
    flex: 1,
  },
  plantNoteText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  plantDate: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
