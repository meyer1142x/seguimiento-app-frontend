import { StyleSheet, Text, View } from 'react-native';

import type { IncidentTimelineItem } from '@/types';

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

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lineColumn: {
    width: 18,
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  dotCompleted: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  dotPending: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
  },
  line: {
    width: 2,
    backgroundColor: '#E2E8F0',
    flex: 1,
    marginTop: 6,
    minHeight: 32,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
  },
  title: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  titlePending: {
    color: '#475569',
  },
  date: {
    color: '#64748B',
    fontSize: 12,
  },
});
