import { hashPassword } from '../utils/hash.js';
import { users } from '../models/user.model.js';
export const registerPatientService = async (data) => {
    const { name, email, password, age, gender, phone } = data;
    const exists = users.find(u => u.email === email);
    if (exists) {
        const err = new Error("Email already registered");
        err.code = "USER_EXISTS";
        throw err;
    }
    const hashedPassword = await hashPassword(password);
    const patient = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        role: 'patient',
        age,
        gender,
        phone
    };
    users.push(patient);
    return patient;
};
