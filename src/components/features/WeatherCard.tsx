import { Text, View } from 'react-native';
import type { WeatherData } from '@/types';
import { styles } from '@/styles/components/features/WeatherCard.styles';

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
