import bcrypt from 'bcrypt';
import { users, User } from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

interface LoginInput {
  email: string;
  password: string;
}

export const loginUserService = async (data: LoginInput): Promise<{ user: User, token: string }> => {
  const { email, password } = data;

  const user = users.find(u => u.email === email);
  if (!user) {
    const err = new Error("Invalid credentials");
    (err as any).code = "INVALID_CREDENTIALS";
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid credentials");
    (err as any).code = "INVALID_CREDENTIALS";
    throw err;
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
    email: user.email
  });

  return { user, token };
};
