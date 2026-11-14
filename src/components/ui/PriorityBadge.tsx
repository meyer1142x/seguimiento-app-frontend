import { Text, View } from 'react-native';
import type { IncidentPriority } from '@/types';
import { getDynamicStyles, styles } from '@/styles/components/ui/PriorityBadge.styles';

export function PriorityBadge({ priority }: { priority: IncidentPriority }) {
  const config = getDynamicStyles(priority);

  return (
    <View style={[styles.container, config.container]}>
      <Text style={styles.icon}>{config.icon}</Text>
      <Text style={[styles.text, config.text]}>{config.label}</Text>
    </View>
  );
}
