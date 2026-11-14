import { Text, View } from 'react-native';
import type { IncidentTimelineItem } from '@/types';
import { styles } from '@/styles/components/features/IncidentTimeline.styles';

interface IncidentTimelineProps {
  items: IncidentTimelineItem[];
}

export function IncidentTimeline({ items }: IncidentTimelineProps) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.lineColumn}>
            <View style={[styles.dot, item.completed ? styles.dotCompleted : styles.dotPending]} />
            {index !== items.length - 1 ? <View style={styles.line} /> : null}
          </View>

          <View style={styles.content}>
            <Text style={[styles.title, !item.completed && styles.titlePending]}>{item.description}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
