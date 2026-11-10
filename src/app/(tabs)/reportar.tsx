import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { createIncident } from '@/services/incidentsService';
import type { IncidentCategory, IncidentLocation, IncidentPriority } from '@/types';

const categoryOptions: IncidentCategory[] = ['Hardware', 'Software', 'Redes', 'Otro'];
const priorityOptions: IncidentPriority[] = ['BAJA', 'MEDIA', 'ALTA', 'CRÍTICA'];
const locationOptions: IncidentLocation[] = ['Oficina', 'Almacén', 'Recepción', 'Administración', 'Otra'];

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
  priority: '',
  description: '',
  location: '',
  evidence: '',
};

export default function ReportIncidentScreen() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) nextErrors.title = 'El título es obligatorio.';
    if (!form.category) nextErrors.category = 'La categoría es obligatoria.';
    if (!form.description.trim()) nextErrors.description = 'La descripción es obligatoria.';
    if (!form.priority) nextErrors.priority = 'La prioridad es obligatoria.';
    if (!form.location) nextErrors.location = 'La ubicación es obligatoria.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

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

      Alert.alert('Incidencia registrada correctamente.');
      setForm(initialForm);
      router.replace('/(tabs)/incidencias');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Header title="Reportar incidencia" subtitle="Registra una incidencia técnica de forma rápida." />

          <Input
            label="Título"
            value={form.title}
            onChangeText={(value) => updateField('title', value)}
            placeholder="Computadora no enciende"
            error={errors.title}
          />

          <View style={styles.section}>
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.optionGrid}>
              {categoryOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => updateField('category', option)}
                  style={[styles.optionChip, form.category === option && styles.optionChipActive]}>
                  <Text style={[styles.optionText, form.category === option && styles.optionTextActive]}>{option}</Text>
                </Pressable>
              ))}
            </View>
            {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Prioridad</Text>
            <View style={styles.optionGrid}>
              {priorityOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => updateField('priority', option)}
                  style={[styles.optionChip, form.priority === option && styles.optionChipActive]}>
                  <Text style={[styles.optionText, form.priority === option && styles.optionTextActive]}>{option}</Text>
                </Pressable>
              ))}
            </View>
            {errors.priority ? <Text style={styles.errorText}>{errors.priority}</Text> : null}
          </View>

          <Input
            label="Descripción"
            value={form.description}
            onChangeText={(value) => updateField('description', value)}
            placeholder="Describe detalladamente el problema técnico..."
            multiline
            numberOfLines={5}
            error={errors.description}
          />

          <View style={styles.section}>
            <Text style={styles.label}>Ubicación</Text>
            <View style={styles.optionGrid}>
              {locationOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => updateField('location', option)}
                  style={[styles.optionChip, form.location === option && styles.optionChipActive]}>
                  <Text style={[styles.optionText, form.location === option && styles.optionTextActive]}>{option}</Text>
                </Pressable>
              ))}
            </View>
            {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}
          </View>

          <View style={styles.evidenceRow}>
            <Button
              title={form.evidence ? 'Evidencia adjunta' : 'Adjuntar imagen'}
              variant="secondary"
              onPress={() => {
                const evidenceLabel = 'Evidencia adjunta';
                updateField('evidence', evidenceLabel);
                Alert.alert('Evidencia', 'La imagen se ha marcado como adjunta para esta incidencia.');
              }}
            />
          </View>

          <Button title={submitting ? 'Enviando...' : 'Enviar incidencia'} onPress={handleSubmit} disabled={submitting} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F7FB',
  },
  keyboardContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#EAF3FF',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D0E4FF',
  },
  optionChipActive: {
    backgroundColor: '#0E2A47',
    borderColor: '#0E2A47',
  },
  optionText: {
    color: '#0E2A47',
    fontSize: 12,
    fontWeight: '700',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 6,
  },
  evidenceRow: {
    marginBottom: 18,
  },
});
