import { StyleSheet } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

export const getColors = (isDark: boolean) => {
  const palette = isDark ? colors.dark : colors.light;
  return {
    bg: palette.background,
    text: palette.text,
    muted: isDark ? palette.muted : palette.mutedStrong,
    accentBlue: palette.accentBlue,
  };
};

export const getDynamicStyles = (insets: EdgeInsets) => ({
  container: { paddingTop: insets.top + 20 },
});

export const styles = StyleSheet.create({
  screen: { flex: 1 },
  keyboardView: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingBottom: 40 },
  brandBox: { alignItems: 'center', marginBottom: 40 },
  logoBox: {
    width: 86, height: 86, backgroundColor: colors.light.accent, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    shadowColor: colors.light.accent, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  logoText: {   color: colors.light.textOnAccent, fontSize: 32, fontWeight: '900', letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, paddingHorizontal: 10 },
  formCard: { borderRadius: 24, padding: 24, borderWidth: 1 },
  formCardLight: {
    backgroundColor: colors.light.surface, borderColor: colors.light.border,
    shadowColor: colors.light.text, shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05, shadowRadius: 20, elevation: 4,
  },
  formCardDark: { backgroundColor: colors.dark.surface, borderColor: colors.dark.border, shadowOpacity: 0, elevation: 0 },
  optionsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 24, marginTop: -4 },
  toggleText: { fontSize: 13, fontWeight: '700' },
  actionButtons: { gap: 12 },                          
});
