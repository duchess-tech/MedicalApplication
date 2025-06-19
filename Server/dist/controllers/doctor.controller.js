import { registerDoctorService } from '../services/doctor.service.js';
import { validateDoctorData } from '../utils/validators.js';
export const registerDoctor = async (req, res, next) => {
    try {
        const { name, email, password, licenseNumber, specialization } = req.body;
        // 1. Validate input
        const validationError = validateDoctorData(req.body);
        if (validationError) {
            res.status(400).json({ error: validationError });
        }
        // 2. Create doctor
        const doctor = await registerDoctorService({
            name,
            email,
            password,
            licenseNumber,
            specialization,
        });
        res.status(201).json({ message: "Doctor registered", doctor });
    }
    catch (err) {
        if (err.code === 'USER_EXISTS') {
            res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};
