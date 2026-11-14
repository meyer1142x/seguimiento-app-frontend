import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, useColorScheme, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Input } from '@/components/ui/Input';
import { testCredentials } from '@/mocks/users';
import { getStoredUser, loginMock } from '@/services/authService';
import { getColors, getDynamicStyles, styles } from '@/styles/screens/index.styles';

export default function LoginScreen() {
  const [email, setEmail] = useState(testCredentials.email);
  const [password, setPassword] = useState(testCredentials.password);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingRole, setLoadingRole] = useState<'EMPLEADO' | 'TECNICO' | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const colors = getColors(isDark);
  const dynamicStyles = getDynamicStyles(insets);

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

                                                      
  const handleLogin = async (role: 'EMPLEADO' | 'TECNICO') => {
    if (!validate()) return;
    setLoadingRole(role);
    setFormError(null);
    try {
      await loginMock(email, password);
      
                                                             
      if (role === 'TECNICO') {
        router.replace('/tecnico-inicio');
      } else {
        router.replace('/(tabs)/inicio');
      }
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Correo o contraseña incorrectos.';
      setFormError(message);
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView 
          contentContainerStyle={[styles.container, dynamicStyles.container]} 
          keyboardShouldPersistTaps="handled" 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandBox}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>IT</Text>
            </View>
            <Text style={[styles.title, { color: colors.text }]}>Fix-IT InnovaTech</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Gestión inteligente de incidencias tecnológicas
            </Text>
          </View>

          <View style={[
            styles.formCard, 
            isDark ? styles.formCardDark : styles.formCardLight
          ]}>
            {formError ? <ErrorMessage message={formError} /> : null}

            <Input
              label="Correo electrónico"
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

            <View style={styles.optionsRow}>
              <Pressable onPress={() => setShowPassword((value) => !value)} hitSlop={10}>
                <Text style={[styles.toggleText, { color: colors.accentBlue }]}>
                  {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.actionButtons}>
              <Button 
                title={loadingRole === 'EMPLEADO' ? 'Iniciando...' : 'Entrar como Empleado'} 
                onPress={() => handleLogin('EMPLEADO')} 
                disabled={loadingRole !== null} 
              />
              <Button 
                title={loadingRole === 'TECNICO' ? 'Iniciando...' : 'Entrar como Técnico'} 
                variant="secondary"
                onPress={() => handleLogin('TECNICO')} 
                disabled={loadingRole !== null} 
              />
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}