const { initDb } = require('./database');

const db = initDb();

db.exec('DELETE FROM books;');

const insert = db.prepare(
  'INSERT INTO books (title, artist, year, genre) VALUES (?, ?, ?, ?)'
);

[
  ['Random Access Memories', 'Daft Punk', 2013, 'Electronic'],
  ['Thriller', 'Michael Jackson', 1982, 'Pop'],
  ['Back in Black', 'AC/DC', 1980, 'Rock']
].forEach((row) => insert.run(...row));

console.log('Seeded music library data.');
