import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Header } from '@/components/ui/Header';
import { IncidentCard } from '@/components/features/IncidentCard';
import { Loading } from '@/components/ui/Loading';
import { WeatherCard } from '@/components/features/WeatherCard';
import { currentUser } from '@/mocks/users';
import { getIncidents } from '@/services/incidentsService';
import { getCurrentWeather } from '@/services/weatherService';
import type { Incident, WeatherData } from '@/types';
import { getColors, styles } from '@/styles/screens/inicio.styles';

export default function DashboardScreen() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const isDark = useColorScheme() === 'dark';
  const colors = getColors(isDark);

  useEffect(() => {
    let active = true;

    void Promise.all([getIncidents(), getCurrentWeather()])
      .then(([incidentsResult, weatherResult]) => {
        if (active) {
          setIncidents(incidentsResult);
          setWeatherData(weatherResult);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          const message = error instanceof Error ? error.message : 'Error al cargar la información.';
          setWeatherError(message);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => {
    return {
      pendiente: incidents.filter((incident) => incident.status === 'PENDIENTE').length,
      proceso: incidents.filter((incident) => incident.status === 'EN PROCESO').length,
      resueltas: incidents.filter((incident) => incident.status === 'RESUELTA').length,
    };
  }, [incidents]);

  const recent = incidents.slice(0, 3);

  if (loading) {
    return <Loading message="Preparando tu panel de incidencias..." />;
  }

  return (
    <SafeAreaView 
      edges={['top']} 
      style={[styles.safeArea, { backgroundColor: colors.bg }]}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header title={`Hola, ${currentUser.name.split(' ')[0]} 👋`} subtitle="¿Qué necesitas hoy?" />

        <View style={[styles.primaryCard, isDark && styles.primaryCardDark]}>
          <Text style={styles.primaryTitle}>Reportar una incidencia</Text>
          <Button title="+ Nueva incidencia" onPress={() => router.push('/(tabs)/reportar')} />
        </View>

        {weatherError ? <ErrorMessage message={weatherError} /> : null}
        {weatherData ? <WeatherCard weather={weatherData} /> : null}

        <View style={styles.summaryWrap}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Resumen
          </Text>
          <View style={styles.summaryGrid}>
            <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
              <Text style={[styles.summaryLabel, { color: colors.muted }]}>Pendientes</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{summary.pendiente}</Text>
            </View>
            <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
              <Text style={[styles.summaryLabel, { color: colors.muted }]}>En proceso</Text>
              <Text style={[styles.summaryValue, { color: colors.accentBlue }]}>{summary.proceso}</Text>
            </View>
            <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
              <Text style={[styles.summaryLabel, { color: colors.muted }]}>Resueltas</Text>
              <Text style={[styles.summaryValue, { color: colors.success }]}>{summary.resueltas}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, styles.sectionTitleNoMargin, { color: colors.text }]}>
            Mis incidencias recientes
          </Text>
          <Text 
            style={[styles.linkText, { color: colors.accentBlue }]} 
            onPress={() => router.push('/(tabs)/incidencias')}
          >
            Ver todas
          </Text>
        </View>

        {recent.length > 0 ? (
          recent.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onPress={() => router.push({ pathname: '/incidencias/[id]', params: { id: incident.id } })}
            />
          ))
        ) : (
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            No hay incidencias recientes.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}