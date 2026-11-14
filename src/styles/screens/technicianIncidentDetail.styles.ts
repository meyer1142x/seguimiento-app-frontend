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
    description: palette.description,
  };
};

export const getDynamicStyles = (isDark: boolean, insets: EdgeInsets) => {
  const palette = isDark ? colors.dark : colors.light;
  return {
    screen: {
      backgroundColor: palette.background,
      paddingTop: insets.top,
    },
    actionFooter: {
      backgroundColor: palette.surface,
      borderTopColor: palette.border,
      paddingBottom: insets.bottom > 0 ? insets.bottom : 20,
    },
  };
};

export const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backBtnFallback: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  centerContent: { padding: 20 },
  fallbackText: { color: '#FFFFFF', fontWeight: '700' },
  loadingText: { color: '#64748B', marginTop: 12, fontWeight: '600' },
  ticketId: { fontWeight: '700' },
  resolvedButton: { backgroundColor: '#10B981', borderColor: '#10B981' },
  screen: { flex: 1 },
  navBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, paddingTop: 8, borderBottomWidth: StyleSheet.hairlineWidth },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  navTitle: { fontSize: 17, fontWeight: '700', marginLeft: 4 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 24 },
  headerBlock: { marginBottom: 24 },
  statusWrap: { alignSelf: 'flex-start', marginBottom: 14 },
  mainTitle: { fontSize: 26, fontWeight: '800', marginBottom: 8, lineHeight: 32 },
  dateText: { fontSize: 14 },
  card: { borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1 },
  sectionTitle: { fontSize: 15, fontWeight: '800', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  gridItem: { width: '46%', marginBottom: 8 },
  gridLabel: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  gridValue: { fontSize: 14, fontWeight: '700' },
  descriptionText: { fontSize: 15, lineHeight: 24 },
  evidenceImage: { width: '100%', height: 200, borderRadius: 12, backgroundColor: '#CBD5E1' },
  actionFooter: {
    paddingHorizontal: 20, paddingTop: 16, borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 10,
  },
  completedMessage: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10 },
  completedText: { fontSize: 15, fontWeight: '700' }
});
