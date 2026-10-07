import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { RecommendationItem } from '../../src/types/recommendation';
import { recommendationService } from '../../src/services/recommendationService';
import { Clock, ShieldCheck, Play } from 'lucide-react-native';

export default function RecommendationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<RecommendationItem | null>(null);

  useEffect(() => {
    if (id) {
      recommendationService.getRecommendationById(id).then((res) => {
        if (res) setItem(res);
      });
    }
  }, [id]);

  if (!item) return null;

  const handleStart = () => {
    if (item.actionRoute) {
      router.push(item.actionRoute as never);
    } else {
      router.push('/relax/breathing');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title={item.category} showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.categoryBadge}>{item.category}</Text>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <Clock size={14} color={Colors.primary} />
              <Text style={styles.metaText}>{item.durationMinutes} Minutes</Text>
            </View>
            <View style={styles.metaBadge}>
              <ShieldCheck size={14} color={Colors.primary} />
              <Text style={styles.metaText}>Difficulty: {item.difficulty}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionHeader}>Why Recommended for You</Text>
          <Text style={styles.whyText}>"{item.whyRecommended}"</Text>

          <Text style={styles.sectionHeader}>Overview & Benefits</Text>
          <Text style={styles.bodyText}>{item.fullDescription}</Text>
        </View>

        <PrimaryButton
          title="Start Activity Session"
          onPress={handleStart}
          icon={<Play size={18} color={Colors.textLight} fill={Colors.textLight} />}
          style={styles.startBtn}
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
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.lg,
  },
  categoryBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 30,
    marginBottom: Spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing.md,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.md,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: 4,
  },
  whyText: {
    fontSize: 14,
    color: Colors.primaryDark,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  startBtn: {
    width: '100%',
  },
});
