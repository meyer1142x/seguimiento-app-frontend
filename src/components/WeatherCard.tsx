import { StyleSheet, Text, View } from 'react-native';

import type { WeatherData } from '@/types';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Condiciones de la sede</Text>
      <View style={styles.row}>
        <Text style={styles.location}>{weather.city}</Text>
        <Text style={styles.icon}>{weather.icon}</Text>
      </View>
      <Text style={styles.temp}>{Math.round(weather.temperature)} °C</Text>
      <Text style={styles.condition}>{weather.condition}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EAF3FF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D0E4FF',
  },
  label: {
    color: '#385A7A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    color: '#0E2A47',
    fontSize: 18,
    fontWeight: '700',
  },
  icon: {
    fontSize: 26,
  },
  temp: {
    fontSize: 30,
    color: '#0E2A47',
    fontWeight: '800',
    marginTop: 12,
  },
  condition: {
    color: '#375D8C',
    fontSize: 14,
    marginTop: 6,
  },
});
