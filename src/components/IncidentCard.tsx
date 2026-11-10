import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Incident } from '@/types';

import { CategoryBadge } from './CategoryBadge';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';

interface IncidentCardProps {
  incident: Incident;
  onPress?: () => void;
}

export function IncidentCard({ incident, onPress }: IncidentCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.code}>{incident.id}</Text>
        <StatusBadge status={incident.status} />
      </View>

      <Text style={styles.title}>{incident.title}</Text>

      <View style={styles.badgesRow}>
        <CategoryBadge category={incident.category} />
        <PriorityBadge priority={incident.priority} />
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{incident.location}</Text>
        <Text style={styles.metaText}>{new Date(incident.createdAt).toLocaleDateString('es-PE')}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  code: {
    color: '#0E2A47',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  title: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    color: '#64748B',
    fontSize: 12,
  },
});
