import { hashPassword } from '../utils/hash.js';
import { PatientModel } from '../models/patientModel.js';
export const registerPatientService = async (data) => {
    const { firstname, lastname, email, password, age, gender, phone } = data;
    const exists = await PatientModel.findOne({ email: data.email });
    if (exists) {
        const err = new Error("Email already registered");
        err.code = "USER_EXISTS";
        throw err;
    }
    const hashedPassword = await hashPassword(password);
    const patient = new PatientModel({
        id: PatientModel.length + 1,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: 'patient',
        age,
        gender,
        phone
    });
    await patient.save();
    return patient;
};
