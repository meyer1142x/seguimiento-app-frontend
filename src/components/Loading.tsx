import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Cargando...' }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0E2A47" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
