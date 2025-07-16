import { registerDoctorService } from '../services/doctor.service.js';
import { validateDoctorData } from '../utils/validators.js';
export const registerDoctor = async (req, res, next) => {
    try {
        const { firstname, lastname, email, phone, gender, password, licenseNumber, specialization } = req.body;
        // Validate input
        const validationError = validateDoctorData(req.body);
        if (validationError) {
            res.status(400).json({ error: validationError });
        }
        // Create doctors
        const doctor = await registerDoctorService({
            firstname,
            lastname,
            email,
            phone,
            gender,
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
