import { loginUserService } from '../services/auth.service.js';
export const loginUser = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
        }
        const { user, token } = await loginUserService({ email, password, role });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            },
            token
        });
    }
    catch (error) {
        const status = error.code === "ROLE_REQUIRED" ? 400 :
            error.code === "INVALID_CREDENTIALS" ? 401 :
                error.code === "WRONG_ROLE" ? 403 : 500;
        res.status(status).json({ message: error.message || "Login failed" });
    }
};
export const logOut = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};
