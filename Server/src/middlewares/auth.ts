import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded && 'email' in decoded) {
      req.user = {
        id: decoded.id as string,
        email: decoded.email as string,
        role: decoded.role as 'patient' | 'doctor',
      };
      next();
    } else {
      res.status(401).json({ message: 'Invalid token payload' });
      
    }
  } catch (err) {
   res.status(401).json({ message: 'Invalid token' });
  }
};

