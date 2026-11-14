import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, router } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, Text, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '@/components/ui/EmptyState';
import { Header } from '@/components/ui/Header';
import { IncidentCard } from '@/components/features/IncidentCard';
import { Loading } from '@/components/ui/Loading';
import { getIncidents } from '@/services/incidentsService';
import type { Incident, IncidentCategory, IncidentStatus } from '@/types';
import { getColors, getDynamicStyles, styles } from '@/styles/screens/incidencias.styles';

type StatusFilter = 'Todas' | IncidentStatus;
type CategoryFilter = 'Todas' | IncidentCategory;

const statusOptions: StatusFilter[] = ['Todas', 'PENDIENTE', 'EN PROCESO', 'RESUELTA', 'CERRADA'];
const categoryOptions: CategoryFilter[] = ['Todas', 'Hardware', 'Software', 'Redes', 'Otro'];

export default function IncidentsScreen() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Todas');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('Todas');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

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

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const byStatus = statusFilter === 'Todas' || incident.status === statusFilter;
      const byCategory = categoryFilter === 'Todas' || incident.category === categoryFilter;
      return byStatus && byCategory;
    });
  }, [incidents, statusFilter, categoryFilter]);

  const hasActiveFilters = statusFilter !== 'Todas' || categoryFilter !== 'Todas';
  const categoryActive = categoryFilter !== 'Todas';
  const count = filteredIncidents.length;

  const clearFilters = () => {
    setStatusFilter('Todas');
    setCategoryFilter('Todas');
  };

  if (loading) {
    return <Loading message="Cargando incidencias..." />;
  }

  return (
    <View style={[styles.screen, dynamicStyles.screen]}>
      <View style={styles.headerWrap}>
        <Header title="Mis incidencias" subtitle="Consulta y revisa el estado de tus reportes." />
      </View>

                                         
      <View style={styles.chipsWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}>
          {statusOptions.map((option) => {
            const active = statusFilter === option;
            return (
              <Pressable
                key={option}
                onPress={() => setStatusFilter(option)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: active ? colors.accent : colors.chipBg,
                    borderColor: active ? colors.accent : colors.border,
                  },
                ]}>
                <Text style={[styles.chipText, { color: active ? colors.activeText : colors.chipText }]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

                                                     
      <View style={styles.toolbar}>
        <Text style={[styles.countText, { color: colors.muted }]}>
          {count} {count === 1 ? 'incidencia' : 'incidencias'}
        </Text>

        <View style={styles.toolbarRight}>
          {hasActiveFilters ? (
            <Pressable onPress={clearFilters} hitSlop={10} style={styles.clearBtn}>
              <Text style={[styles.clearText, { color: colors.accent }]}>Limpiar</Text>
            </Pressable>
          ) : null}

          <Pressable
            onPress={() => setCategoryModalOpen(true)}
            style={[
              styles.categoryBtn,
              {
                backgroundColor: categoryActive ? colors.accent : colors.surface,
                borderColor: categoryActive ? colors.accent : colors.border,
              },
            ]}>
            <Ionicons
              name="options-outline"
              size={14}
              color={categoryActive ? colors.activeText : colors.text}
            />
            <Text
              style={[
                styles.categoryBtnText,
                { color: categoryActive ? colors.activeText : colors.text },
              ]}>
              {categoryActive ? categoryFilter : 'Categoría'}
            </Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color={categoryActive ? colors.activeText : colors.muted}
            />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filteredIncidents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <IncidentCard
            incident={item}
            onPress={() => router.push({ pathname: '/incidencias/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <EmptyState
              title="No tienes incidencias registradas."
              message="Aún no hay reportes para los filtros seleccionados."
              buttonTitle="Reportar incidencia"
              onPress={() => router.push('/(tabs)/reportar')}
            />
          </View>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

                                          
      <Modal
        visible={categoryModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setCategoryModalOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setCategoryModalOpen(false)} />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              ...dynamicStyles.sheet,
            },
          ]}>
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
          <Text style={[styles.sheetTitle, { color: colors.text }]}>Filtrar por categoría</Text>

          {categoryOptions.map((option) => {
            const selected = categoryFilter === option;
            return (
              <Pressable
                key={option}
                onPress={() => {
                  setCategoryFilter(option);
                  setCategoryModalOpen(false);
                }}
                style={[styles.sheetRow, { borderBottomColor: colors.border }]}>
                <Text
                  style={[
                    styles.sheetRowText,
                    { color: selected ? colors.accent : colors.text, fontWeight: selected ? '800' : '600' },
                  ]}>
                  {option === 'Todas' ? 'Todas las categorías' : option}
                </Text>
                {selected ? <Ionicons name="checkmark" size={20} color={colors.accent} /> : null}
              </Pressable>
            );
          })}
        </View>
      </Modal>
    </View>
  );
}