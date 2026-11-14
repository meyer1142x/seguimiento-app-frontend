import { Pressable, Text, View, useColorScheme } from 'react-native';
import type { Incident } from '@/types';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { styles } from '@/styles/components/features/IncidentCard.styles';

interface IncidentCardProps {
  incident: Incident;
  onPress?: () => void;
}

export function IncidentCard({ incident, onPress }: IncidentCardProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <Pressable onPress={onPress} style={[styles.card, isDark && styles.cardDark]}>
      <View style={styles.headerRow}>
        <Text style={[styles.code, isDark && styles.codeDark]}>{incident.id}</Text>
        <StatusBadge status={incident.status} />
      </View>

      <Text style={[styles.title, isDark && styles.titleDark]}>{incident.title}</Text>

      <View style={styles.badgesRow}>
        <CategoryBadge category={incident.category} />
        <PriorityBadge priority={incident.priority} />
      </View>

      <View style={styles.metaRow}>
        <Text style={[styles.metaText, isDark && styles.metaTextDark]}>{incident.location}</Text>
        <Text style={[styles.metaText, isDark && styles.metaTextDark]}>
          {new Date(incident.createdAt).toLocaleDateString('es-PE')}
        </Text>
      </View>
    </Pressable>
  );
}