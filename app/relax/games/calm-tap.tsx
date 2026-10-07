import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { CalmTapGame } from '../../../src/components/games/CalmTapGame';

export default function CalmTapScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Calm Tap Game" showBack />
      <ScrollView contentContainerStyle={styles.container}>
        <CalmTapGame />
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
    flexGrow: 1,
  },
});
