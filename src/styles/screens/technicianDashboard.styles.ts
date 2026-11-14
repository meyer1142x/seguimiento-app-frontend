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
    accent: palette.accent,
  };
};

export const getDynamicStyles = (isDark: boolean, insets: EdgeInsets) => ({
  screen: {
    backgroundColor: (isDark ? colors.dark : colors.light).background,
    paddingTop: insets.top + 10,
  },
});

export const styles = StyleSheet.create({
  screen: { flex: 1 },
  innerFlex: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  logoutIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  tabsWrapper: {
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabTextActive: {
    fontWeight: '800',
  },
  summaryRow: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyWrap: {
    marginTop: 32,
  },
});
