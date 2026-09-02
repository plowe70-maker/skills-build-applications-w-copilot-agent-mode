import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';
import { DataPage, EmptyState } from './Activities.jsx';

const API_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

function Users() {
  const [users, setUsers] = useState([]); const [error, setError] = useState('');
  useEffect(() => { fetchCollection(API_ENDPOINT).then(setUsers).catch((err) => setError(err.message)); }, []);
  return <DataPage title="Members" kicker="The OctoFit crew" error={error}><div className="data-list">{users.map((user) => <article className="data-row" key={user._id}><div><strong>{user.username}</strong><span>{user.email}</span></div><em>{user.profile || 'Member'}</em></article>)}</div>{!users.length && !error && <EmptyState text="No members found." />}</DataPage>;
}
export default Users;
