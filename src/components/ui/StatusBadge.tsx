import { Text, View } from 'react-native';
import type { IncidentStatus } from '@/types';
import { getDynamicStyles, styles } from '@/styles/components/ui/StatusBadge.styles';

export function StatusBadge({ status }: { status: IncidentStatus }) {
  const config = getDynamicStyles(status);

  return (
    <View style={[styles.container, config.container]}>
      <Text style={styles.icon}>{config.icon}</Text>
      <Text style={[styles.text, config.text]}>{config.label}</Text>
    </View>
  );
}
