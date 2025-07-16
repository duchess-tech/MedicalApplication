import { Router } from "express";
import { addFamilyMember } from "../../controllers/patient/familyController";
import { verifyToken } from "../../middlewares/auth";

const router = Router();

router.post("/family/add", verifyToken, addFamilyMember);

export default router;
