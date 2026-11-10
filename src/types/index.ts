export type IncidentStatus = 'PENDIENTE' | 'EN PROCESO' | 'RESUELTA' | 'CERRADA';
export type IncidentPriority = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRÍTICA';
export type IncidentCategory = 'Hardware' | 'Software' | 'Redes' | 'Otro';
export type IncidentLocation = 'Oficina' | 'Almacén' | 'Recepción' | 'Administración' | 'Otra';

export interface User {
  id: string;
  name: string;
  employeeId: string;
  area: string;
  email: string;
  role: string;
  avatar: string;
}

export interface IncidentTimelineItem {
  id: string;
  status: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  priority: IncidentPriority;
  status: IncidentStatus;
  location: IncidentLocation;
  createdAt: string;
  updatedAt: string;
  reportedBy: string;
  evidence?: string | null;
  timeline?: IncidentTimelineItem[];
}

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  description: string;
}
