import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Sun, Moon, Wind, Heart, Flower2, Sparkles, RefreshCw } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';
import { PrimaryButton } from '../common/PrimaryButton';

interface CardItem {
  id: number;
  iconName: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ICONS = ['sun', 'moon', 'wind', 'heart', 'flower', 'sparkles'];

export const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchesCount, setMatchesCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const deck = [...ICONS, ...ICONS];
    const shuffled = deck
      .sort(() => Math.random() - 0.5)
      .map((iconName, index) => ({
        id: index,
        iconName,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchesCount(0);
    setIsGameOver(false);
  };

  const handleCardPress = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (newCards[firstIdx].iconName === newCards[secondIdx].iconName) {
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        const newMatches = matchesCount + 1;
        setMatchesCount(newMatches);
        if (newMatches === ICONS.length) {
          setIsGameOver(true);
        }
      } else {
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'sun': return <Sun size={28} color={Colors.primary} />;
      case 'moon': return <Moon size={28} color={Colors.primary} />;
      case 'wind': return <Wind size={28} color={Colors.primary} />;
      case 'heart': return <Heart size={28} color={Colors.primary} />;
      case 'flower': return <Flower2 size={28} color={Colors.primary} />;
      default: return <Sparkles size={28} color={Colors.primary} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Matches: {matchesCount} / {ICONS.length}</Text>
        <Pressable onPress={initGame} style={styles.resetBtn}>
          <RefreshCw size={16} color={Colors.primary} />
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      {isGameOver ? (
        <View style={styles.winCard}>
          <Sparkles size={48} color={Colors.primary} />
          <Text style={styles.winTitle}>Mind Cleared!</Text>
          <Text style={styles.winText}>Great job focusing your attention and quieting racing thoughts.</Text>
          <PrimaryButton title="Play Again" onPress={initGame} style={{ marginTop: Spacing.md }} />
        </View>
      ) : (
        <View style={styles.grid}>
          {cards.map((card, idx) => (
            <Pressable
              key={card.id}
              onPress={() => handleCardPress(idx)}
              style={[
                styles.cardTile,
                (card.isFlipped || card.isMatched) && styles.cardFlipped,
                card.isMatched && styles.cardMatched,
              ]}
            >
              {card.isFlipped || card.isMatched ? (
                renderIcon(card.iconName)
              ) : (
                <View style={styles.cardBack}>
                  <Sparkles size={20} color={Colors.textMuted} />
                </View>
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.lightOrange,
  },
  resetText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primaryDark,
    marginLeft: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  cardTile: {
    width: '28%',
    height: 90,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFlipped: {
    backgroundColor: Colors.card,
    borderColor: Colors.primary,
  },
  cardMatched: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success,
  },
  cardBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  winCard: {
    backgroundColor: Colors.card,
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginVertical: Spacing.lg,
  },
  winTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
  },
  winText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginVertical: Spacing.sm,
  },
});
