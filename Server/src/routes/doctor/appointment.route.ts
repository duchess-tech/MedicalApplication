import { Router } from 'express';
import { bookAppointmentForPatient, getSpecialistAppointments } from '../../controllers/doctor/appointmentController';
import { verifyToken } from '../../middlewares/auth';

const router = Router();

router.post('/appointments/book', verifyToken, bookAppointmentForPatient);
router.get("/appointments/mine", verifyToken, getSpecialistAppointments);
export default router;
