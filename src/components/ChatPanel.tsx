import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');
  const isEmpty = text.trim() === '';

  useEffect(() => {
    askNotificationPermission();
  }, []);

  function handleSend() {
    if (isEmpty) {
      return;
    }
    sendMessage(eventId, text.trim());
    setText('');
  }

  // Firebase gives the oldest first; the screen shows the newest first.
  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.panel}>
      <Text style={styles.heading}>Live chat</Text>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Write a message"
        placeholderTextColor="#9ca3af"
        maxLength={200}
      />

      <Pressable
        onPress={handleSend}
        disabled={isEmpty}
        accessibilityRole="button"
        style={isEmpty ? styles.buttonDisabled : styles.button}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text style={styles.muted}>Connecting</Text>}
      {status === 'error' && <Text style={styles.error}>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && (
        <Text style={styles.muted}>No messages yet</Text>
      )}

      {newestFirst.map((message) => (
        <Text key={message.id} style={styles.message}>
          {message.author}: {message.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  buttonDisabled: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  muted: {
    fontSize: 16,
    color: '#6b7280',
  },
  error: {
    fontSize: 16,
    color: '#b91c1c',
  },
  message: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
});