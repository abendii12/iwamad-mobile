import { useState } from 'react';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  const visibleEvents = events.filter((event) =>
    event.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function toggleSaved(id: number) {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Long-press an event to save it. Saved: {savedIds.length}</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search events"
        style={styles.search}
      />

      <FlatList
        data={visibleEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  hint: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  search: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
    marginTop: 24,
  },
});