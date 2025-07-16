import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express';


const authDoctor = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'doctor') {
     res.status(403).json({ message: 'Access denied' });
     return
  }
  return next();
};

export default authDoctor;
