import { Text, View } from 'react-native';
import { Button } from './Button';
import { styles } from '@/styles/components/ui/EmptyState.styles';

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
