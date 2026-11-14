import { Pressable, StyleSheet, Text } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({ event, saved, onPress, onLongPress }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.date} · {event.place}
      </Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    justifyContent: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  cardPressed: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  saved: {
    fontSize: 14,
    color: '#ca8a04',
    fontWeight: '600',
    marginTop: 6,
  },
});