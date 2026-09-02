const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function fetchCollection(component) {
  const endpoint = component.startsWith('http')
    ? component
    : `${apiBaseUrl}${component.startsWith('/api/') ? component : `/api/${component}/`}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Unable to load ${component} (${response.status})`);
  const payload = await response.json();
  if (Array.isArray(payload)) return payload;
  return payload.data || payload.results || payload.items || [];
}

export { apiBaseUrl };
