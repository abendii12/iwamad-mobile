import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import HolidayNote from '../../src/components/HolidayNote';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Loading…' }} />
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Error' }} />
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.message}>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event not found' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.text}>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.text}>Date: {event.date}</Text>
      <HolidayNote date={event.date} />
      <Text style={styles.text}>Place: {event.place}</Text>
      <Text style={styles.text}>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
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
});