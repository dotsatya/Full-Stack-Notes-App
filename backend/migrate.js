import db from './db.js';

const createUsers = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
)`;

const createNotes = `CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  details TEXT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;

async function run() {
  db.query(createUsers, (err) => {
    if (err) {
      console.error('Failed to create users table', err);
    } else {
      console.log('Users table ensured');
    }
  });

  db.query(createNotes, (err) => {
    if (err) {
      console.error('Failed to create notes table', err);
    } else {
      console.log('Notes table ensured');
    }
  });

  // Add user_id column if missing (for safety)
  const alter = `ALTER TABLE notes ADD COLUMN IF NOT EXISTS user_id INT`;
  db.query(alter, (err) => {
    if (err) {
      // Some MySQL versions don't support IF NOT EXISTS for ADD COLUMN — ignore errors
    } else {
      console.log('Notes table altered (user_id ensured)');
    }
  });
}

run();
