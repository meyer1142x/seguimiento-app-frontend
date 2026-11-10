import { useFocusEffect, router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { Header } from '@/components/Header';
import { IncidentCard } from '@/components/IncidentCard';
import { Loading } from '@/components/Loading';
import { getIncidents } from '@/services/incidentsService';
import type { Incident, IncidentCategory, IncidentStatus } from '@/types';

const statusOptions: Array<'Todas' | IncidentStatus> = ['Todas', 'PENDIENTE', 'EN PROCESO', 'RESUELTA', 'CERRADA'];
const categoryOptions: Array<'Todas' | IncidentCategory> = ['Todas', 'Hardware', 'Software', 'Redes', 'Otro'];

export default function IncidentsScreen() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'Todas' | IncidentStatus>('Todas');
  const [categoryFilter, setCategoryFilter] = useState<'Todas' | IncidentCategory>('Todas');

  const loadIncidents = useCallback(async () => {
    setLoading(true);
    const items = await getIncidents();
    setIncidents(items);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadIncidents();
    }, [loadIncidents]),
  );

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const byStatus = statusFilter === 'Todas' || incident.status === statusFilter;
      const byCategory = categoryFilter === 'Todas' || incident.category === categoryFilter;
      return byStatus && byCategory;
    });
  }, [incidents, statusFilter, categoryFilter]);

  if (loading) {
    return <Loading message="Cargando incidencias..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Mis incidencias" subtitle="Consulta y revisa el estado de tus reportes." />

        <Text style={styles.filterTitle}>Filtrar por estado</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {statusOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => setStatusFilter(option)}
              style={[styles.pill, statusFilter === option && styles.pillActive]}>
              <Text style={[styles.pillText, statusFilter === option && styles.pillTextActive]}>{option}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={[styles.filterTitle, { marginTop: 18 }]}>Filtrar por categoría</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {categoryOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => setCategoryFilter(option)}
              style={[styles.pill, categoryFilter === option && styles.pillActive]}>
              <Text style={[styles.pillText, categoryFilter === option && styles.pillTextActive]}>{option}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {filteredIncidents.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              title="No tienes incidencias registradas."
              message="Aún no hay reportes para los filtros seleccionados."
              buttonTitle="Reportar incidencia"
              onPress={() => router.push('/(tabs)/reportar')}
            />
          </View>
        ) : (
          <FlatList
            data={filteredIncidents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <IncidentCard
                incident={item}
                onPress={() => router.push({ pathname: '/incidencias/[id]', params: { id: item.id } })}
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F7FB',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  filterTitle: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  filterRow: {
    marginBottom: 6,
  },
  pill: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#EAF3FF',
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#0E2A47',
  },
  pillText: {
    color: '#0E2A47',
    fontSize: 12,
    fontWeight: '700',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
  list: {
    paddingBottom: 28,
  },
  emptyWrap: {
    marginTop: 18,
  },
});
