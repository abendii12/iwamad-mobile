import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Dilnaz Aben</Text>

      <Text style={styles.likes}>Likes: {likes}</Text>
      <Pressable onPress={() => setLikes(likes + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      <Link href="/events" asChild>
        <Pressable style={styles.eventsButton}>
          <Text style={styles.buttonText}>Events</Text>
        </Pressable>
      </Link>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    marginTop: 8,
  },
  likes: {
    fontSize: 20,
    marginTop: 32,
  },
  button: {
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  eventsButton: {
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: '#16a34a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});