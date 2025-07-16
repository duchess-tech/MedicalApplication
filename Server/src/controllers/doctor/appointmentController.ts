import { Request, Response } from 'express';
import { AppointmentModel } from '../../models/doctor/appointment.js';
import { DoctorModel } from '../../models/doctor/doctorModel.js';
import { PatientModel } from '../../models/patient/patientModel.js';

export const bookAppointmentForPatient = async (req: Request, res: Response) => {
  try {
    const { id: generalDoctorId, role } = req.user!;
    const { patientId, specialistId, date, reason } = req.body;

    if (role !== 'doctor') {
      res.status(403).json({ message: 'Only doctors can book appointments' });
      return 
    }

    if (!patientId || !specialistId || !date || !reason) {
       res.status(400).json({ message: 'Missing required fields' });
       return
    }

    const patient = await PatientModel.findById(patientId);
    if (!patient){
        res.status(404).json({ message: 'Patient not found' });
         return }

    const specialist = await DoctorModel.findById(specialistId);
    if (!specialist || specialist._id.equals(generalDoctorId)) {
       res.status(404).json({ message: 'Specialist not found or invalid' });
       return
    }

    const appointment = await AppointmentModel.create({
      patient: patient._id,
      doctor: specialist._id,
      bookedBy: generalDoctorId,
      date,
      reason,
    });

    res.status(201).json({
      message: 'Appointment booked with specialist',
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSpecialistAppointments = async (req: Request, res: Response) => {
  try {
    const { id: doctorId, role } = req.user!;

    if (role !== 'doctor') {
     res.status(403).json({ message: "Only doctors can view this route" });
      return 
    }

    const appointments = await AppointmentModel.find({ doctor: doctorId })
      .populate("patient", "firstname lastname email")
      .populate("bookedBy", "firstname lastname email")
      .sort({ date: 1 });

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
