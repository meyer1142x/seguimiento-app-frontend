import { StyleSheet, Text, View } from 'react-native';

import type { IncidentStatus } from '@/types';

const statusMap: Record<
  IncidentStatus,
  { label: string; color: string; bg: string; icon: string }
> = {
  PENDIENTE: { label: 'PENDIENTE', color: '#854D0E', bg: '#FEF3C7', icon: '⏳' },
  'EN PROCESO': { label: 'EN PROCESO', color: '#1D4ED8', bg: '#DBEAFE', icon: '🔄' },
  RESUELTA: { label: 'RESUELTA', color: '#166534', bg: '#DCFCE7', icon: '✅' },
  CERRADA: { label: 'CERRADA', color: '#374151', bg: '#E5E7EB', icon: '🔒' },
};

export function StatusBadge({ status }: { status: IncidentStatus }) {
  const config = statusMap[status];

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
