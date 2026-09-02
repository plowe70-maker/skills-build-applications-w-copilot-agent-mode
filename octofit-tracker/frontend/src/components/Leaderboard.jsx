import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { DataPage, EmptyState } from './Activities.jsx';

const API_ENDPOINT = '/api/leaderboard';

function Leaderboard() {
  const [entries, setEntries] = useState([]); const [error, setError] = useState('');
  useEffect(() => { fetchCollection(API_ENDPOINT).then(setEntries).catch((err) => setError(err.message)); }, []);
  return <DataPage title="Leaderboard" kicker="Friendly competition" error={error}><div className="data-list">{entries.map((entry, index) => <article className="data-row rank-row" key={entry._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div><strong>{entry.user?.username || 'OctoFit member'}</strong><span>{entry.team?.name || 'Independent'}</span></div><em>{entry.points || 0} pts</em></article>)}</div>{!entries.length && !error && <EmptyState text="The leaderboard is ready for its first entry." />}</DataPage>;
}
export default Leaderboard;
