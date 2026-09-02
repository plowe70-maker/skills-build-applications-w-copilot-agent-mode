import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);