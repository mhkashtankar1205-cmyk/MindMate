import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShieldAlert, HeartHandshake } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';
import { PrimaryButton } from './PrimaryButton';
import { useRouter } from 'expo-router';

interface SafetyCardProps {
  type?: 'disclaimer' | 'crisis';
}

export const SafetyCard: React.FC<SafetyCardProps> = ({ type = 'disclaimer' }) => {
  const router = useRouter();

  if (type === 'crisis') {
    return (
      <View style={styles.crisisContainer}>
        <View style={styles.header}>
          <ShieldAlert size={28} color={Colors.danger} />
          <Text style={styles.crisisTitle}>You deserve immediate support.</Text>
        </View>
        <Text style={styles.crisisDescription}>
          MindMate has detected elevated stress language. You don't have to carry everything alone right now.
        </Text>
        <PrimaryButton
          title="Connect to Support & Helplines"
          onPress={() => router.push('/support/crisis')}
          style={styles.crisisButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.disclaimerContainer}>
      <HeartHandshake size={18} color={Colors.textMuted} style={styles.disclaimerIcon} />
      <Text style={styles.disclaimerText}>
        MindMate is a student wellness awareness tool, not a medical diagnostic system.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  disclaimerIcon: {
    marginRight: 10,
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 17,
    flex: 1,
  },
  crisisContainer: {
    backgroundColor: Colors.dangerBg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: `${Colors.danger}40`,
    marginVertical: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  crisisTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.danger,
    marginLeft: 10,
  },
  crisisDescription: {
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  crisisButton: {
    backgroundColor: Colors.danger,
  },
});
