import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    profile: { type: String, default: '' },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);