import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../src/constants/theme';
import { AppHeader } from '../../src/components/common/AppHeader';
import { useAuth } from '../../src/context/AuthContext';
import { initialNotificationSettings } from '../../src/data/mockUser';
import {
  User,
  Bell,
  Shield,
  Building2,
  LifeBuoy,
  RefreshCw,
  ChevronRight,
  CheckCircle2
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(initialNotificationSettings);

  const toggleNotification = (key: keyof typeof initialNotificationSettings) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Profile & Settings" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'M'}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Mahak'}</Text>
          <Text style={styles.userCollege}>{user?.college || 'National Institute of Technology'}</Text>
          <Text style={styles.userCourse}>{user?.course || 'B.Tech CS'} • {user?.year || '3rd Year'}</Text>
        </View>

        {/* My Wellness Profile Summary Section (Requirement #24) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <User size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>My Wellness Profile</Text>
          </View>

          <Text style={styles.labelTitle}>Common Pressure Factors:</Text>
          <View style={styles.chipWrap}>
            <View style={styles.infoChip}><Text style={styles.chipLabel}>Academic Workload</Text></View>
            <View style={styles.infoChip}><Text style={styles.chipLabel}>Career & Placements</Text></View>
            <View style={styles.infoChip}><Text style={styles.chipLabel}>Sleep Schedule</Text></View>
          </View>

          <Text style={[styles.labelTitle, { marginTop: 10 }]}>Things that help you most:</Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <CheckCircle2 size={14} color={Colors.primary} />
              <Text style={styles.bulletText}>5-minute box breathing resets before study</Text>
            </View>
            <View style={styles.bulletItem}>
              <CheckCircle2 size={14} color={Colors.primary} />
              <Text style={styles.bulletText}>Maintaining 7.5h nightly sleep targets</Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push('/onboarding/personality')}
            style={styles.retakeBtn}
          >
            <RefreshCw size={14} color={Colors.primaryDark} />
            <Text style={styles.retakeText}>Retake Wellness Assessment</Text>
          </Pressable>
        </View>

        {/* Notification Preferences (Requirement #28) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Daily Check-in Reminder (8:00 PM)</Text>
            <Switch
              value={notifications.dailyCheckin}
              onValueChange={() => toggleNotification('dailyCheckin')}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Sleep Wind-down Reminder (10:30 PM)</Text>
            <Switch
              value={notifications.sleepReminder}
              onValueChange={() => toggleNotification('sleepReminder')}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Hydration & Rest Break Reminder</Text>
            <Switch
              value={notifications.hydrationReminder}
              onValueChange={() => toggleNotification('hydrationReminder')}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>Weekly Progress Report</Text>
            <Switch
              value={notifications.weeklyProgress}
              onValueChange={() => toggleNotification('weeklyProgress')}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>
        </View>

        {/* Privacy & Aggregated Data (Requirement #26) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Shield size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Privacy & Data Protection</Text>
          </View>

          <Text style={styles.privacyDesc}>
            • Individual check-in answers and notes remain 100% private to your device.
            {"\n"}• College administration receives ONLY anonymous aggregated percentage trends.
            {"\n"}• MindMate does NOT diagnose mental illness or report student names.
          </Text>
        </View>

        {/* College Dashboard Link (Requirement #27) */}
        <Pressable
          onPress={() => router.push('/college/dashboard')}
          style={styles.actionCard}
        >
          <Building2 size={22} color={Colors.primary} />
          <View style={styles.actionCardText}>
            <Text style={styles.actionTitle}>College Wellness Dashboard (View UI)</Text>
            <Text style={styles.actionSub}>Aggregated & anonymized trends route</Text>
          </View>
          <ChevronRight size={18} color={Colors.textMuted} />
        </Pressable>

        {/* Support & Crisis Link */}
        <Pressable
          onPress={() => router.push('/support')}
          style={styles.actionCard}
        >
          <LifeBuoy size={22} color={Colors.primary} />
          <View style={styles.actionCardText}>
            <Text style={styles.actionTitle}>Help & Support Helplines</Text>
            <Text style={styles.actionSub}>24/7 student counseling resources</Text>
          </View>
          <ChevronRight size={18} color={Colors.textMuted} />
        </Pressable>
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
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  profileCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.soft,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textLight,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  userCollege: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  userCourse: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  labelTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.xs,
  },
  infoChip: {
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  bulletList: {
    gap: 6,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardSecondary,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  retakeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginLeft: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  toggleText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  privacyDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  actionCardText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  actionSub: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
