import { StyleSheet } from 'react-native';
import type { IncidentPriority } from '@/types';

const priorityMap: Record<
  IncidentPriority,
  { label: string; color: string; backgroundColor: string; icon: string }
> = {
  BAJA: { label: 'BAJA', color: '#166534', backgroundColor: '#DCFCE7', icon: '↓' },
  MEDIA: { label: 'MEDIA', color: '#A16207', backgroundColor: '#FEF3C7', icon: '→' },
  ALTA: { label: 'ALTA', color: '#B91C1C', backgroundColor: '#FEE2E2', icon: '⚠️' },
  CRÍTICA: { label: 'CRÍTICA', color: '#7F1D1D', backgroundColor: '#FECACA', icon: '⛔' },
};

export const getDynamicStyles = (priority: IncidentPriority) => {
  const config = priorityMap[priority];
  return {
    container: { backgroundColor: config.backgroundColor },
    text: { color: config.color },
    label: config.label,
    icon: config.icon,
  };
};

export const styles = StyleSheet.create({
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
