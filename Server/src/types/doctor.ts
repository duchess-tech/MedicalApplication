import { IUserBase } from './patient'; // reuse the shared user base interface

export interface IDoctor extends IUserBase {
  role: 'doctor';
  licenseNumber: string;
  specialization: string;
}
