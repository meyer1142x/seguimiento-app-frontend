import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View, useColorScheme, Modal, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { createIncident } from '@/services/incidentsService';
import type { IncidentCategory, IncidentLocation, IncidentPriority } from '@/types';
import {
  getColors,
  getDynamicStyles,
  getOptionStyles,
  styles,
  type ReportColors,
} from '@/styles/screens/reportar.styles';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type Option<T extends string> = {
  value: T;
  icon?: IconName;
  color?: string;
};

const categoryOptions: Option<IncidentCategory>[] = [
  { value: 'Hardware', icon: 'hardware-chip-outline' },
  { value: 'Software', icon: 'code-slash-outline' },
  { value: 'Redes', icon: 'wifi-outline' },
  { value: 'Otro', icon: 'ellipsis-horizontal-circle-outline' },
];

const priorityOptions: Option<IncidentPriority>[] = [
  { value: 'BAJA', color: '#16A34A' },
  { value: 'MEDIA', color: '#D97706' },
  { value: 'ALTA', color: '#EA580C' },
  { value: 'CRÍTICA', color: '#DC2626' },
];

const locationOptions: Option<IncidentLocation>[] = [
  { value: 'Oficina', icon: 'business-outline' },
  { value: 'Almacén', icon: 'cube-outline' },
  { value: 'Recepción', icon: 'people-outline' },
  { value: 'Administración', icon: 'briefcase-outline' },
  { value: 'Otra', icon: 'location-outline' },
];

type FormState = {
  title: string;
  category: IncidentCategory | '';
  priority: IncidentPriority | '';
  description: string;
  location: IncidentLocation | '';
  evidence: string;
};

const initialForm: FormState = {
  title: '',
  category: '',
  priority: 'MEDIA',
  description: '',
  location: '',
  evidence: '',
};

interface OptionGroupProps<T extends string> {
  label: string;
  options: Option<T>[];
  selected: T | '';
  onSelect: (value: T) => void;
  error?: string;
  colors: ReportColors;
}

