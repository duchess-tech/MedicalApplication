import { model, Schema } from "mongoose";

const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true }, // specialist
  bookedBy: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true }, // general doctor
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });
export const AppointmentModel= model('appointment',appointmentSchema);