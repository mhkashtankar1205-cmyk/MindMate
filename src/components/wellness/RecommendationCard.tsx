import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Clock, ArrowRight, Wind, Timer, Compass, Moon, Flower2, Footprints, Sparkles } from 'lucide-react-native';
import { RecommendationItem } from '../../types/recommendation';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';

interface RecommendationCardProps {
  item: RecommendationItem;
  horizontal?: boolean;
}

const getIcon = (name: string, size = 22, color = Colors.primary) => {
  switch (name) {
    case 'wind': return <Wind size={size} color={color} />;
    case 'timer': return <Timer size={size} color={color} />;
    case 'compass': return <Compass size={size} color={color} />;
    case 'moon': return <Moon size={size} color={color} />;
    case 'flower-2': return <Flower2 size={size} color={color} />;
    case 'footprints': return <Footprints size={size} color={color} />;
    default: return <Sparkles size={size} color={color} />;
  }
};

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  item,
  horizontal = false,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (item.actionRoute) {
      router.push(item.actionRoute as never);
    } else {
      router.push(`/recommendations/${item.id}` as never);
    }
  };

  if (horizontal) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.horizontalCard, pressed && styles.pressed]}
      >
        <View style={styles.horizontalIconWrapper}>{getIcon(item.iconName, 24, Colors.primary)}</View>
        <View style={styles.horizontalContent}>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.whyText} numberOfLines={1}>{item.whyRecommended}</Text>
          <View style={styles.metaRow}>
            <Clock size={12} color={Colors.textMuted} />
            <Text style={styles.metaText}>{item.durationMinutes} min</Text>
            <View style={styles.badgeDot} />
            <Text style={styles.metaText}>{item.difficulty}</Text>
          </View>
        </View>
        <View style={styles.startArrow}>
          <ArrowRight size={18} color={Colors.primary} />
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconWrapper}>{getIcon(item.iconName, 24, Colors.primary)}</View>
        <View style={styles.durationBadge}>
          <Clock size={12} color={Colors.primaryDark} />
          <Text style={styles.durationText}>{item.durationMinutes} min</Text>
        </View>
      </View>

      <Text style={styles.categoryText}>{item.category}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{item.shortDescription}</Text>

      <View style={styles.footer}>
        <Text style={styles.whyText} numberOfLines={1}>{item.whyRecommended}</Text>
        <View style={styles.startBtn}>
          <Text style={styles.startBtnText}>Start</Text>
          <ArrowRight size={14} color={Colors.textLight} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: 6,
    ...Shadows.soft,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  whyText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontStyle: 'italic',
    flex: 1,
    marginRight: 8,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  startBtnText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  horizontalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    width: 280,
    marginRight: Spacing.md,
    ...Shadows.soft,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  horizontalIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm + 4,
  },
  horizontalContent: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginLeft: 3,
  },
  badgeDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.textMuted,
    marginHorizontal: 5,
  },
  startArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
