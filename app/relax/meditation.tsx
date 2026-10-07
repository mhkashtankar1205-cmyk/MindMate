import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Play, Pause, RotateCcw, Moon, Volume2 } from 'lucide-react-native';

export default function MeditationPlayerScreen() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsPlaying(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Guided Meditation" showBack />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Moon size={40} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Evening Wind-down Meditation</Text>
          <Text style={styles.subtitle}>
            Close your eyes and follow the soft guided prompts to release academic tension.
          </Text>

          <View style={styles.timerBox}>
            <Text style={styles.timerText}>{timeFormatted}</Text>
            <Text style={styles.statusText}>{isPlaying ? 'Meditation Session Active' : 'Paused'}</Text>
          </View>

          <View style={styles.controlsRow}>
            <Pressable
              onPress={() => {
                setIsPlaying(false);
                setSecondsLeft(600);
              }}
              style={styles.secBtn}
            >
              <RotateCcw size={20} color={Colors.textSecondary} />
            </Pressable>

            <Pressable
              onPress={() => setIsPlaying(!isPlaying)}
              style={styles.mainPlayBtn}
            >
              {isPlaying ? (
                <Pause size={28} color={Colors.textLight} />
              ) : (
                <Play size={28} color={Colors.textLight} fill={Colors.textLight} />
              )}
            </Pressable>
          </View>
        </View>

        <PrimaryButton
          title="Finish Meditation"
          onPress={() => router.back()}
          style={styles.finishBtn}
        />
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
    justifyContent: 'space-between',
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
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
    lineHeight: 20,
  },
  timerBox: {
    marginVertical: Spacing.xl,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 54,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  secBtn: {
    padding: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mainPlayBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  finishBtn: {
    marginBottom: Spacing.md,
  },
});
