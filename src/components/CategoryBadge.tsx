import { StyleSheet, Text, View } from 'react-native';

import type { IncidentCategory } from '@/types';

const categoryMap: Record<IncidentCategory, { label: string; color: string; bg: string }> = {
  Hardware: { label: 'Hardware', color: '#1D4ED8', bg: '#DBEAFE' },
  Software: { label: 'Software', color: '#7C3AED', bg: '#EDE9FE' },
  Redes: { label: 'Redes', color: '#0F766E', bg: '#CCFBF1' },
  Otro: { label: 'Otro', color: '#475569', bg: '#E2E8F0' },
};

export function CategoryBadge({ category }: { category: IncidentCategory }) {
  const config = categoryMap[category];

  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
