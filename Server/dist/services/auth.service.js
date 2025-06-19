import bcrypt from 'bcrypt';
import { users } from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
export const loginUserService = async (data) => {
    const { email, password } = data;
    const user = users.find(u => u.email === email);
    if (!user) {
        const err = new Error("Invalid credentials");
        err.code = "INVALID_CREDENTIALS";
        throw err;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const err = new Error("Invalid credentials");
        err.code = "INVALID_CREDENTIALS";
        throw err;
    }
    const token = generateToken({
        id: user.id,
        role: user.role,
        email: user.email
    });
    return { user, token };
};
