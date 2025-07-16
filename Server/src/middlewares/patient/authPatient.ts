import {  Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/express';



const authPatient= (req: AuthenticatedRequest, res: Response, next: NextFunction):void => {
  if (req.user?.role !== 'patient') {
   console.log("authpatient")
     res.status(403).json({ message: 'Access denied' });
     return
  }
 return next();
};

export default authPatient;
