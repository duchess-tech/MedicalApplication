import { Request, Response } from "express";
import { FamilyMemberModel } from "../../models/patient/familyMemberModel";

export const addFamilyMember = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { id: patientId, role } = req.user!;
    const { name, age, relationship, gender } = req.body;

    if (role !== "patient") {
     res.status(403).json({ message: "Only patients can add family members" });
      return 
    }

    if (!name || !age || !relationship) {
      res.status(400).json({ message: "Missing required fields" });
       return 
    }

    const member = await FamilyMemberModel.create({
      patient: patientId,
      name,
      age,
      relationship,
      gender,
    });

    res.status(201).json({ message: "Family member added", member });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
