import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';
import { PatientModel } from '../models/patient/patientModel.js';
import { DoctorModel } from '../models/doctor/doctorModel.js';
export const loginUserService = async (data) => {
    // const authHeader = req.headers.authorization;
    // if (!authHeader?.startsWith("Bearer ")) {
    //   return res.status(400).json({ message: "Token missing" });
    // }
    // const token = authHeader.split(" ")[1];
    const { email, password, role } = data;
    if (!role) {
        const err = new Error("INVALID_CREDENTIALS");
        err.code = "ROLE_REQUIRED";
        throw err;
    }
    const user = await PatientModel.findOne({ email }) || await DoctorModel.findOne({ email });
    if (!user) {
        throwObjectWithCode("Invalid credentials", "INVALID_CREDENTIALS");
    }
    if (user.role !== role) {
        const err = new Error("INVALID_CREDENTIALS");
        err.code = "ROLE_REQUIRED";
        throw err;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throwObjectWithCode("Invalid credentials", "INVALID_CREDENTIALS");
    }
    const token = generateToken({
        id: user._id.toString(),
        role: user.role,
        email: user.email,
    });
    return {
        user: {
            id: user._id.toString(),
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
        },
        token,
    };
};
function throwObjectWithCode(message, code) {
    const err = new Error(message);
    err.code = code;
    throw err;
}
