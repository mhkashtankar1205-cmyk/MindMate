import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Target, Play, Pause, RotateCcw } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';
import { PrimaryButton } from '../common/PrimaryButton';

export const FocusGame: React.FC = () => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setStreak((prev) => prev + 1);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(60);
  };

  return (
    <View style={styles.container}>
      <View style={styles.targetCard}>
        <Target size={36} color={Colors.primary} />
        <Text style={styles.title}>1-Minute Mind Focus</Text>
        <Text style={styles.subtitle}>
          Keep your gaze on the timer and release all background thoughts.
        </Text>
      </View>

      <View style={styles.timerRing}>
        <Text style={styles.timerDisplay}>{seconds}s</Text>
        <Text style={styles.focusLabel}>{isActive ? 'Focusing...' : 'Ready'}</Text>
      </View>

      <View style={styles.controlsRow}>
        <Pressable onPress={toggleTimer} style={styles.mainControlBtn}>
          {isActive ? <Pause size={24} color={Colors.textLight} /> : <Play size={24} color={Colors.textLight} />}
          <Text style={styles.controlText}>{isActive ? 'Pause' : 'Start Focus'}</Text>
        </Pressable>
        <Pressable onPress={resetTimer} style={styles.secondaryControlBtn}>
          <RotateCcw size={20} color={Colors.textSecondary} />
        </Pressable>
      </View>

      {streak > 0 && (
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 Completed {streak} Focus Sessions today!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    alignItems: 'center',
  },
  targetCard: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  timerRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.card,
    borderWidth: 4,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  timerDisplay: {
    fontSize: 44,
    fontWeight: '900',
    color: Colors.primaryDark,
  },
  focusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mainControlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  controlText: {
    color: Colors.textLight,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryControlBtn: {
    padding: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  streakBadge: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  streakText: {
    color: Colors.primaryDark,
    fontWeight: '700',
    fontSize: 13,
  },
});
