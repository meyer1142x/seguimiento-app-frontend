import { router } from 'expo-router';
import { Alert, ScrollView, Text, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { currentUser } from '@/mocks/users';
import { logoutUser } from '@/services/authService';
import { getColors, getDynamicStyles, styles } from '@/styles/screens/perfil.styles';

export default function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const colors = getColors(isDark);
  const dynamicStyles = getDynamicStyles(isDark, insets);

  const handleLogout = async () => {
    await logoutUser();
    Alert.alert('Sesión cerrada', 'Has salido de la aplicación.');
    router.replace('/');
  };

  return (
    <View style={[styles.safeArea, dynamicStyles.screen]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header title="Mi perfil" subtitle="Información personal y configuración." />

        <View style={[styles.profileCard, isDark && styles.profileCardDark]}>
          <Text style={styles.avatar}>{currentUser.avatar}</Text>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.role}>{currentUser.role}</Text>
        </View>

        <View style={[styles.infoCard, isDark && styles.infoCardDark]}>
          <View style={[styles.row, isDark && styles.rowDark]}>
            <Text style={[styles.label, { color: colors.muted }]}>Empleado</Text>
            <Text style={[styles.value, { color: colors.text }]}>{currentUser.employeeId}</Text>
          </View>
          <View style={[styles.row, isDark && styles.rowDark]}>
            <Text style={[styles.label, { color: colors.muted }]}>Área</Text>
            <Text style={[styles.value, { color: colors.text }]}>{currentUser.area}</Text>
          </View>
          <View style={[styles.row, styles.lastRow, isDark && styles.rowDark]}>
            <Text style={[styles.label, { color: colors.muted }]}>Correo</Text>
            <Text style={[styles.value, { color: colors.text }]}>{currentUser.email}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button title="Mis datos" variant="secondary" onPress={() => Alert.alert('Mis datos', 'La información personal se mostrará en una próxima versión.')} />
          <Button title="Notificaciones" variant="secondary" onPress={() => Alert.alert('Notificaciones', 'Las notificaciones están configuradas para una próxima actualización.')} />
          <Button title="Cerrar sesión" variant="danger" onPress={handleLogout} />
        </View>
      </ScrollView>
    </View>
  );
}