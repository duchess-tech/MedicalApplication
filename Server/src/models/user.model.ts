export type Role = 'doctor' | 'patient';

export interface Doctor {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'doctor';
  licenseNumber: string;
  specialization: string;
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'patient';
  age: number;
  gender: string;
  phone: string;
}

export type User = Doctor | Patient;

export const users: User[] = [];
