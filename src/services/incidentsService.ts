import { mockIncidents } from '@/mocks/incidents';
import type { Incident, IncidentCategory, IncidentPriority, IncidentStatus } from '@/types';

let incidentStore: Incident[] = mockIncidents.map((incident) => ({ ...incident }));

export async function getIncidents(): Promise<Incident[]> {
  return [...incidentStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getIncidentById(id: string): Promise<Incident | undefined> {
  return incidentStore.find((incident) => incident.id === id);
}

export async function getRecentIncidents(limit = 3): Promise<Incident[]> {
  const incidents = await getIncidents();
  return incidents.slice(0, limit);
}

export async function createIncident(input: {
  title: string;
  description: string;
  category: IncidentCategory;
  priority: IncidentPriority;
  status?: IncidentStatus;
  location: string;
  reportedBy?: string;
  evidence?: string | null;
}): Promise<Incident> {
  const nextId = `INC-${String(incidentStore.length + 1).padStart(3, '0')}`;
  const now = new Date().toISOString();

  const newIncident: Incident = {
    id: nextId,
    title: input.title,
    description: input.description,
    category: input.category,
    priority: input.priority,
    status: input.status ?? 'PENDIENTE',
    location: input.location as Incident['location'],
    createdAt: now,
    updatedAt: now,
    reportedBy: input.reportedBy ?? 'Carlos Ramírez',
    evidence: input.evidence ?? null,
    timeline: [
      {
        id: `${nextId}-t1`,
        status: 'reportado',
        description: 'Incidencia reportada',
        date: new Date().toLocaleDateString('es-PE'),
        completed: true,
      },
      {
        id: `${nextId}-t2`,
        status: 'pendiente',
        description: 'Incidencia en espera de revisión',
        date: 'Por confirmar',
        completed: false,
      },
    ],
  };

  incidentStore = [newIncident, ...incidentStore];

  return newIncident;
}
