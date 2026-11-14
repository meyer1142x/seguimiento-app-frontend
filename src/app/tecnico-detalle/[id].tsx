import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
// <-- IMPORTAMOS 'Keyboard' y 'Platform' nativos
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, View, useColorScheme, Keyboard, Platform, KeyboardEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getIncidentById } from '@/services/incidentsService';
import type { Incident, IncidentStatus } from '@/types';
import { getColors, getDynamicStyles, styles } from '@/styles/screens/technicianIncidentDetail.styles';

export default function TechnicianIncidentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');
  
  // <-- NUEVO: Estado para guardar la altura exacta del teclado
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const colors = getColors(isDark);
  const dynamicStyles = getDynamicStyles(isDark, insets);


  useEffect(() => {

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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

  const handleUpdateStatus = (newStatus: IncidentStatus) => {
    if (newStatus === 'RESUELTA' && !resolutionNote.trim()) {
      Alert.alert('Campo requerido', 'Por favor, escribe un diagnóstico de la solución antes de cerrar el ticket.');
      return;
    }

    Alert.alert(
      'Confirmar acción',
      `¿Estás seguro de cambiar el estado a ${newStatus}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sí, actualizar', 
          onPress: () => {

            Keyboard.dismiss();
            setUpdating(true);
            setTimeout(() => {
              if (incident) {
                setIncident({ ...incident, status: newStatus });
              }
              setUpdating(false);
              Alert.alert('Éxito', 'Estado actualizado correctamente.');
            }, 1000);
          }
        },
      ]
    );
  };

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
          <Text style={styles.fallbackText}>Volver a la bandeja</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.screen, dynamicStyles.screen]}>
      <View style={[styles.navBar, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={15}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
          <Text style={[styles.navTitle, { color: colors.text }]}>Regresar</Text>
        </Pressable>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerBlock}>
          <View style={styles.statusWrap}>
            <StatusBadge status={incident.status} />
          </View>
          <Text style={[styles.mainTitle, { color: colors.text }]}>{incident.title}</Text>
          <Text style={[styles.dateText, { color: colors.muted }]}>
            Ticket: <Text style={[styles.ticketId, { color: colors.text }]}>{incident.id}</Text>
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
              <Text style={[styles.gridValue, { color: colors.text }]}>{incident.reportedBy}</Text>
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
            <Image source={{ uri: incident.evidence }} style={styles.evidenceImage} resizeMode="cover" />
          </View>
        ) : null}
      </ScrollView>

      {/* <-- NUEVO: Empujamos dinámicamente el footer usando el paddingBottom exacto del teclado */}
      <View style={[
        styles.actionFooter, 
        dynamicStyles.actionFooter,
        { paddingBottom: Math.max(insets.bottom, 20) + keyboardHeight }
      ]}>
        {incident.status === 'PENDIENTE' && (
          <Button 
            title={updating ? 'Procesando...' : 'Atender Incidencia'} 
            onPress={() => handleUpdateStatus('EN PROCESO')} 
            disabled={updating}
          />
        )}
        
        {incident.status === 'EN PROCESO' && (
          <View style={{ gap: 12 }}>
            <Input
              label="Nota de solución o diagnóstico"
              placeholder="Ej: Se cambió el cartucho..."
              value={resolutionNote}
              onChangeText={setResolutionNote}
            />
            <Button 
              title={updating ? 'Procesando...' : 'Marcar como Resuelta'} 
              variant="secondary"
              style={styles.resolvedButton}
              onPress={() => handleUpdateStatus('RESUELTA')} 
              disabled={updating}
            />
          </View>
        )}

        {(incident.status === 'RESUELTA' || incident.status === 'CERRADA') && (
          <View style={styles.completedMessage}>
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            <Text style={[styles.completedText, { color: colors.text }]}>Ticket atendido correctamente</Text>
          </View>
        )}
      </View>
    </View>
  );
}