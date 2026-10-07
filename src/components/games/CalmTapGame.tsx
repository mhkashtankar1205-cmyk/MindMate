import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Heart, Sparkles, RefreshCw } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';
import { PrimaryButton } from '../common/PrimaryButton';

export const CalmTapGame: React.FC = () => {
  const [heartRate, setHeartRate] = useState(88); // baseline elevated
  const [tapsCount, setTapsCount] = useState(0);
  const [circleSize, setCircleSize] = useState(120);
  const [isExpanding, setIsExpanding] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCircleSize((prev) => {
        if (prev >= 180) {
          setIsExpanding(false);
          return 178;
        }
        if (prev <= 100) {
          setIsExpanding(true);
          return 102;
        }
        return isExpanding ? prev + 4 : prev - 4;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isExpanding]);

  const handleTap = () => {
    setTapsCount((prev) => prev + 1);
    setHeartRate((prev) => Math.max(62, prev - 2));
  };

  const handleReset = () => {
    setHeartRate(88);
    setTapsCount(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Heart size={20} color={Colors.danger} />
          <Text style={styles.metricVal}>{heartRate} BPM</Text>
          <Text style={styles.metricLbl}>Simulated HR</Text>
        </View>
        <View style={styles.metricItem}>
          <Sparkles size={20} color={Colors.primary} />
          <Text style={styles.metricVal}>{tapsCount}</Text>
          <Text style={styles.metricLbl}>Calm Taps</Text>
        </View>
      </View>

      <Text style={styles.instruction}>
        Tap the pulsing circle slowly as it expands to synchronize your breathing.
      </Text>

      <View style={styles.circleArea}>
        <Pressable
          onPress={handleTap}
          style={({ pressed }) => [
            styles.pulseCircle,
            { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
            pressed && styles.pressedCircle,
          ]}
        >
          <View style={styles.innerCore}>
            <Text style={styles.tapText}>Tap</Text>
          </View>
        </Pressable>
      </View>

      {heartRate <= 68 ? (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>✨ Your rhythm is restored! Heart rate normalized.</Text>
          <PrimaryButton title="Restart Session" onPress={handleReset} style={{ marginTop: Spacing.sm }} />
        </View>
      ) : (
        <Pressable onPress={handleReset} style={styles.resetBtn}>
          <RefreshCw size={14} color={Colors.textMuted} />
          <Text style={styles.resetText}>Reset Pulse Meter</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    alignItems: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.md,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  metricLbl: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  instruction: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  circleArea: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    backgroundColor: Colors.lightOrange,
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 4,
  },
  innerCore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapText: {
    color: Colors.textLight,
    fontWeight: '700',
    fontSize: 14,
  },
  pressedCircle: {
    backgroundColor: Colors.peach,
    transform: [{ scale: 0.95 }],
  },
  successBanner: {
    backgroundColor: Colors.successBg,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    width: '100%',
    marginTop: Spacing.md,
  },
  successText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.success,
    textAlign: 'center',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  resetText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 4,
  },
});
