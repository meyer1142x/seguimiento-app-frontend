import { StyleSheet } from 'react-native';
import type { IncidentStatus } from '@/types';

const statusMap: Record<
  IncidentStatus,
  { label: string; color: string; backgroundColor: string; icon: string }
> = {
  PENDIENTE: { label: 'PENDIENTE', color: '#854D0E', backgroundColor: '#FEF3C7', icon: '⏳' },
  'EN PROCESO': { label: 'EN PROCESO', color: '#1D4ED8', backgroundColor: '#DBEAFE', icon: '🔄' },
  RESUELTA: { label: 'RESUELTA', color: '#166534', backgroundColor: '#DCFCE7', icon: '✅' },
  CERRADA: { label: 'CERRADA', color: '#374151', backgroundColor: '#E5E7EB', icon: '🔒' },
};

export const getDynamicStyles = (status: IncidentStatus) => {
  const config = statusMap[status];
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
