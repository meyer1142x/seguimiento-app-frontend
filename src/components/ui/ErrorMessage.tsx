import { Text, View } from 'react-native';
import { styles } from '@/styles/components/ui/ErrorMessage.styles';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
