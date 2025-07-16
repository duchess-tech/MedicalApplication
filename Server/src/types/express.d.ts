import { Request } from 'express';

export interface AuthenticatedUser {
  id: string;
  role: 'doctor' | 'patient' | 'admin';
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
