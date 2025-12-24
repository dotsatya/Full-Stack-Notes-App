import fetch from 'node-fetch';

const base = 'http://localhost:5000';

async function post(path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(base + path, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

(async () => {
  console.log('Logging in...');
  const login = await post('/login', { email: 'test@example.com', password: 'pass1234' });
  console.log('Login:', login);

  if (login.status === 200 && login.data.token) {
    console.log('Creating a note with token...');
    const note = await post('/add-note', { title: 'API test', details: 'test details' }, login.data.token);
    console.log('Add note:', note);

    // Try to fetch notes using /notes endpoint (GET)
    const res = await fetch(base + '/notes', { headers: { Authorization: `Bearer ${login.data.token}` } });
    const notes = await res.json().catch(() => ({}));
    console.log('GET /notes:', { status: res.status, data: notes });
  }
})();