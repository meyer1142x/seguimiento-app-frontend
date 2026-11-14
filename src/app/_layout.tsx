import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
  
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="incidencias/[id]" />
        
     
        <Stack.Screen name="tecnico-inicio" />
        <Stack.Screen name="tecnico-detalle/[id]" />
      </Stack>
    </>
  );
}