function OptionGroup<T extends string>({
  label,
  options,
  selected,
  onSelect,
  error,
  colors,
}: OptionGroupProps<T>) {
  return (
    <View style={styles.optionGroupSpacer}>
      <View style={styles.optionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{label}</Text>
        {error ? (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={14} color="#DC2626" />
            <Text style={styles.errorInline}>{error}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.chipWrapper}>
        {options.map((option) => {
          const active = selected === option.value;
          const tone = option.color ?? colors.accent;
          const optionStyles = getOptionStyles(active, tone, option.color, colors);

          return (
            <Pressable
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={[
                styles.chip,
                optionStyles.chip,
              ]}>
              {option.color && !active ? <View style={[styles.dot, optionStyles.dot]} /> : null}
              {option.icon ? (
                <Ionicons
                  name={option.icon}
                  size={15}
                  color={optionStyles.iconColor}
                />
              ) : null}
              <Text style={[styles.chipText, optionStyles.text]}>
                {option.value}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function ReportIncidentScreen() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  
  const [showPickerModal, setShowPickerModal] = useState(false);

  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();

  const colors: ReportColors = getColors(isDark);
  const dynamicStyles = getDynamicStyles(isDark, insets);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) nextErrors.title = 'Requerido';
    if (!form.description.trim()) nextErrors.description = 'Requerido';
    if (!form.category) nextErrors.category = 'Elige una';
    if (!form.priority) nextErrors.priority = 'Elige una';
    if (!form.location) nextErrors.location = 'Elige una';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const takePhoto = async () => {
    setShowPickerModal(false);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu cámara.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) updateField('evidence', result.assets[0].uri);
  };

  const pickImage = async () => {
    setShowPickerModal(false);
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) updateField('evidence', result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await createIncident({
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category as IncidentCategory,
        priority: form.priority as IncidentPriority,
        location: form.location as IncidentLocation,
        reportedBy: 'Carlos Ramírez',
        evidence: form.evidence || null,
      });
      setForm(initialForm);
      setErrors({});
      router.replace('/(tabs)/incidencias');
    } catch {
      Alert.alert('No se pudo registrar', 'Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const cardStyle = [styles.card, dynamicStyles.card];

  return (
    <View style={[styles.screen, dynamicStyles.screen]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerWrapper}>
            <Header title="Nuevo reporte" subtitle="Cuéntanos qué está fallando" />
          </View>

                             
          <View style={cardStyle}>
            <Input
              label="¿Qué está fallando?"
              value={form.title}
              onChangeText={(value) => updateField('title', value)}
              placeholder="Ej. La impresora no enciende"
              error={errors.title}
            />
            <View style={styles.spacer} />
            <Input
              label="Detalles adicionales"
              value={form.description}
              onChangeText={(value) => updateField('description', value)}
              placeholder="Pasos previos al fallo, mensajes de error..."
              multiline
              numberOfLines={4}
              error={errors.description}
            />
          </View>

   
          <View style={cardStyle}>
            <OptionGroup<IncidentCategory>
              label="Categoría"
              options={categoryOptions}
              selected={form.category}
              onSelect={(value) => updateField('category', value)}
              error={errors.category}
              colors={colors}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <OptionGroup<IncidentPriority>
              label="Prioridad"
              options={priorityOptions}
              selected={form.priority}
              onSelect={(value) => updateField('priority', value)}
              error={errors.priority}
              colors={colors}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <OptionGroup<IncidentLocation>
              label="Ubicación"
              options={locationOptions}
              selected={form.location}
              onSelect={(value) => updateField('location', value)}
              error={errors.location}
              colors={colors}
            />
          </View>

                                                   
          <Text style={[styles.sectionTitle, styles.evidenceTitle, { color: colors.text }]}>
            Evidencia <Text style={[styles.optionalLabel, dynamicStyles.optionalLabel]}>(opcional)</Text>
          </Text>

          {form.evidence ? (
            <View style={[styles.evidenceDone, dynamicStyles.card]}>
              <Image source={{ uri: form.evidence }} style={styles.evidenceImagePreview} />
              <View style={styles.evidenceDoneInfo}>
                <Text style={[styles.evidenceDoneText, { color: colors.text }]} numberOfLines={1}>
                  Imagen adjuntada
                </Text>
                <Text style={[styles.changePhotoText, dynamicStyles.changePhoto]} onPress={() => setShowPickerModal(true)}>
                  Cambiar foto
                </Text>
              </View>
              <Pressable onPress={() => updateField('evidence', '')} hitSlop={12} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={20} color="#DC2626" />
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={[styles.uploadBox, dynamicStyles.card]}
              onPress={() => setShowPickerModal(true)}>
              <View style={styles.iconCircle}>
                <Ionicons name="camera" size={24} color={colors.accent} />
              </View>
              <Text style={[styles.uploadText, { color: colors.text }]}>Adjuntar evidencia</Text>
              <Text style={[styles.uploadSubtext, { color: colors.muted }]}>Formatos JPG, PNG</Text>
            </Pressable>
          )}
        </ScrollView>

        <View style={[styles.footer, dynamicStyles.footer]}>
          <Button
            title={submitting ? 'Registrando...' : 'Enviar reporte'}
            onPress={handleSubmit}
            disabled={submitting}
          />
        </View>
      </KeyboardAvoidingView>

                                            
      <Modal visible={showPickerModal} transparent animationType="fade" onRequestClose={() => setShowPickerModal(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowPickerModal(false)}>
          <Pressable style={[styles.bottomSheet, dynamicStyles.bottomSheet]} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={[styles.sheetTitle, { color: colors.text }]}>Agregar imagen</Text>
            
            <Pressable style={styles.sheetOption} onPress={takePhoto}>
              <View style={[styles.sheetIconBox, dynamicStyles.iconBox]}>
                <Ionicons name="camera" size={22} color={colors.accent} />
              </View>
              <Text style={[styles.sheetOptionText, { color: colors.text }]}>Tomar foto</Text>
            </Pressable>

            <Pressable style={styles.sheetOption} onPress={pickImage}>
              <View style={[styles.sheetIconBox, dynamicStyles.iconBox]}>
                <Ionicons name="image" size={22} color={colors.accent} />
              </View>
              <Text style={[styles.sheetOptionText, { color: colors.text }]}>Elegir de galería</Text>
            </Pressable>

            <Pressable style={[styles.sheetOption, { marginTop: 8 }]} onPress={() => setShowPickerModal(false)}>
              <View style={[styles.sheetIconBox, dynamicStyles.cancelIconBox]}>
                <Ionicons name="close" size={22} color="#DC2626" />
              </View>
              <Text style={[styles.sheetOptionText, styles.cancelText]}>Cancelar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}