import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error("JWT_SECRET must be set in .env");
export const generateToken = (payload) => {
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const options = {
        expiresIn: expiresIn
    };
    return jwt.sign(payload, JWT_SECRET, options);
};
