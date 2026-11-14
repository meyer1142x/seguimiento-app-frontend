import { Text, TextInput, View, useColorScheme } from 'react-native';
import { getDynamicStyles, styles } from '@/styles/components/ui/Input.styles';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
}: InputProps) {
  const isDark = useColorScheme() === 'dark';
  const dynamicStyles = getDynamicStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, dynamicStyles.label]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={dynamicStyles.placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        style={[
          styles.input,
          dynamicStyles.input,
          multiline && styles.textArea,
          error ? styles.errorBorder : null,
        ]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}