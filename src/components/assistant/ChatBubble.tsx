import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Bot, User, ArrowUpRight } from 'lucide-react-native';
import { ChatMessage } from '../../data/mockChat';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';
import { useRouter } from 'expo-router';

interface ChatBubbleProps {
  message: ChatMessage;
  onQuickReplyPress?: (reply: string) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  onQuickReplyPress,
}) => {
  const router = useRouter();
  const isUser = message.sender === 'user';

  return (
    <View style={[styles.wrapper, isUser ? styles.userWrapper : styles.assistantWrapper]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Bot size={18} color={Colors.textLight} />
        </View>
      )}

      <View style={styles.bubbleContainer}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
          <Text style={[styles.text, isUser ? styles.userText : styles.assistantText]}>
            {message.text}
          </Text>
        </View>

        <Text style={[styles.time, isUser ? { textAlign: 'right' } : null]}>
          {message.timestamp}
        </Text>

        {/* Suggested Action Card */}
        {message.suggestedAction && (
          <Pressable
            onPress={() => router.push(message.suggestedAction!.route as never)}
            style={styles.actionCard}
          >
            <Text style={styles.actionText}>{message.suggestedAction.label}</Text>
            <ArrowUpRight size={16} color={Colors.primary} />
          </Pressable>
        )}

        {/* Quick Reply Chips */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <View style={styles.quickRepliesRow}>
            {message.quickReplies.map((reply, index) => (
              <Pressable
                key={index}
                onPress={() => onQuickReplyPress && onQuickReplyPress(reply)}
                style={({ pressed }) => [styles.quickReplyChip, pressed && styles.chipPressed]}
              >
                <Text style={styles.quickReplyText}>{reply}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {isUser && (
        <View style={[styles.avatar, styles.userAvatar]}>
          <User size={18} color={Colors.textLight} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  assistantWrapper: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  userAvatar: {
    backgroundColor: Colors.textSecondary,
    marginLeft: 8,
  },
  bubbleContainer: {
    maxWidth: '80%',
    marginLeft: 8,
  },
  bubble: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  assistantBubble: {
    backgroundColor: Colors.card,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  assistantText: {
    color: Colors.textPrimary,
  },
  userText: {
    color: Colors.textLight,
    fontWeight: '500',
  },
  time: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 4,
    marginHorizontal: 4,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  quickRepliesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.sm,
    gap: 6,
  },
  quickReplyChip: {
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  quickReplyText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  chipPressed: {
    backgroundColor: Colors.lightOrange,
  },
});
