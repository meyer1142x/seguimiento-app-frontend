import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { currentUser } from '@/mocks/users';
import { logoutUser } from '@/services/authService';

export default function ProfileScreen() {
  const handleLogout = async () => {
    await logoutUser();
    Alert.alert('Sesión cerrada', 'Has salido de la aplicación.');
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header title="Mi perfil" subtitle="Información personal y configuración." />

        <View style={styles.profileCard}>
          <Text style={styles.avatar}>{currentUser.avatar}</Text>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.role}>{currentUser.role}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Empleado</Text>
            <Text style={styles.value}>{currentUser.employeeId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Área</Text>
            <Text style={styles.value}>{currentUser.area}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Correo</Text>
            <Text style={styles.value}>{currentUser.email}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button title="Mis datos" variant="secondary" onPress={() => Alert.alert('Mis datos', 'La información personal se mostrará en una próxima versión.')} />
          <Button title="Notificaciones" variant="secondary" onPress={() => Alert.alert('Notificaciones', 'Las notificaciones están configuradas para una próxima actualización.')} />
          <Button title="Cerrar sesión" variant="danger" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F7FB',
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  profileCard: {
    backgroundColor: '#0E2A47',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EAF3FF',
    color: '#0E2A47',
    fontWeight: '800',
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  role: {
    color: '#D7E6F8',
    marginTop: 6,
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 10,
  },
  label: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'right',
    flexShrink: 1,
  },
  actions: {
    gap: 12,
  },
});
