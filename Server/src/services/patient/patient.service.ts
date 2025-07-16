import { hashPassword } from '../../utils/hash.js';
import { PatientModel } from '../../models/patient/patientModel.js';

interface PatientInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
}

export const registerPatientService = async (data: PatientInput)=> {
  const { firstname,lastname, email, password, age, gender, phone } = data;
  const exists =  await PatientModel.findOne({ email: data.email });

  if (exists) {
    const err = new Error("Email already registered");
    (err as any).code = "USER_EXISTS";
    throw err;
  }

  const hashedPassword = await hashPassword(password);

  const patient = new PatientModel({
    id:PatientModel.length + 1,
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role: 'patient',
    age,
    gender,
    phone
  });
  await patient.save()
  return patient;
};
