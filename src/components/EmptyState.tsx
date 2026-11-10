import { StyleSheet, Text, View } from 'react-native';

import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  message: string;
  buttonTitle?: string;
  onPress?: () => void;
}

export function EmptyState({ title, message, buttonTitle, onPress }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {buttonTitle && onPress ? <Button title={buttonTitle} onPress={onPress} style={styles.button} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 18,
  },
  button: {
    width: '100%',
  },
});
