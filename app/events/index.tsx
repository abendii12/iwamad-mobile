import { useState } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const { savedIds, toggleSaved } = useSavedIds();
  const [query, setQuery] = useState('');


  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.message}>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const visibleEvents = data.filter((event) =>
    event.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

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
        refreshing={isRefetching}
        onRefresh={() => refetch()}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: '#374151',
    marginTop: 12,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#b91c1c',
    textAlign: 'center',
  },
  retryButton: {
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  retryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
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