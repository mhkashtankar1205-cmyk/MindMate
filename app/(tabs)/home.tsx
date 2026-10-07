import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../src/constants/theme';
import { useAuth } from '../../src/context/AuthContext';
import { useWellness } from '../../src/context/WellnessContext';
import { ProgressRing } from '../../src/components/common/ProgressRing';
import { StressLevelBadge } from '../../src/components/common/StressLevelBadge';
import { RecommendationCard } from '../../src/components/wellness/RecommendationCard';
import { RecommendationItem } from '../../src/types/recommendation';
import { recommendationService } from '../../src/services/recommendationService';
import {
  Bot,
  CalendarCheck,
  BookOpen,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  LifeBuoy,
  BookMarked
} from 'lucide-react-native';
import { getGreetingTime } from '../../src/utils/formatting';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { stressResult } = useWellness();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);

  useEffect(() => {
    loadRecs();
  }, []);

  const loadRecs = async () => {
    const list = await recommendationService.getRecommendations();
    setRecommendations(list);
  };

  const userName = user?.name || 'Mahak';
  const greeting = getGreetingTime();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Bar */}
        <View style={styles.headerBar}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.greetingText}>{greeting}, {userName} 👋</Text>
            <Text style={styles.subGreeting}>How are you feeling today?</Text>
          </View>
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            style={styles.avatarButton}
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>{userName.charAt(0)}</Text>
            </View>
          </Pressable>
        </View>

        {/* AI Assistant Quick Trigger Banner */}
        <Pressable
          onPress={() => router.push('/assistant')}
          style={({ pressed }) => [styles.aiBanner, pressed && styles.pressed]}
        >
          <View style={styles.aiIconBadge}>
            <Bot size={22} color={Colors.textLight} />
          </View>
          <View style={styles.aiTextGroup}>
            <Text style={styles.aiTitle}>MindMate AI Assistant</Text>
            <Text style={styles.aiSub}>Talk it out. One step at a time.</Text>
          </View>
          <ArrowRight size={18} color={Colors.primary} />
        </Pressable>

        {/* Main Hero Card: Wellbeing Snapshot (Requirement #12) */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroTitleGroup}>
              <Text style={styles.heroLabel}>Your Wellbeing Snapshot</Text>
              <Text style={styles.heroMainTitle}>Stress Risk Level</Text>
              <View style={{ marginTop: 6 }}>
                <StressLevelBadge
                  level={stressResult?.level || 'MODERATE'}
                  score={stressResult?.score || 64}
                />
              </View>
            </View>
            {stressResult && (
              <ProgressRing
                score={stressResult.score}
                level={stressResult.level}
                size={110}
                strokeWidth={10}
              />
            )}
          </View>

          <Text style={styles.heroStatement}>
            "{stressResult?.summary || 'Your recent responses suggest you may be experiencing some pressure.'}"
          </Text>

          <View style={styles.heroFooter}>
            <Text style={styles.heroDisclaimer}>Self-awareness estimate • Non-diagnostic</Text>
            <Pressable
              onPress={() => router.push('/assessment/result')}
              style={styles.viewResultBtn}
            >
              <Text style={styles.viewResultText}>Details</Text>
              <ArrowRight size={14} color={Colors.primaryDark} />
            </Pressable>
          </View>
        </View>

        {/* What's Affecting You Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What's affecting you?</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.affectingScroll}>
          {[
            { title: 'Academic', count: 'High', color: Colors.categoryAcademic },
            { title: 'Career', count: 'Moderate', color: Colors.categoryCareer },
            { title: 'Sleep', count: 'Fair', color: Colors.categorySleep },
            { title: 'Social', count: 'Good', color: Colors.categorySocial },
            { title: 'Lifestyle', count: 'Stable', color: Colors.categoryLifestyle },
          ].map((item, idx) => (
            <View key={idx} style={styles.affectingCard}>
              <View style={[styles.affectingDot, { backgroundColor: item.color }]} />
              <Text style={styles.affectingTitle}>{item.title}</Text>
              <Text style={styles.affectingStatus}>{item.count}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Recommended For You Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <Pressable onPress={() => router.push('/recommendations')}>
            <Text style={styles.seeAllText}>See all</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recsScroll}>
          {recommendations.slice(0, 4).map((item) => (
            <RecommendationCard key={item.id} item={item} horizontal />
          ))}
        </ScrollView>

        {/* Continue Your Journey & Daily Check-in Streak */}
        <View style={styles.journeyCard}>
          <View style={styles.journeyHeader}>
            <View style={styles.streakBadge}>
              <Flame size={18} color="#E5A84B" fill="#E5A84B" />
              <Text style={styles.streakText}>4 Day Check-in Streak!</Text>
            </View>
            <Text style={styles.journeySubtitle}>Consistency builds resilience</Text>
          </View>

          <Pressable
            onPress={() => router.push('/(tabs)/checkin')}
            style={styles.checkinActionBtn}
          >
            <CalendarCheck size={20} color={Colors.textLight} />
            <Text style={styles.checkinBtnText}>Complete Today's 30s Check-in</Text>
          </Pressable>
        </View>

        {/* Quick Hub Navigation Cards */}
        <View style={styles.quickGrid}>
          <Pressable
            onPress={() => router.push('/stories')}
            style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}
          >
            <BookOpen size={22} color={Colors.primary} />
            <Text style={styles.quickCardTitle}>Real Stories</Text>
            <Text style={styles.quickCardSub}>Verified student journeys</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/books')}
            style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}
          >
            <BookMarked size={22} color={Colors.primary} />
            <Text style={styles.quickCardTitle}>Wellness Library</Text>
            <Text style={styles.quickCardSub}>Books & key takeaways</Text>
          </Pressable>
        </View>

        {/* High Stress Support Link */}
        <Pressable
          onPress={() => router.push('/support')}
          style={styles.supportLinkCard}
        >
          <LifeBuoy size={20} color={Colors.primary} />
          <Text style={styles.supportLinkText}>Need to talk to someone or find support?</Text>
          <ArrowRight size={16} color={Colors.primary} />
        </Pressable>
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  headerTextGroup: {
    flex: 1,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  subGreeting: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  avatarButton: {
    padding: 2,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarInitial: {
    color: Colors.textLight,
    fontWeight: '800',
    fontSize: 18,
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.lightOrange,
    ...Shadows.soft,
  },
  aiIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  aiTextGroup: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  aiSub: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.medium,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  heroTitleGroup: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroMainTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  heroStatement: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: Spacing.md,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  heroDisclaimer: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  viewResultBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  viewResultText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginRight: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700',
  },
  affectingScroll: {
    marginVertical: Spacing.xs,
  },
  affectingCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    minWidth: 90,
  },
  affectingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  affectingTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  affectingStatus: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  recsScroll: {
    marginVertical: Spacing.xs,
  },
  journeyCard: {
    backgroundColor: Colors.cardSecondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  journeyHeader: {
    marginBottom: Spacing.md,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginLeft: 6,
  },
  journeySubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  checkinActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  checkinBtnText: {
    color: Colors.textLight,
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginVertical: Spacing.xs,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.soft,
  },
  quickCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 8,
  },
  quickCardSub: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  supportLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  supportLinkText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginLeft: 10,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
