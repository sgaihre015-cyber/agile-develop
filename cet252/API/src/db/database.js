const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const seedData = require('./seedData');

const dbPath = path.join(__dirname, '..', '..', 'music_library.db');
const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

async function initializeDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS songs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      genre TEXT NOT NULL,
      year INTEGER NOT NULL CHECK (year BETWEEN 1800 AND 2100),
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const count = await get('SELECT COUNT(*) AS total FROM songs');
  if (!count || count.total < 20) {
    await run('DELETE FROM songs');
    for (const song of seedData) {
      await run(
        'INSERT INTO songs (title, artist, genre, year) VALUES (?, ?, ?, ?)',
        [song.title, song.artist, song.genre, song.year]
      );
    }
  }
}

module.exports = {
  db,
  run,
  get,
  all,
  initializeDatabase
};
