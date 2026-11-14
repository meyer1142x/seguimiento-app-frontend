import { StyleSheet } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

export const getColors = (isDark: boolean) => {
  const palette = isDark ? colors.dark : colors.light;
  return {
    bg: palette.background,
    text: palette.text,
    muted: palette.muted,
    surface: palette.surface,
    border: palette.border,
  };
};

export const getDynamicStyles = (isDark: boolean, insets: EdgeInsets) => ({
  screen: {
    backgroundColor: (isDark ? colors.dark : colors.light).background,
    paddingTop: insets.top + 10,
  },
});

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  profileCard: {
    backgroundColor: colors.light.accent,
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  profileCardDark: {
    backgroundColor: colors.dark.surface,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EAF3FF',
    color: colors.light.accent,
    fontWeight: '800',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 72,                                                                                   
    marginBottom: 12,
    overflow: 'hidden',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  role: {
    color: '#D7E6F8',
    marginTop: 6,
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: colors.light.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.light.border,
    padding: 16,
    marginBottom: 18,
  },
  infoCardDark: {
    backgroundColor: colors.dark.surface,
    borderColor: colors.dark.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 12,                                                            
  },
  rowDark: {
    borderBottomColor: colors.dark.border,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  label: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'right',
    flexShrink: 1,
  },
  actions: {
    gap: 12,
  },
});
