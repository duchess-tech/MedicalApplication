import { Router } from "express";
import { verifyToken } from "../../middlewares/auth";
import { getMe, updatePatientProfile } from "../../controllers/patient/profile.controller";

const router = Router();

router.get("/me", verifyToken, getMe);
router.put("/update", verifyToken, updatePatientProfile);

export default router;
