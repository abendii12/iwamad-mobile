import { StyleSheet, Text } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type HolidayNoteProps = {
  date: string;
};

export default function HolidayNote({ date }: HolidayNoteProps) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.muted}>Checking holidays</Text>;
  }

  if (isError) {
    return <Text style={styles.muted}>Holidays unavailable</Text>;
  }

  const holiday = data.find((item) => item.date === date);

  if (holiday) {
    return <Text style={styles.holiday}>Public holiday: {holiday.name}</Text>;
  }

  return <Text style={styles.muted}>Not a public holiday</Text>;
}

const styles = StyleSheet.create({
  muted: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  holiday: {
    fontSize: 16,
    color: '#15803d',
    fontWeight: '600',
    marginBottom: 8,
  },
});