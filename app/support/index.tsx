import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SafetyCard } from '../../src/components/common/SafetyCard';
import { mockSupportResources } from '../../src/data/mockSupport';
import { HeartHandshake, PhoneCall, Building2, Users, ArrowRight } from 'lucide-react-native';

export default function SupportIndexScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Student Support Services" showBack />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Support Header Card */}
        <View style={styles.headerCard}>
          <HeartHandshake size={36} color={Colors.primary} />
          <Text style={styles.title}>You're carrying a lot right now.</Text>
          <Text style={styles.subtitle}>
            Your recent stress responses indicate elevated pressure. Remember that seeking guidance is a sign of strength.
          </Text>

          <Pressable
            onPress={() => router.push('/support/crisis')}
            style={styles.crisisBtn}
          >
            <PhoneCall size={18} color={Colors.danger} />
            <Text style={styles.crisisBtnText}>Access 24/7 Crisis Helplines</Text>
          </Pressable>
        </View>

        {/* 4 Support Options (Requirement #21) */}
        <Text style={styles.sectionTitle}>What would help you most today?</Text>
        <View style={styles.optionsGrid}>
          <Pressable
            onPress={() => router.push('/support/crisis')}
            style={({ pressed }) => [styles.optCard, pressed && styles.pressed]}
          >
            <Users size={22} color={Colors.primary} />
            <Text style={styles.optTitle}>1. Talk to someone I trust</Text>
            <Text style={styles.optDesc}>Peer networks, family, or campus counselors.</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/support/crisis')}
            style={({ pressed }) => [styles.optCard, pressed && styles.pressed]}
          >
            <Building2 size={22} color={Colors.primary} />
            <Text style={styles.optTitle}>2. Qualified Professional</Text>
            <Text style={styles.optDesc}>Tele-MANAS, KIRAN, and university wellness cell.</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/relax/breathing')}
            style={({ pressed }) => [styles.optCard, pressed && styles.pressed]}
          >
            <HeartHandshake size={22} color={Colors.primary} />
            <Text style={styles.optTitle}>3. Try a Calming Activity</Text>
            <Text style={styles.optDesc}>5-minute box breathing or grounding session.</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace('/(tabs)/home')}
            style={({ pressed }) => [styles.optCard, pressed && styles.pressed]}
          >
            <ArrowRight size={22} color={Colors.primary} />
            <Text style={styles.optTitle}>4. Continue with my day</Text>
            <Text style={styles.optDesc}>Return to MindMate dashboard.</Text>
          </Pressable>
        </View>

        {/* Support Resources Directory */}
        <Text style={styles.sectionTitle}>Campus & National Support Resources</Text>
        <View style={styles.resourceList}>
          {mockSupportResources.map((res) => (
            <View key={res.id} style={styles.resCard}>
              <Text style={styles.resCategory}>{res.category}</Text>
              <Text style={styles.resTitle}>{res.title}</Text>
              <Text style={styles.resDesc}>{res.description}</Text>
              <View style={styles.resContactBox}>
                <Text style={styles.resContactText}>{res.contactInfo}</Text>
                <Text style={styles.resHours}>{res.availability}</Text>
              </View>
            </View>
          ))}
        </View>

        <SafetyCard type="disclaimer" />
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
  headerCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.medium,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 4,
    marginBottom: Spacing.md,
  },
  crisisBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dangerBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: `${Colors.danger}40`,
  },
  crisisBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.danger,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  optionsGrid: {
    gap: Spacing.sm,
  },
  optCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  optTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 6,
  },
  optDesc: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  resourceList: {
    gap: Spacing.sm,
  },
  resCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  resCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  resTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  resDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  resContactBox: {
    backgroundColor: Colors.cardSecondary,
    padding: Spacing.xs + 4,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.xs + 4,
  },
  resContactText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  resHours: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
