import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const API_ENDPOINT = '/api/activities';

export function DataPage({ title, kicker, error, children }) { return <section className="data-page"><p className="eyebrow">{kicker}</p><h1>{title}</h1>{error ? <p className="error-message">{error}</p> : children}</section>; }
export function EmptyState({ text }) { return <p className="empty-state">{text}</p>; }

function Activities() {
  const [activities, setActivities] = useState([]); const [error, setError] = useState('');
  useEffect(() => { fetchCollection(API_ENDPOINT).then(setActivities).catch((err) => setError(err.message)); }, []);
  return <DataPage title="Activity log" kicker="Keep showing up" error={error}><div className="data-list">{activities.map((activity) => <article className="data-row" key={activity._id}><div><strong>{activity.type}</strong><span>{activity.date ? new Date(activity.date).toLocaleDateString() : 'Recent session'}</span></div><b>{activity.durationMinutes} min</b><em>{activity.points || 0} pts</em></article>)}</div>{!activities.length && !error && <EmptyState text="No activities logged yet." />}</DataPage>;
}
export default Activities;
