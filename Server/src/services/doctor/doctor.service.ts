import { DoctorModel } from '../../models/doctor/doctorModel.js';
import { hashPassword } from '../../utils/hash.js';

interface DoctorData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: number;
  gender: string;
  licenseNumber: string;
  specialization: string;
}

export const registerDoctorService = async (data: DoctorData) => {
  const { firstname,lastname, email,gender,phone, password, licenseNumber, specialization } = data;

  const existingUser =await DoctorModel.findOne({ email: data.email })
  if (existingUser) {
    const err = new Error("Email already in use");
    (err as any).code = 'USER_EXISTS';
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
    role: 'doctor' as "doctor",
    licenseNumber,
    specialization,
  })

await doctor.save();
  return doctor;
};
