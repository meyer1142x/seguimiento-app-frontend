import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

export const getDynamicStyles = (
  isDark: boolean,
  disabled: boolean,
  variant: ButtonVariant,
  pressed: boolean,
) => {
  const palette = isDark ? colors.dark : colors.light;
  let backgroundColor: string;
  let textColor: string;
  let borderColor = 'transparent';

  if (disabled) {
    backgroundColor = isDark ? palette.border : '#E2E8F0';
    textColor = palette.mutedLight;
  } else if (variant === 'secondary') {
    backgroundColor = isDark ? palette.surface : palette.selectedBackground;
    textColor = isDark ? palette.text : palette.accent;
    borderColor = isDark ? palette.border : palette.selectedBorder;
  } else if (variant === 'danger') {
    backgroundColor = isDark ? '#450A0A' : '#FDECEC';
    textColor = isDark ? '#FCA5A5' : '#DC2626';
    borderColor = isDark ? '#7F1D1D' : 'transparent';
  } else {
    backgroundColor = palette.accent;
    textColor = isDark ? palette.textOnAccent : palette.textOnAccent;
  }

  return {
    button: {
      backgroundColor,
      borderColor,
      borderWidth: variant === 'secondary' || variant === 'danger' ? 1 : 0,
      opacity: pressed ? 0.8 : 1,
    },
    text: { color: textColor },
  };
};

export const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
});
