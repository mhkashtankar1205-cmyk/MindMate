import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/context/AuthContext';
import { WellnessProvider } from '../src/context/WellnessContext';
import { Colors } from '../src/constants/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <WellnessProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.background },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding/welcome" />
            <Stack.Screen name="onboarding/profile" />
            <Stack.Screen name="onboarding/personality" />
            <Stack.Screen name="onboarding/lifestyle" />
            <Stack.Screen name="onboarding/situations" />
            <Stack.Screen name="onboarding/summary" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="assessment/result" />
            <Stack.Screen name="relax/breathing" options={{ animation: 'fade' }} />
            <Stack.Screen name="assistant/index" />
            <Stack.Screen name="support/index" />
            <Stack.Screen name="support/crisis" />
            <Stack.Screen name="college/dashboard" />
          </Stack>
        </WellnessProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
