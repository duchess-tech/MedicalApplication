import { hashPassword } from '../utils/hash.js';
import { users, Patient } from '../models/user.model.js';

interface PatientInput {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
}

export const registerPatientService = async (data: PatientInput): Promise<Patient> => {
  const { name, email, password, age, gender, phone } = data;

  const exists = users.find(u => u.email === email);
  if (exists) {
    const err = new Error("Email already registered");
    (err as any).code = "USER_EXISTS";
    throw err;
  }

  const hashedPassword = await hashPassword(password);

  const patient: Patient = {
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
