import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EAF3FF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D0E4FF',
  },
  label: {
    color: '#385A7A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    color: colors.light.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  icon: {
    fontSize: 26,
  },
  temp: {
    fontSize: 30,
    color: colors.light.accent,
    fontWeight: '800',
    marginTop: 12,
  },
  condition: {
    color: '#375D8C',
    fontSize: 14,
    marginTop: 6,
  },
});
