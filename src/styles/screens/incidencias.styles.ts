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
    chipBg: isDark ? palette.surface : palette.selectedBackground,
    chipText: isDark ? palette.mutedStrong : palette.accent,
    activeText: palette.textOnAccent,
  };
};

export const getDynamicStyles = (isDark: boolean, insets: EdgeInsets) => ({
  screen: {
    backgroundColor: (isDark ? colors.dark : colors.light).background,
    paddingTop: insets.top + 10,
  },
  sheet: { paddingBottom: insets.bottom + 16 },
});

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerWrap: {
    paddingHorizontal: 20,
  },
  chipsWrap: {
    height: 40,
  },
  chipsContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 4,
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countText: {
    fontSize: 13,
    fontWeight: '600',
  },
  clearBtn: {
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoryBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 28,
  },
  emptyWrap: {
    marginTop: 24,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  sheetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sheetRowText: {
    fontSize: 15,
  },
});
