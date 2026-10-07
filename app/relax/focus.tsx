import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react-native';

export default function FocusTimerScreen() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 mins
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const displayTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="25-Min Focus Sprint" showBack />
      <View style={styles.container}>
        <View style={styles.card}>
          <Timer size={44} color={Colors.primary} />
          <Text style={styles.title}>Pomodoro Focus Sprint</Text>
          <Text style={styles.subtitle}>
            Dedicate 25 uninterrupted minutes to one single study goal without phone notifications.
          </Text>

          <View style={styles.timeBox}>
            <Text style={styles.timeDisplay}>{displayTime}</Text>
            <Text style={styles.statusLabel}>{isActive ? 'Sprint Active' : 'Ready'}</Text>
          </View>

          <View style={styles.btnRow}>
            <Pressable
              onPress={() => {
                setIsActive(false);
                setSecondsLeft(1500);
              }}
              style={styles.secBtn}
            >
              <RotateCcw size={20} color={Colors.textSecondary} />
            </Pressable>

            <Pressable
              onPress={() => setIsActive(!isActive)}
              style={styles.mainBtn}
            >
              {isActive ? <Pause size={24} color={Colors.textLight} /> : <Play size={24} color={Colors.textLight} fill={Colors.textLight} />}
              <Text style={styles.btnText}>{isActive ? 'Pause' : 'Start 25m Sprint'}</Text>
            </Pressable>
          </View>
        </View>
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
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginTop: Spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  timeBox: {
    marginVertical: Spacing.xl,
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: 56,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  secBtn: {
    padding: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  btnText: {
    color: Colors.textLight,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});
