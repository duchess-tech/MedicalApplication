import { Request, Response,NextFunction } from 'express';
import { loginUserService } from '../services/auth.service.js';

export const loginUser =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
    }

    const { user, token } = await loginUserService({ email, password });

    res.status(200).json({ 
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err: any) {
    if (err.code === "INVALID_CREDENTIALS") {
       res.status(401).json({ error: err.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};
