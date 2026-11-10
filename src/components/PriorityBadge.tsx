import { StyleSheet, Text, View } from 'react-native';

import type { IncidentPriority } from '@/types';

const priorityMap: Record<IncidentPriority, { label: string; color: string; bg: string; icon: string }> = {
  BAJA: { label: 'BAJA', color: '#166534', bg: '#DCFCE7', icon: '↓' },
  MEDIA: { label: 'MEDIA', color: '#A16207', bg: '#FEF3C7', icon: '→' },
  ALTA: { label: 'ALTA', color: '#B91C1C', bg: '#FEE2E2', icon: '⚠️' },
  CRÍTICA: { label: 'CRÍTICA', color: '#7F1D1D', bg: '#FECACA', icon: '⛔' },
};

export function PriorityBadge({ priority }: { priority: IncidentPriority }) {
  const config = priorityMap[priority];

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <Text style={styles.icon}>{config.icon}</Text>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: 12,
    marginRight: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
