import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const getDynamicStyles = () => ({
  indicatorColor: colors.light.accent,
  text: { color: colors.light.mutedStrong },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    marginTop: 12,
    color: '#475569',
    fontSize: 14,
  },
});
