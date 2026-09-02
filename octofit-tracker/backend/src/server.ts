import cors from 'cors';
import express from 'express';
import './config/database.js';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'octofit_db' });
});

app.get('/api/users', async (_request, response) => {
  response.json(await User.find().sort({ createdAt: -1 }));
});

app.get('/api/teams', async (_request, response) => {
  response.json(await Team.find().sort({ createdAt: -1 }));
});

app.get('/api/activities', async (_request, response) => {
  response.json(await Activity.find().sort({ date: -1 }));
});

app.get('/api/leaderboard', async (_request, response) => {
  response.json(await LeaderboardEntry.find().sort({ points: -1 }));
});

app.get('/api/workouts', async (_request, response) => {
  response.json(await Workout.find().sort({ createdAt: -1 }));
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;

  console.log(`OctoFit backend listening at ${baseUrl}`);
});