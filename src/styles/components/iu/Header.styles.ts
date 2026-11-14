import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const getDynamicStyles = (isDark: boolean) => {
  const palette = isDark ? colors.dark : colors.light;
  return {
    title: { color: palette.text },
    subtitle: { color: isDark ? palette.muted : palette.mutedStrong },
  };
};

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },
});
