import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.light.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.light.border,
    shadowColor: colors.dark.background,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardDark: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
    shadowOpacity: 0,                                                          
    elevation: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  code: {
    color: colors.light.accent,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  codeDark: {
    color: colors.dark.accent,
  },
  title: {
    color: colors.light.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  titleDark: {
    color: '#F8FAFC',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    color: '#64748B',
    fontSize: 12,
  },
  metaTextDark: {
    color: colors.dark.muted,
  },
});
