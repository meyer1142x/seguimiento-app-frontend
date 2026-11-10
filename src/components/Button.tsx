import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  const backgroundColor =
    variant === 'secondary' ? '#EAF3FF' : variant === 'danger' ? '#FDECEC' : '#0E2A47';
  const textColor = variant === 'secondary' || variant === 'danger' ? '#0E2A47' : '#FFFFFF';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: disabled ? '#CBD5E1' : backgroundColor, opacity: pressed ? 0.9 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
