import { hashPassword } from '../utils/hash.js';
import { DoctorModel } from '../models/doctorModel.js';
export const registerDoctorService = async (data) => {
    const { firstname, lastname, email, gender, phone, password, licenseNumber, specialization } = data;
    const existingUser = await DoctorModel.findOne({ email: data.email });
    if (existingUser) {
        const err = new Error("Email already in use");
        err.code = 'USER_EXISTS';
        throw err;
    }
    const hashedPassword = await hashPassword(password);
    const doctor = new DoctorModel({
        id: DoctorModel.length + 1,
        firstname,
        lastname,
        email,
        gender,
        phone,
        password: hashedPassword,
        role: 'doctor',
        licenseNumber,
        specialization,
    });
    await doctor.save();
    return doctor;
};
