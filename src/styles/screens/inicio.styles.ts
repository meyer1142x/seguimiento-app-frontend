import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const getColors = (isDark: boolean) => {
  const palette = isDark ? colors.dark : colors.light;
  return {
    bg: palette.background,
    text: palette.text,
    muted: palette.muted,
    surface: palette.surface,
    border: palette.border,
    accent: palette.accent,
    accentBlue: palette.accentBlue,
    success: palette.success,
  };
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  primaryCard: {
    backgroundColor: colors.light.accent,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  primaryCardDark: {
    backgroundColor: colors.dark.surface,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  primaryTitle: {
    color: colors.light.textOnAccent,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  summaryWrap: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  sectionTitleNoMargin: {
    marginBottom: 0,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.light.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  summaryCardDark: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
  },
  summaryLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  linkText: {
    fontWeight: '700',
    fontSize: 14,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
  },
});
