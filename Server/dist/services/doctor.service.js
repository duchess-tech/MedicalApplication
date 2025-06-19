import { hashPassword } from '../utils/hash.js';
import { users } from '../models/user.model.js';
export const registerDoctorService = async (data) => {
    const { name, email, password, licenseNumber, specialization } = data;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        const err = new Error("Email already in use");
        err.code = 'USER_EXISTS';
        throw err;
    }
    const hashedPassword = await hashPassword(password);
    const doctor = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        role: 'doctor',
        licenseNumber,
        specialization,
    };
    users.push(doctor);
    return doctor;
};
