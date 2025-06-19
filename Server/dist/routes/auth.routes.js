import { Router } from 'express';
import { registerDoctor } from '../controllers/doctor.controller.js';
import { registerPatient } from '../controllers/patient.controller.js';
import { loginUser } from '../controllers/auth.controller.js';
const router = Router();
router.post('/register/doctor', registerDoctor);
router.post('/register/patient', registerPatient);
router.post('/login', loginUser);
export default router;
