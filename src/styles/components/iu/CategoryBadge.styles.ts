import { StyleSheet } from 'react-native';
import type { IncidentCategory } from '@/types';

export const getDynamicStyles = (category: IncidentCategory) => {
  const categoryColors: Record<IncidentCategory, { color: string; backgroundColor: string }> = {
    Hardware: { color: '#1D4ED8', backgroundColor: '#DBEAFE' },
    Software: { color: '#7C3AED', backgroundColor: '#EDE9FE' },
    Redes: { color: '#0F766E', backgroundColor: '#CCFBF1' },
    Otro: { color: '#475569', backgroundColor: '#E2E8F0' },
  };
  const palette = categoryColors[category];
  return {
    container: { backgroundColor: palette.backgroundColor },
    text: { color: palette.color },
  };
};

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    fontSize: 11,
  },
});
