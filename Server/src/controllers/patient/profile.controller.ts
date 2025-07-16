import { Request, Response } from "express";
import { PatientModel } from "../../models/patient/patientModel";

export const getMe = async (req: Request, res: Response ) => {
  try {
    const { id, role } = req.user as { id: string; role: string };

    if (role !== 'patient') {
      res.status(403).json({ message: 'Access denied. Patients only.' });
    }

    const patient = await PatientModel.findById(id).select('-password');

    if (!patient) {
 res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePatientProfile = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.user!;

    if (role !== 'patient') {
      res.status(403).json({ message: 'Access denied. Patients only.' });
       return
    }

    const updatedData = req.body;

    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedPatient) {
       res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: "Profile updated", patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
