import { Request, Response, NextFunction } from 'express';
import { BlacklistedTokenModel } from '../models/blacklistToken.model';

export const checkBlacklist = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  const blacklisted = await BlacklistedTokenModel.findOne({ token });
  if (blacklisted) {
    return res.status(401).json({ message: "Token has been revoked" });
  }

  next();
};
