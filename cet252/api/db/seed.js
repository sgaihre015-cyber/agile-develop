const { initDb } = require('./database');

const db = initDb();

db.exec('DELETE FROM books;');

const insert = db.prepare(
  'INSERT INTO books (title, author, year, publisher) VALUES (?, ?, ?, ?)'
);

[
  ['Clean Code', 'Robert C. Martin', 2008, 'Prentice Hall'],
  ['The Pragmatic Programmer', 'Andrew Hunt', 1999, 'Addison-Wesley'],
  ['Refactoring', 'Martin Fowler', 1999, 'Addison-Wesley']
].forEach((row) => insert.run(...row));

console.log('Seeded books data.');
