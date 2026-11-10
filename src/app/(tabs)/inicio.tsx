import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Header } from '@/components/Header';
import { IncidentCard } from '@/components/IncidentCard';
import { Loading } from '@/components/Loading';
import { WeatherCard } from '@/components/WeatherCard';
import { currentUser } from '@/mocks/users';
import { getIncidents } from '@/services/incidentsService';
import { getCurrentWeather } from '@/services/weatherService';
import type { Incident, WeatherData } from '@/types';

export default function DashboardScreen() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    void loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const [incidentsResult, weatherResult] = await Promise.all([
        getIncidents(),
        getCurrentWeather(),
      ]);

      setIncidents(incidentsResult);
      setWeatherData(weatherResult);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar la información.';
      setWeatherError(message);
    } finally {
      setLoading(false);
    }
  }

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header title={`Hola, ${currentUser.name.split(' ')[0]} 👋`} subtitle="¿Qué necesitas hoy?" />

        <View style={styles.primaryCard}>
          <Text style={styles.primaryTitle}>Reportar una incidencia</Text>
          <Button title="+ Nueva incidencia" onPress={() => router.push('/(tabs)/reportar')} />
        </View>

        {weatherError ? <ErrorMessage message={weatherError} /> : null}
        {weatherData ? <WeatherCard weather={weatherData} /> : null}

        <View style={styles.summaryWrap}>
          <Text style={styles.sectionTitle}>Resumen</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Pendientes</Text>
              <Text style={styles.summaryValue}>{summary.pendiente}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>En proceso</Text>
              <Text style={styles.summaryValue}>{summary.proceso}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Resueltas</Text>
              <Text style={styles.summaryValue}>{summary.resueltas}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mis incidencias recientes</Text>
          <Text style={styles.linkText} onPress={() => router.push('/(tabs)/incidencias')}>
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
          <Text style={styles.emptyText}>No hay incidencias recientes.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F7FB',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryCard: {
    backgroundColor: '#0E2A47',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  primaryTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  summaryWrap: {
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryValue: {
    color: '#0F172A',
    fontSize: 28,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
  },
});
