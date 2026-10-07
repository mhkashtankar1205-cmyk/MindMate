import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { MemoryGame } from '../../../src/components/games/MemoryGame';

export default function MemoryGameScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Memory Match Game" showBack />
      <ScrollView contentContainerStyle={styles.container}>
        <MemoryGame />
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
