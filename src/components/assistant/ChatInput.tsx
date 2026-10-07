import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Send } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Spacing } from '../../constants/theme';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length === 0 || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Talk to MindMate Assistant..."
        placeholderTextColor={Colors.textMuted}
        value={text}
        onChangeText={setText}
        multiline
        maxLength={500}
        editable={!disabled}
      />
      <Pressable
        onPress={handleSend}
        disabled={text.trim().length === 0 || disabled}
        style={({ pressed }) => [
          styles.sendBtn,
          text.trim().length === 0 && styles.disabledSendBtn,
          pressed && styles.pressed,
        ]}
      >
        <Send size={18} color={Colors.textLight} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    maxHeight: 90,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  disabledSendBtn: {
    backgroundColor: Colors.peach,
  },
  pressed: {
    opacity: 0.8,
  },
});
