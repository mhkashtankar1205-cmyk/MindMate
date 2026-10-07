import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { StatCard } from '../../src/components/common/StatCard';
import { SimpleTrendChart } from '../../src/components/charts/SimpleTrendChart';
import { Building2, ShieldCheck, Users, TrendingUp, AlertTriangle } from 'lucide-react-native';

export default function CollegeDashboardScreen() {
  const aggregatedData = {
    totalParticipants: 1240,
    lowStressPercent: 42,
    moderateStressPercent: 41,
    highStressPercent: 17,
    topFactors: [
      { name: '1. Academic Workload', percent: 48 },
      { name: '2. Career & Placements', percent: 28 },
      { name: '3. Sleep Schedule', percent: 14 },
      { name: '4. Financial Concerns', percent: 6 },
      { name: '5. Social Pressure', percent: 4 },
    ],
    weeklyTrend: [
      { day: 'W1', score: 68 },
      { day: 'W2', score: 65 },
      { day: 'W3', score: 62 },
      { day: 'W4', score: 59 },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="College Administration Dashboard" showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Strict Privacy Guarantee Header */}
        <View style={styles.privacyCard}>
          <View style={styles.privacyHeader}>
            <ShieldCheck size={24} color={Colors.success} />
            <Text style={styles.privacyTitle}>100% Anonymized Aggregated Analytics</Text>
          </View>
          <Text style={styles.privacyText}>
            This dashboard displays aggregated campus wellness trends to help administration plan support programs. Individual student names, answers, or personal notes are NEVER stored or accessible here.
          </Text>
        </View>

        {/* Overview Stat Cards */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Enrolled Participants"
            value={aggregatedData.totalParticipants}
            subtitle="Active this term"
            icon={<Users size={16} color={Colors.primary} />}
            accentColor={Colors.primary}
          />
          <StatCard
            title="Moderate / High Risk"
            value={`${aggregatedData.moderateStressPercent + aggregatedData.highStressPercent}%`}
            subtitle="Campus proportion"
            icon={<AlertTriangle size={16} color={Colors.warning} />}
            accentColor={Colors.warning}
          />
        </View>

        {/* Stress Level Distribution */}
        <Text style={styles.sectionTitle}>Campus Stress Distribution</Text>
        <View style={styles.distCard}>
          <View style={styles.distBar}>
            <View style={[styles.distSegment, { width: `${aggregatedData.lowStressPercent}%`, backgroundColor: Colors.success }]} />
            <View style={[styles.distSegment, { width: `${aggregatedData.moderateStressPercent}%`, backgroundColor: Colors.warning }]} />
            <View style={[styles.distSegment, { width: `${aggregatedData.highStressPercent}%`, backgroundColor: Colors.danger }]} />
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: Colors.success }]} />
              <Text style={styles.legendText}>Low Stress ({aggregatedData.lowStressPercent}%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: Colors.warning }]} />
              <Text style={styles.legendText}>Moderate ({aggregatedData.moderateStressPercent}%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: Colors.danger }]} />
              <Text style={styles.legendText}>High ({aggregatedData.highStressPercent}%)</Text>
            </View>
          </View>
        </View>

        {/* Top Stress Factors Reported */}
        <Text style={styles.sectionTitle}>Top Reported Stress Factors</Text>
        <View style={styles.factorsCard}>
          {aggregatedData.topFactors.map((item, idx) => (
            <View key={idx} style={styles.factorRow}>
              <Text style={styles.factorName}>{item.name}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${item.percent}%` }]} />
              </View>
              <Text style={styles.percentText}>{item.percent}%</Text>
            </View>
          ))}
        </View>

        {/* Weekly Trend Chart */}
        <Text style={styles.sectionTitle}>Monthly Campus Stress Trend</Text>
        <SimpleTrendChart
          title="Average Campus Stress Level"
          data={aggregatedData.weeklyTrend}
          maxValue={100}
          barColor={Colors.primary}
        />
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
  privacyCard: {
    backgroundColor: Colors.successBg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: `${Colors.success}40`,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  privacyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.success,
    marginLeft: 8,
  },
  privacyText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
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
  distCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  distBar: {
    height: 16,
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  distSegment: {
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  factorsCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 10,
  },
  factorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factorName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    width: 140,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.cardSecondary,
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  percentText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
    width: 35,
    textAlign: 'right',
  },
});
