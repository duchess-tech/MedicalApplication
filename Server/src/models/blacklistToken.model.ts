import mongoose from 'mongoose';

const BlacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

BlacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const BlacklistedTokenModel = mongoose.model('BlacklistedToken', BlacklistedTokenSchema);
