import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { CategoryBadge } from '@/components/CategoryBadge';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Header } from '@/components/Header';
import { IncidentTimeline } from '@/components/IncidentTimeline';
import { Loading } from '@/components/Loading';
import { PriorityBadge } from '@/components/PriorityBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { getIncidentById } from '@/services/incidentsService';
import type { Incident } from '@/types';

export default function IncidentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadIncident();
  }, [id]);

  async function loadIncident() {
    if (!id) {
      setLoading(false);
      return;
    }

    const result = await getIncidentById(id);
    setIncident(result ?? null);
    setLoading(false);
  }

  if (loading) {
    return <Loading message="Cargando detalle de incidencia..." />;
  }

  if (!incident) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ErrorMessage message="No se encontró la incidencia." />
          <Button title="Volver" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header title={incident.id} subtitle={incident.title} />

        <View style={styles.headerRow}>
          <StatusBadge status={incident.status} />
          <CategoryBadge category={incident.category} />
        </View>

        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Text style={styles.label}>Categoría</Text>
            <Text style={styles.value}>{incident.category}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.label}>Prioridad</Text>
            <PriorityBadge priority={incident.priority} />
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.label}>Ubicación</Text>
            <Text style={styles.value}>{incident.location}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.label}>Fecha</Text>
            <Text style={styles.value}>{new Date(incident.createdAt).toLocaleDateString('es-PE')}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.label}>Estado</Text>
            <Text style={styles.value}>{incident.status}</Text>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{incident.description}</Text>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Seguimiento</Text>
          <IncidentTimeline items={incident.timeline ?? []} />
        </View>

        <Button title="Volver a incidencias" onPress={() => router.push('/(tabs)/incidencias')} />
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
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  metaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  label: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 13,
  },
  value: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'right',
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 22,
  },
});
