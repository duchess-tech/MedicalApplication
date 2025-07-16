import mongoose from 'mongoose';
import { IPatient } from '../../types/patient';
import { UserModel } from '../userModel.js';

const PatientSchema = new mongoose.Schema<IPatient>({
  age: { type: Number, required: true },
   address: { type: String, required: false },
  bloodGroup: { type: String, required: false },
  allergies: [{ type: String, required: false }],
  medicalConditions: [{ type: String, required: false }],
  emergencyContact: {
    name: { type: String, required: false },
    phone: { type: String, required: false },
    relationship: { type: String, required: false },
  },
});

export const PatientModel = UserModel.discriminator<IPatient>('patient', PatientSchema);
