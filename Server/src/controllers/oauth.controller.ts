import { NextFunction, Request, Response} from 'express';
import { OAuth2Client } from 'google-auth-library';
import { generateToken } from '../utils/jwt.js';
import {users } from '../models/user.model.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleOAuthLogin = async (req: Request, res: Response,next: NextFunction) : Promise<void> => {
  const { id_token } = req.body;

  if (!id_token) {
      res.status(400).json({ error: "Google ID token is required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.name || !payload.sub) {
        throw new Error('Invalid Google token payload');
      }
      
    const { email, name, sub } = payload;

    if (!email ||!sub||!name) {
         res.status(400).json({ error: "Missing token payload" });
      }

       
    let user = users.find(u => u.email === email);
    
    if (!user) {
      user = {
        id: users.length + 1,
        name: name || 'No Name',
        email,
        password: '',
        role: 'patient', 
        googleId: sub,
        age: 0, 
        gender:'',
        phone:'',
      };
      users.push(user);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

     res.status(200).json({
      message: 'Login successful via Google',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
     res.status(500).json({ error: "Google login failed" });
  }
};
