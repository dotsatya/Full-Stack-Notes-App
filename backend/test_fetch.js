const base = 'http://localhost:5000';

async function post(path, body) {
  const res = await fetch(base + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

(async () => {
  console.log('Signing up...');
  const signup = await post('/signup', { name: 'Test User', email: 'test@example.com', password: 'pass1234' });
  console.log('Signup:', signup);

  console.log('Logging in...');
  const login = await post('/login', { email: 'test@example.com', password: 'pass1234' });
  console.log('Login:', login);
})();
