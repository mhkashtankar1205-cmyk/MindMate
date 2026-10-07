import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../src/constants/colors';
import { AppHeader } from '../../../src/components/common/AppHeader';
import { FocusGame } from '../../../src/components/games/FocusGame';

export default function FocusGameScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Focus Challenge" showBack />
      <ScrollView contentContainerStyle={styles.container}>
        <FocusGame />
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
