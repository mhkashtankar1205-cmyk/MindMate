import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { StatCard } from '../../src/components/common/StatCard';
import { SimpleTrendChart } from '../../src/components/charts/SimpleTrendChart';
import { ProgressSummary } from '../../src/data/mockProgress';
import { progressService } from '../../src/services/progressService';
import { TrendingDown, Flame, Moon, Activity, Sparkles, CheckCircle2 } from 'lucide-react-native';

export default function ProgressScreen() {
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [timeframe, setTimeframe] = useState<'7d' | '30d'>('7d');

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await progressService.getProgressSummary();
    setProgress(data);
  };

  if (!progress) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Progress Dashboard" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.pageTitle}>Your Wellbeing Journey</Text>
            <Text style={styles.pageSubtitle}>Tracking consistency, sleep, and stress reduction.</Text>
          </View>

          {/* Timeframe Switcher */}
          <View style={styles.timeframeToggle}>
            <Pressable
              onPress={() => setTimeframe('7d')}
              style={[styles.timeBtn, timeframe === '7d' && styles.timeBtnActive]}
            >
              <Text style={[styles.timeText, timeframe === '7d' && styles.timeTextActive]}>7 Days</Text>
            </Pressable>
            <Pressable
              onPress={() => setTimeframe('30d')}
              style={[styles.timeBtn, timeframe === '30d' && styles.timeBtnActive]}
            >
              <Text style={[styles.timeText, timeframe === '30d' && styles.timeTextActive]}>30 Days</Text>
            </Pressable>
          </View>
        </View>

        {/* Positive Insight Highlight Banner */}
        <View style={styles.highlightBanner}>
          <View style={styles.bannerIcon}>
            <TrendingDown size={22} color={Colors.success} />
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Stress reduced by 12% this week!</Text>
            <Text style={styles.bannerDesc}>
              Consistent daily check-ins and breathing resets are helping lower peak stress spikes.
            </Text>
          </View>
        </View>

        {/* Metric Overview Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Current Stress"
            value={`${progress.currentStressScore}/100`}
            subtitle="Moderate Level"
            icon={<Sparkles size={16} color={Colors.warning} />}
            accentColor={Colors.warning}
          />
          <StatCard
            title="Check-in Streak"
            value={`${progress.checkinStreakDays} Days`}
            subtitle="Active Streak"
            icon={<Flame size={16} color={Colors.primary} />}
            accentColor={Colors.primary}
          />
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Sleep Avg"
            value={`${progress.averageSleepHours}h`}
            subtitle="Nightly Target 7.5h"
            icon={<Moon size={16} color={Colors.categorySleep} />}
            accentColor={Colors.categorySleep}
          />
          <StatCard
            title="Exercise Days"
            value={`${progress.weeklyActivityDays} Days`}
            subtitle="This week"
            icon={<Activity size={16} color={Colors.success} />}
            accentColor={Colors.success}
          />
        </View>

        {/* Trend Charts */}
        <Text style={styles.sectionTitle}>Stress Trend ({timeframe === '7d' ? 'Weekly' : 'Monthly'})</Text>
        <SimpleTrendChart
          title="Daily Stress Score (Lower is better)"
          data={progress.weeklyTrend}
          maxValue={100}
          barColor={Colors.primary}
        />

        <Text style={styles.sectionTitle}>Sleep Trend</Text>
        <SimpleTrendChart
          title="Hours of Nightly Sleep"
          data={progress.sleepTrend.map((s) => ({ day: s.day, score: s.hours }))}
          maxValue={10}
          barColor={Colors.categorySleep}
        />

        {/* Positive Personal Insights Card */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Personalized Wellbeing Observations</Text>
          {progress.insights.map((insightText, idx) => (
            <View key={idx} style={styles.insightItem}>
              <CheckCircle2 size={16} color={Colors.primary} style={{ marginTop: 2 }} />
              <Text style={styles.insightText}>{insightText}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.disclaimerFooter}>
          MindMate tracks self-reported awareness data. It does not provide medical diagnostic results.
        </Text>
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  pageSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  timeframeToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.cardSecondary,
    borderRadius: BorderRadius.full,
    padding: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  timeBtnActive: {
    backgroundColor: Colors.primary,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  timeTextActive: {
    color: Colors.textLight,
  },
  highlightBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successBg,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: `${Colors.success}30`,
  },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.success,
  },
  bannerDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  insightsCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 10,
  },
  insightsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  disclaimerFooter: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    marginVertical: Spacing.md,
  },
});
