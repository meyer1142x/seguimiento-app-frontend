import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
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
    backgroundColor: colors.light.surface,
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
    backgroundColor: colors.light.backgroundSubtle,
    borderRadius: 12,
    padding: 12,
  },
  title: {
    color: colors.light.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  titlePending: {
    color: '#475569',
  },
  date: {
    color: colors.light.muted,
    fontSize: 12,
  },
});
