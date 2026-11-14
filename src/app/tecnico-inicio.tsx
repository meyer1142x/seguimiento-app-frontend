import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, Text, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { IncidentCard } from '@/components/features/IncidentCard';
import { Loading } from '@/components/ui/Loading';
import { getIncidents } from '@/services/incidentsService';
import { logoutUser } from '@/services/authService';
import type { Incident } from '@/types';
import { getColors, getDynamicStyles, styles } from '@/styles/screens/technicianDashboard.styles';

type TabType = 'PENDIENTES' | 'EN PROCESO' | 'RESUELTAS';

export default function TechnicianDashboardScreen() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('PENDIENTES');

  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const colors = getColors(isDark);
  const dynamicStyles = getDynamicStyles(isDark, insets);

  const loadIncidents = useCallback(async () => {
    setLoading(true);
    const items = await getIncidents();
    setIncidents(items);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadIncidents();
    }, [loadIncidents]),
  );

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Deseas salir del sistema?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, salir',
          style: 'destructive',
          onPress: async () => {
            await logoutUser();
            router.replace('/');
          },
        },
      ]
    );
  };

  const filteredTickets = useMemo(() => {
    return incidents.filter((incident) => {
      if (activeTab === 'PENDIENTES') return incident.status === 'PENDIENTE';
      if (activeTab === 'EN PROCESO') return incident.status === 'EN PROCESO';
      return incident.status === 'RESUELTA' || incident.status === 'CERRADA';
    });
  }, [incidents, activeTab]);

  if (loading) {
    return <Loading message="Cargando bandeja de trabajo..." />;
  }

  return (
    <View style={[styles.screen, dynamicStyles.screen]}>
      
                                                   
      <View style={styles.headerRow}>
        <View style={styles.innerFlex}>
          <Header title="Bandeja Técnica" subtitle="Tickets asignados a ti" />
        </View>
        <Pressable 
          style={[styles.logoutIconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} 
          onPress={handleLogout}
          hitSlop={10}
        >
          <Ionicons name="log-out-outline" size={22} color="#DC2626" />
        </Pressable>
      </View>

      <View style={styles.tabsWrapper}>
        <View style={[styles.tabsContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {(['PENDIENTES', 'EN PROCESO', 'RESUELTAS'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabBtn, isActive && { backgroundColor: colors.accent }]}>
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? '#FFFFFF' : colors.muted },
                    isActive && styles.tabTextActive,
                  ]}>
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.summaryRow}>
        <Text style={[styles.summaryText, { color: colors.muted }]}>
          {filteredTickets.length} {filteredTickets.length === 1 ? 'ticket' : 'tickets'} {activeTab.toLowerCase()}
        </Text>
      </View>

      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <IncidentCard
            incident={item}
            onPress={() => router.push({ pathname: '/tecnico-detalle/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <EmptyState
              title="¡Todo al día!"
              message={`No tienes tickets ${activeTab.toLowerCase()} en este momento.`}
            />
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}