import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/Input';
import { testCredentials } from '@/mocks/users';
import { getStoredUser, loginMock } from '@/services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState(testCredentials.email);
  const [password, setPassword] = useState(testCredentials.password);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    const checkSession = async () => {
      const user = await getStoredUser();
      if (user) {
        router.replace('/(tabs)/inicio');
      }
    };

    void checkSession();
  }, []);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) nextErrors.email = 'El correo es obligatorio.';
    if (!password.trim()) nextErrors.password = 'La contraseña es obligatoria.';

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    setFormError(null);

    try {
      await loginMock(email, password);
      router.replace('/(tabs)/inicio');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Correo o contraseña incorrectos.';
      setFormError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.brandBox}>
            <Text style={styles.logo}>IT</Text>
            <Text style={styles.title}>Fix-IT InnovaTech</Text>
            <Text style={styles.subtitle}>Gestión inteligente de incidencias tecnológicas</Text>
          </View>

          <View style={styles.formCard}>
            {formError ? <ErrorMessage message={formError} /> : null}

            <Input
              label="Correo"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setFieldErrors((current) => ({ ...current, email: undefined }));
              }}
              placeholder="soporte@innovatech.com"
              keyboardType="email-address"
              error={fieldErrors.email}
            />

            <Input
              label="Contraseña"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setFieldErrors((current) => ({ ...current, password: undefined }));
              }}
              placeholder="••••••"
              secureTextEntry={!showPassword}
              error={fieldErrors.password}
            />

            <Text style={styles.toggleText} onPress={() => setShowPassword((value) => !value)}>
              {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            </Text>

            <Button title={loading ? 'Iniciando sesión...' : 'Iniciar sesión'} onPress={handleLogin} disabled={loading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF4FF',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  brandBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 86,
    height: 86,
    borderRadius: 22,
    backgroundColor: '#0E2A47',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 18,
  },
  title: {
    color: '#0F172A',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#475569',
    fontSize: 15,
    textAlign: 'center',
    width: '90%',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  toggleText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
});
