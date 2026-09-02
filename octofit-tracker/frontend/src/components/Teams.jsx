import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { DataPage, EmptyState } from './Activities.jsx';

const API_ENDPOINT = '/api/teams';

function Teams() {
  const [teams, setTeams] = useState([]); const [error, setError] = useState('');
  useEffect(() => { fetchCollection(API_ENDPOINT).then(setTeams).catch((err) => setError(err.message)); }, []);
  return <DataPage title="Teams" kicker="Find your people" error={error}><div className="card-grid">{teams.map((team) => <article className="team-card" key={team._id}><span className="team-mark">+</span><h2>{team.name}</h2><p>{team.members?.length || 0} members</p></article>)}</div>{!teams.length && !error && <EmptyState text="Create a team to get moving together." />}</DataPage>;
}
export default Teams;
