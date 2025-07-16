import mongoose from 'mongoose';
import { UserModel } from '../userModel.js';
import { IDoctor } from '../../types/doctor';

const DoctorSchema = new mongoose.Schema<IDoctor>({
  licenseNumber: { type: String, required: true },
  specialization: { type: String, required: true },
});

export const DoctorModel = UserModel.discriminator<IDoctor>('doctor', DoctorSchema);
