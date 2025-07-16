import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';
import { PatientModel } from '../models/patient/patientModel.js';
import { DoctorModel } from '../models/doctor/doctorModel.js';

interface LoginInput {
  email: string;
  password: string;
  role: 'patient' | 'doctor';

}

interface LoginResponse {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: 'patient' | 'doctor';
  };
  token: string;
}

export const loginUserService = async (data: LoginInput): Promise<LoginResponse> => {
  // const authHeader = req.headers.authorization;

  // if (!authHeader?.startsWith("Bearer ")) {
  //   return res.status(400).json({ message: "Token missing" });
  // }

  // const token = authHeader.split(" ")[1];
  const { email, password,role } = data;
if (!role) {
  const err = new Error("INVALID_CREDENTIALS");
  (err as any).code = "ROLE_REQUIRED";
  throw err;
}
  const user = await PatientModel.findOne({ email }) || await DoctorModel.findOne({ email });

  if (!user) {
    throwObjectWithCode("Invalid credentials", "INVALID_CREDENTIALS");
  }
  if (user.role !== role) {
     const err = new Error("INVALID_CREDENTIALS");
  (err as any).code = "ROLE_REQUIRED";
  throw err;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throwObjectWithCode("Invalid credentials", "INVALID_CREDENTIALS");
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role as 'patient' | 'doctor',
    },
    token,
  };
};

function throwObjectWithCode(message: string, code: string): never {
  const err = new Error(message);
  (err as any).code = code;
  throw err;
}
