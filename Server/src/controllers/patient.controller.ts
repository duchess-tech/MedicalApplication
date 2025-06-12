import { Request, Response ,NextFunction} from 'express';
import { validatePatientData } from '../utils/validators.js';
import { registerPatientService } from '../services/patient.service.js';

export const registerPatient = async (req: Request, res: Response, next: NextFunction) =>{
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
