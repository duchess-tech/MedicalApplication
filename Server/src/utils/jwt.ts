import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET must be set in .env");


export const generateToken = (payload: object): string => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

  const options: SignOptions = {
    expiresIn: expiresIn as unknown as number
  };

  return jwt.sign(payload, JWT_SECRET, options);
};
