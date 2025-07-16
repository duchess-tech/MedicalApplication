import  { model, Schema } from 'mongoose';
import { IUserBase } from '../types/patient';

const baseOptions = {
  discriminatorKey: 'role',
  collection: 'users',
  timestamps: true
};

const UserSchema = new Schema<IUserBase>({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  gender:    { type: String, required: true },
  phone:     { type: Number, required: true },
  googleId:  { type: String, required: false },
}, baseOptions);

export const UserModel =  model<IUserBase>('User', UserSchema);























// import mongoose from 'mongoose'
// export type Role = 'doctor' | 'patient';
// export interface Patient {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
//   role: 'patient';
//   age: number;
//   gender: string;
//   phone: string;
//   googleId?: string
// }

// export interface Doctor {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   gender: string;
//   password: string;
//   phone:number,
//   role:"doctor";
//   licenseNumber: string;
//   specialization: string;
// }



// export type User = Doctor | Patient;

// export const users: User[] = [];
