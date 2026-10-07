import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StressLevel } from '../../types/stress';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';

interface StressLevelBadgeProps {
  level: StressLevel;
  score?: number;
  showDot?: boolean;
}

export const StressLevelBadge: React.FC<StressLevelBadgeProps> = ({
  level,
  score,
  showDot = true,
}) => {
  let bgColor = Colors.successBg;
  let textColor = Colors.success;
  let label = 'Low Stress';

  if (level === 'MODERATE') {
    bgColor = Colors.warningBg;
    textColor = Colors.warning;
    label = 'Moderate Stress';
  } else if (level === 'HIGH') {
    bgColor = Colors.dangerBg;
    textColor = Colors.danger;
    label = 'High Stress';
  }

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      {showDot && <View style={[styles.dot, { backgroundColor: textColor }]} />}
      <Text style={[styles.badgeText, { color: textColor }]}>
        {label} {score !== undefined ? `(${score}/100)` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
