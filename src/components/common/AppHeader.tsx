import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, HelpCircle } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/theme';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  onBackPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  rightAction,
  transparent = false,
  onBackPress,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={[styles.container, transparent && styles.transparent]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <Pressable onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={22} color={transparent ? Colors.textLight : Colors.textPrimary} />
          </Pressable>
        )}
        {title && (
          <View>
            <Text style={[styles.title, transparent && styles.transparentText]}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightAction || (
          <Pressable
            onPress={() => router.push('/support')}
            style={styles.actionIcon}
          >
            <HelpCircle size={22} color={transparent ? Colors.textLight : Colors.textSecondary} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 6,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 1,
  },
  transparentText: {
    color: Colors.textLight,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    padding: 8,
  },
});
