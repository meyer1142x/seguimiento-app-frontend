import type { User } from '@/types';

export const currentUser: User = {
  id: 'USR-001',
  name: 'Carlos Ramírez',
  employeeId: 'EMP-001',
  area: 'Almacén',
  email: 'carlos.ramirez@innovatech.com',
  role: 'Operador de almacén',
  avatar: 'CR',
};

export const mockUsers: User[] = [currentUser];

export const testCredentials = {
  email: 'soporte@innovatech.com',
  password: '123456',
};
