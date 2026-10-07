import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import { Compass, Eye, Hand, Ear, Sparkles, Smile } from 'lucide-react-native';

const STEPS = [
  { num: '5', title: '5 Things You Can SEE', desc: 'Look around your room or desk. Identify 5 distinct physical objects.', icon: <Eye size={32} color={Colors.primary} /> },
  { num: '4', title: '4 Things You Can TOUCH', desc: 'Notice 4 textures around you: your shirt fabric, desk surface, phone edge.', icon: <Hand size={32} color={Colors.primary} /> },
  { num: '3', title: '3 Things You Can HEAR', desc: 'Listen closely. Identify 3 subtle sounds in your surroundings.', icon: <Ear size={32} color={Colors.primary} /> },
  { num: '2', title: '2 Things You Can SMELL', desc: 'Notice 2 scents in the air (e.g. coffee, fresh pages, laundry).', icon: <Sparkles size={32} color={Colors.primary} /> },
  { num: '1', title: '1 Thing You Can TASTE', desc: 'Focus on 1 taste in your mouth or take a slow sip of water.', icon: <Smile size={32} color={Colors.primary} /> },
];

export default function GroundingScreen() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);

  const current = STEPS[stepIdx];

  const handleNext = () => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx(stepIdx + 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="5-4-3-2-1 Sensory Grounding" showBack />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.stepNum}>{current.num}</Text>
          </View>

          <View style={styles.iconWrapper}>{current.icon}</View>

          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.desc}>{current.desc}</Text>
        </View>

        <PrimaryButton
          title={stepIdx === STEPS.length - 1 ? "Complete Grounding Session" : "Next Sense Step"}
          onPress={handleNext}
          style={styles.nextBtn}
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
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  stepNum: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  iconWrapper: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  desc: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: Spacing.sm,
  },
  nextBtn: {
    marginBottom: Spacing.md,
  },
});
