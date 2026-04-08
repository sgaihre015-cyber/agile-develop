const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

let db;

function getDb() {
  if (!db) {
    const dbPath = process.env.DB_PATH || path.join(__dirname, 'library.db');
    db = new DatabaseSync(dbPath);
  }
  return db;
}

function initDb() {
  const conn = getDb();
  conn.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      year INTEGER NOT NULL,
      genre TEXT DEFAULT ''
    );
  `);
  return conn;
}

module.exports = {
  getDb,
  initDb
};
