import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { DataPage, EmptyState } from './Activities.jsx';

const API_ENDPOINT = '/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]); const [error, setError] = useState('');
  useEffect(() => { fetchCollection(API_ENDPOINT).then(setWorkouts).catch((err) => setError(err.message)); }, []);
  return <DataPage title="Workout ideas" kicker="A little direction" error={error}><div className="card-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><span className="tag">{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><footer>{workout.durationMinutes} minutes <span aria-hidden="true">-&gt;</span></footer></article>)}</div>{!workouts.length && !error && <EmptyState text="Workout suggestions will appear here." />}</DataPage>;
}
export default Workouts;
