import { Pressable, Text, ViewStyle, useColorScheme } from 'react-native';
import { getDynamicStyles, styles } from '@/styles/components/ui/Button.styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getDynamicStyles(isDark, disabled, variant, pressed).button,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.text, getDynamicStyles(isDark, disabled, variant, false).text]}>{title}</Text>
    </Pressable>
  );
}