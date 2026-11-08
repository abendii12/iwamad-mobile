import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { events } from '../../src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item) => item.id === Number(id));

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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});