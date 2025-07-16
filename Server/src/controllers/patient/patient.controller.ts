import { Request, Response ,NextFunction} from 'express';
import { validatePatientData } from '../../utils/validators.js';
import { registerPatientService } from '../../services/patient/patient.service.js';
import bcrypt from "bcrypt";
import { PatientModel } from "../../models/patient/patientModel";

export const registerPatient = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const error = validatePatientData(req.body);
    if (error) res.status(400).json({ error });

    const patient = await registerPatientService(req.body);
    res.status(201).json({ message: "Patient registered", patient });
  } catch (err: any) {
    if (err.code === "USER_EXISTS") res.status(409).json({ error: err.message });
    res.status(500).json({ error: "Server error" });
  }
};



export const changePatientPassword = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.user!;

    if (role !== 'patient') {
      res.status(403).json({ message: 'Access denied. Patients only.' });
      return 
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
       res.status(400).json({ message: 'Current and new password required' });
       return
    }

    const patient = await PatientModel.findById(id);

    if (!patient) {
       res.status(404).json({ message: 'Patient not found' });
       return
    }

    const isMatch = await bcrypt.compare(currentPassword, patient.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Current password is incorrect' });
      return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    patient.password = hashedPassword;

    await patient.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


