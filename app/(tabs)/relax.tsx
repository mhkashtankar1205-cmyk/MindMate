import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../src/constants/theme';
import { CategoryChip } from '../../src/components/common/CategoryChip';
import { GameCard } from '../../src/components/games/GameCard';
import { mockGames } from '../../src/data/mockGames';
import { mockMusic } from '../../src/data/mockMusic';
import { Wind, Moon, Timer, Compass, Play, Sparkles, Flame, Volume2, Headphones, Music } from 'lucide-react-native';

// One quick pick per music category for the Relax tab preview
const QUICK_PICK_IDS = ['music_relaxing_piano', 'music_meditation_01', 'music_clean_soul', 'music_calmant'];
const quickPicks = mockMusic.filter((t) => QUICK_PICK_IDS.includes(t.id));

const RELAX_CATEGORIES = ['All', 'Breathing', 'Meditation', 'Stress Relief', 'Sleep', 'Focus', 'Beginner'];

export default function RelaxScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Immersive Dark Terracotta Hero Header (Inspired by screenshot visual language!) */}
        <View style={styles.heroHeader}>
          <View style={styles.heroBadge}>
            <Sparkles size={14} color="#FFE1D3" />
            <Text style={styles.heroBadgeText}>Relaxation & Mindful Space</Text>
          </View>
          <Text style={styles.heroTitle}>Take a moment for yourself.</Text>
          <Text style={styles.heroSubtitle}>
            Breathe deeply with guided meditations and stress-relief activities designed for student peace and focus.
          </Text>

          <Pressable
            onPress={() => router.push('/relax/breathing')}
            style={styles.heroStartBtn}
          >
            <Play size={18} color={Colors.primaryDark} fill={Colors.primaryDark} />
            <Text style={styles.heroStartText}>Start 5-Min Breathing Reset</Text>
          </Pressable>
        </View>

        {/* Category Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {RELAX_CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              selected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>

        {/* Large Featured Relaxation Cards */}
        <Text style={styles.sectionTitle}>Featured Sessions</Text>
        <View style={styles.featuredGrid}>
          {/* Card 1: Breath Awareness */}
          <Pressable
            onPress={() => router.push('/relax/breathing')}
            style={({ pressed }) => [styles.featuredCard, { backgroundColor: '#BA3D1D' }, pressed && styles.pressed]}
          >
            <View style={styles.featuredTop}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>Breathing</Text>
              </View>
              <Text style={styles.timeText}>5 min</Text>
            </View>
            <Text style={styles.featuredTitle}>Breath Awareness</Text>
            <Text style={styles.featuredDesc}>Box breathing to calm acute anxiety before lectures or exams.</Text>
            <View style={styles.playCircle}>
              <Play size={16} color={Colors.textLight} fill={Colors.textLight} />
            </View>
          </Pressable>

          {/* Card 2: Calming Meditation */}
          <Pressable
            onPress={() => router.push('/relax/meditation')}
            style={({ pressed }) => [styles.featuredCard, { backgroundColor: '#8D2F17' }, pressed && styles.pressed]}
          >
            <View style={styles.featuredTop}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>Meditation</Text>
              </View>
              <Text style={styles.timeText}>10 min</Text>
            </View>
            <Text style={styles.featuredTitle}>Calming Meditation</Text>
            <Text style={styles.featuredDesc}>Guided body scan to release muscle tension from late study hours.</Text>
            <View style={styles.playCircle}>
              <Play size={16} color={Colors.textLight} fill={Colors.textLight} />
            </View>
          </Pressable>

          {/* Card 3: Deep Relaxation */}
          <Pressable
            onPress={() => router.push('/relax/meditation')}
            style={({ pressed }) => [styles.featuredCard, { backgroundColor: '#2C130B' }, pressed && styles.pressed]}
          >
            <View style={styles.featuredTop}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>Sleep</Text>
              </View>
              <Text style={styles.timeText}>15 min</Text>
            </View>
            <Text style={styles.featuredTitle}>Deep Relaxation</Text>
            <Text style={styles.featuredDesc}>Sleep wind-down with progressive relaxation and ambient sounds.</Text>
            <View style={styles.playCircle}>
              <Play size={16} color={Colors.textLight} fill={Colors.textLight} />
            </View>
          </Pressable>
        </View>

        {/* Calm & Relaxing Music */}
        <Text style={styles.sectionTitle}>Calm & Relaxing Music</Text>
        <Text style={styles.sectionSub}>Soft piano, meditation and sleep songs to slow down and unwind.</Text>

        <Pressable
          onPress={() => router.push('/relax/music')}
          style={({ pressed }) => [styles.musicBanner, pressed && styles.pressed]}
        >
          <View style={styles.musicIconWrap}>
            <Headphones size={26} color={Colors.primarySubtle} />
          </View>
          <View style={styles.musicBannerInfo}>
            <Text style={styles.musicBannerTitle}>Open Calm Music Player</Text>
            <Text style={styles.musicBannerSub}>{mockMusic.length} relaxing songs • Piano, Meditation, Ambient, Sleep</Text>
          </View>
          <View style={[styles.playCircle, { alignSelf: 'center' }]}>
            <Play size={16} color={Colors.textLight} fill={Colors.textLight} />
          </View>
        </Pressable>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickPickRow}>
          {quickPicks.map((track) => (
            <Pressable
              key={track.id}
              onPress={() => router.push({ pathname: '/relax/music', params: { track: track.id } })}
              style={({ pressed }) => [styles.quickPickCard, pressed && styles.pressed]}
            >
              <View style={styles.quickPickIcon}>
                <Music size={16} color={Colors.primary} />
              </View>
              <Text style={styles.quickPickCategory}>{track.category}</Text>
              <Text style={styles.quickPickTitle} numberOfLines={2}>{track.title}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Interactive Stress Relief Mini Games (Requirement #17) */}
        <Text style={styles.sectionTitle}>Stress Relief Mini-Games</Text>
        <Text style={styles.sectionSub}>Calm cognitive activities to lower heart rate and reset attention.</Text>

        <View style={styles.gamesList}>
          {mockGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
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
    paddingBottom: Spacing.xxl,
  },
  heroHeader: {
    backgroundColor: Colors.immersiveDark,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  heroBadgeText: {
    color: '#FFE1D3',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textLight,
    lineHeight: 34,
    marginVertical: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#F8C7AE',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  heroStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE1D3',
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  heroStartText: {
    color: Colors.primaryDark,
    fontWeight: '800',
    fontSize: 15,
    marginLeft: 8,
  },
  chipScroll: {
    marginVertical: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  featuredGrid: {
    gap: Spacing.md,
    marginVertical: Spacing.xs,
  },
  featuredCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  featuredTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    color: Colors.textLight,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  timeText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textLight,
    marginTop: Spacing.sm,
  },
  featuredDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  playCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  musicBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.immersiveTerracotta,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
  },
  musicIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  musicBannerInfo: {
    flex: 1,
  },
  musicBannerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textLight,
  },
  musicBannerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
    lineHeight: 16,
  },
  quickPickRow: {
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  quickPickCard: {
    width: 132,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  quickPickIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  quickPickCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  quickPickTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  gamesList: {
    marginVertical: Spacing.xs,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
