export interface IUserBase {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string;
  phone: number;
  googleId?: string;
  role: 'patient' | 'doctor';
  address?: string;
  bloodGroup?: string;
  allergies?: string[];
  medicalConditions?: string[];
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
}

export interface IPatient extends IUserBase {
  age: number;
  role: 'patient';
}
