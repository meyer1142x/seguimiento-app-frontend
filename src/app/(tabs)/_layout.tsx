import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0E2A47',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          height: 74,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}>
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>{'🏠'}</Text>,
        }}
      />
      <Tabs.Screen
        name="incidencias"
        options={{
          title: 'Mis incidencias',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>{'📋'}</Text>,
        }}
      />
      <Tabs.Screen
        name="reportar"
        options={{
          title: 'Reportar',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>{'➕'}</Text>,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>{'👤'}</Text>,
        }}
      />
    </Tabs>
  );
}
