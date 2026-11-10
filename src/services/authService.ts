import AsyncStorage from '@react-native-async-storage/async-storage';

import { currentUser, testCredentials } from '@/mocks/users';
import type { User } from '@/types';

const AUTH_KEY = 'fixit-auth-user';

export async function loginMock(email: string, password: string): Promise<User> {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === testCredentials.email.toLowerCase() && password === testCredentials.password) {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    return currentUser;
  }

  throw new Error('Correo o contraseña incorrectos.');
}

export async function getStoredUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(AUTH_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_KEY);
}
