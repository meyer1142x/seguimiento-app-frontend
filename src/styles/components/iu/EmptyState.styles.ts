import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 18,
    backgroundColor: colors.light.backgroundSubtle,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.light.text,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: colors.light.mutedStrong,
    textAlign: 'center',
    marginBottom: 18,
  },
  button: {
    width: '100%',
  },
});
