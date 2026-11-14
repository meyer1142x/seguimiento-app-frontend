import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { IncidentTimeline } from '@/components/features/IncidentTimeline';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getIncidentById } from '@/services/incidentsService';
import type { Incident } from '@/types';
import { getColors, getDynamicStyles, styles } from '@/styles/screens/incidentDetail.styles';

export default function IncidentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const colors = getColors(isDark);
  const dynamicStyles = getDynamicStyles(isDark, insets);

  useEffect(() => {
    if (!id) return;
    let active = true;

    void getIncidentById(id).then((result) => {
      if (active) {
        setIncident(result ?? null);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading && id) {
    return (
      <View style={[styles.center, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={[styles.loadingText, { color: colors.muted }]}>Cargando detalle...</Text>
      </View>
    );
  }

  if (!incident) {
    return (
      <View style={[styles.center, styles.centerContent, { backgroundColor: colors.bg }]}>
        <ErrorMessage message="No se encontró la incidencia." />
        <Pressable style={[styles.backBtnFallback, { backgroundColor: colors.accent }]} onPress={() => router.back()}>
          <Text style={styles.fallbackText}>Volver a mis incidencias</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.screen, dynamicStyles.screen]}>
      <View style={[styles.navBar, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={15}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
          <Text style={[styles.navTitle, { color: colors.text }]}>{incident.id}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <View style={styles.statusWrap}>
            <StatusBadge status={incident.status} />
          </View>
          <Text style={[styles.mainTitle, { color: colors.text }]}>{incident.title}</Text>
          <Text style={[styles.dateText, { color: colors.muted }]}>
            Reportado el {new Date(incident.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Clasificación</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={[styles.gridLabel, { color: colors.muted }]}>Categoría</Text>
              <CategoryBadge category={incident.category} />
            </View>
            <View style={styles.gridItem}>
              <Text style={[styles.gridLabel, { color: colors.muted }]}>Prioridad</Text>
              <PriorityBadge priority={incident.priority} />
            </View>
            <View style={styles.gridItem}>
              <Text style={[styles.gridLabel, { color: colors.muted }]}>Ubicación</Text>
              <Text style={[styles.gridValue, { color: colors.text }]}>{incident.location}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={[styles.gridLabel, { color: colors.muted }]}>Reportado por</Text>
              <Text style={[styles.gridValue, { color: colors.text }]}>{incident.reportedBy || 'Usuario actual'}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Descripción del problema</Text>
          <Text style={[styles.descriptionText, { color: colors.description }]}>
            {incident.description}
          </Text>
        </View>

        {incident.evidence ? (
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Evidencia adjunta</Text>
            <Image 
              source={{ uri: incident.evidence }} 
              style={styles.evidenceImage} 
              resizeMode="cover" 
            />
          </View>
        ) : null}

        {incident.timeline && incident.timeline.length > 0 ? (
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Seguimiento</Text>
            <IncidentTimeline items={incident.timeline} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}