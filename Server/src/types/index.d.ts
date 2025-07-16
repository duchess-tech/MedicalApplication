import { Request } from "express";

declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      email: string;
      role: "patient" | "doctor" | "admin";
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

// import { JwtPayload } from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//         email: string;
//         role: 'patient' | 'doctor';
//       };
//     }
//   }
// }
