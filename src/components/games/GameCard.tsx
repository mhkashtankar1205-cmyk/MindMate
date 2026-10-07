import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Grid, Sparkles, Target, Flower2, Play } from 'lucide-react-native';
import { GameItem } from '../../types/content';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';

interface GameCardProps {
  game: GameItem;
}

const getGameIcon = (iconName: string) => {
  switch (iconName) {
    case 'grid': return <Grid size={24} color={Colors.primary} />;
    case 'sparkles': return <Sparkles size={24} color={Colors.primary} />;
    case 'target': return <Target size={24} color={Colors.primary} />;
    default: return <Flower2 size={24} color={Colors.primary} />;
  }
};

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(game.route as never)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrapper}>
        {getGameIcon(game.iconName)}
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{game.category}</Text>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{game.description}</Text>
        <Text style={styles.benefit} numberOfLines={1}>• {game.benefit}</Text>
      </View>
      <View style={styles.playButton}>
        <Play size={16} color={Colors.textLight} fill={Colors.textLight} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.soft,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  info: {
    flex: 1,
  },
  category: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  benefit: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
    fontStyle: 'italic',
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.xs,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
