import mongoose, { Schema } from "mongoose";

const familyMemberSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    relationship: {
      type: String,
      enum: ["spouse", "child", "parent", "sibling", "other"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true }
);

export const FamilyMemberModel = mongoose.model("FamilyMember", familyMemberSchema);
