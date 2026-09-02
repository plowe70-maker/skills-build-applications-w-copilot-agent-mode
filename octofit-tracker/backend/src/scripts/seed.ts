/**
2
* Seed script for OctoFit Tracker.
3
* Populates octofit_db with test data including users,
4
* teams, activities, leaderboard entries, and workouts.
5
*/

import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'alex.runner', email: 'alex.runner@example.com', profile: 'Distance runner' },
      { username: 'jamie.lifter', email: 'jamie.lifter@example.com', profile: 'Strength trainee' },
      { username: 'taylor.walker', email: 'taylor.walker@example.com', profile: 'Daily walker' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Trail Blazers', members: [users[0]._id, users[2]._id] },
      { name: 'Power Pack', members: [users[1]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'running', durationMinutes: 35, points: 70, date: new Date('2026-08-30') },
      { user: users[1]._id, type: 'strength', durationMinutes: 45, points: 90, date: new Date('2026-08-31') },
      { user: users[2]._id, type: 'walking', durationMinutes: 30, points: 45, date: new Date('2026-09-01') },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[1]._id, team: teams[1]._id, points: 320 },
      { user: users[0]._id, team: teams[0]._id, points: 285 },
      { user: users[2]._id, team: teams[0]._id, points: 240 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Momentum',
        description: 'A light full-body routine to start the day.',
        difficulty: 'beginner',
        durationMinutes: 20,
      },
      {
        title: 'Interval Builder',
        description: 'Short running intervals to build endurance.',
        difficulty: 'intermediate',
        durationMinutes: 30,
      },
      {
        title: 'Strength Circuit',
        description: 'A progressive circuit for total-body strength.',
        difficulty: 'advanced',
        durationMinutes: 45,
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
