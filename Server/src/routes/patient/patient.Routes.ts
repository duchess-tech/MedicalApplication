import express from 'express';
import { verifyToken } from '../../middlewares/auth';
import { changePatientPassword } from '../../controllers/patient/patient.controller';

const router = express.Router();
router.put("/change-password", verifyToken, changePatientPassword);

export default router;
 