import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const getDynamicStyles = (isDark: boolean) => {
  const palette = isDark ? colors.dark : colors.light;
  return {
    label: { color: palette.text },
    input: {
      backgroundColor: palette.surface,
      borderColor: palette.border,
      color: palette.text,
    },
    placeholderTextColor: palette.mutedLight,
  };
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorBorder: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 6,
  },
});
