import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { SecondaryButton } from '../../src/components/common/SecondaryButton';
import { useAuth } from '../../src/context/AuthContext';
import { HeartPulse, Sparkles, ShieldCheck } from 'lucide-react-native';

export default function OnboardingWelcomeScreen() {
  const router = useRouter();
  const { continueAsGuest } = useAuth();

  const handleGuest = async () => {
    await continueAsGuest();
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Logo / Header Branding */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <HeartPulse size={36} color={Colors.primary} />
          </View>
          <Text style={styles.appName}>MindMate</Text>
          <Text style={styles.tagline}>"Understand your mind. Improve your day."</Text>
        </View>

        {/* Hero Illustration / Visual Banner */}
        <View style={styles.heroCard}>
          <Text style={styles.heroQuote}>
            "Your stress is a signal, not a definition."
          </Text>
          <Text style={styles.heroSubtext}>
            MindMate helps you understand your stress patterns and build healthier daily habits through personalized student support.
          </Text>
        </View>

        {/* Value Points */}
        <View style={styles.pointsList}>
          <View style={styles.pointItem}>
            <View style={styles.pointIcon}>
              <Sparkles size={18} color={Colors.primary} />
            </View>
            <View style={styles.pointContent}>
              <Text style={styles.pointTitle}>Tailored for College Life</Text>
              <Text style={styles.pointDesc}>Designed around exams, placements, study load, and career pressure.</Text>
            </View>
          </View>

          <View style={styles.pointItem}>
            <View style={styles.pointIcon}>
              <ShieldCheck size={18} color={Colors.primary} />
            </View>
            <View style={styles.pointContent}>
              <Text style={styles.pointTitle}>100% Private & Safe</Text>
              <Text style={styles.pointDesc}>Your answers remain private to you. MindMate is a non-diagnostic wellness tool.</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <PrimaryButton
            title="Get Started"
            onPress={() => router.push('/onboarding/profile')}
            style={styles.mainBtn}
          />
          <SecondaryButton
            title="Continue as Guest"
            onPress={handleGuest}
            style={styles.guestBtn}
          />
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginVertical: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  heroQuote: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryDark,
    lineHeight: 30,
    marginBottom: Spacing.xs,
  },
  heroSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
  },
  pointsList: {
    gap: Spacing.md,
    marginVertical: Spacing.sm,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pointIcon: {
    padding: 8,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.lightOrange,
    marginRight: Spacing.md,
  },
  pointContent: {
    flex: 1,
  },
  pointTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  pointDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },
  footer: {
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  mainBtn: {
    width: '100%',
  },
  guestBtn: {
    width: '100%',
  },
});
