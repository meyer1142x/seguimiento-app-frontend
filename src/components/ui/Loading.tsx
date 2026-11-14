import { ActivityIndicator, Text, View } from 'react-native';
import { getDynamicStyles, styles } from '@/styles/components/ui/Loading.styles';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Cargando...' }: LoadingProps) {
  const dynamicStyles = getDynamicStyles();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={dynamicStyles.indicatorColor} />
      <Text style={[styles.text, dynamicStyles.text]}>{message}</Text>
    </View>
  );
}
