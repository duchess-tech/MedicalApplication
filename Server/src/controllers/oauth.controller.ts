import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { generateToken } from '../utils/jwt.js';
import { DoctorModel } from '../models/doctor/doctorModel.js';
import { PatientModel } from '../models/patient/patientModel.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleOAuthLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id_token, role } = req.body;

  if (!id_token || !role || !['doctor', 'patient'].includes(role)) {
    res.status(400).json({ error: "id_token and valid role are required" });
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.given_name || !payload.sub) {
      throw new Error("Invalid Google token payload");
    }

    const { email, given_name, family_name, sub } = payload;

    let user;
    if (role === 'doctor') {
      user = await DoctorModel.findOne({ email });
    } else {
      user = await PatientModel.findOne({ email });
    }

      if (!user) {
  res.status(403).json({ error: 'User not registered. Please sign up first.' });
  return;
}


    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      message: 'Google login successful',
      user: {
        id: user._id.toString(),
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Google login failed" });
  }
};
