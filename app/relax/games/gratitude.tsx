import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { GratitudeGarden } from '../../../src/components/games/GratitudeGarden';

export default function GratitudeGardenScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Gratitude Garden" showBack />
      <GratitudeGarden />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
