import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000' });

async function run() {
  try {
    console.log('Signing up...');
    const signup = await api.post('/signup', { name: 'Test User', email: 'test@example.com', password: 'pass1234' });
    console.log('Signup response:', signup.data);
  } catch (e) {
    console.log('Signup error:', e.response ? e.response.data : e.message);
  }

  try {
    console.log('Logging in...');
    const login = await api.post('/login', { email: 'test@example.com', password: 'pass1234' });
    console.log('Login response:', login.data);
  } catch (e) {
    console.log('Login error:', e.response ? e.response.data : e.message);
  }
}

run();
