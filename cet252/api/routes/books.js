const express = require('express');
const { initDb } = require('../db/database');

const router = express.Router();

const parseId = (value) => Number.parseInt(value, 10);
const toPublicItem = (row) => ({
  id: row.id,
  title: row.title,
  author: row.author,
  year: row.year,
  publisher: row.publisher
});

function validateItem(payload) {
  if (!payload || typeof payload !== 'object') return 'Invalid payload';
  if (!payload.title || !String(payload.title).trim()) return 'title is required';
  if (!payload.author || !String(payload.author).trim()) return 'author is required';
  if (!Number.isInteger(payload.year)) return 'year must be an integer';
  return null;
}

/**
 * @api {get} /api/books List books
 * @apiName GetBookItems
 * @apiGroup Books
 *
 * @apiSuccess {Object[]} data Items.
 */
router.get('/', (_req, res) => {
  const db = initDb();
  const rows = db.prepare('SELECT * FROM books ORDER BY id ASC').all();
  res.json({ data: rows.map(toPublicItem) });
});

/**
 * @api {get} /api/books/:id Get book item
 * @apiName GetBookItem
 * @apiGroup Books
 * @apiParam {Number} id Item id.
 */
router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const db = initDb();
  const row = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
  if (!row) {
    return res.status(404).json({ error: 'Item not found' });
  }
  return res.json({ data: toPublicItem(row) });
});

/**
 * @api {post} /api/books Create book item
 * @apiName CreateBookItem
 * @apiGroup Books
 */
router.post('/', (req, res) => {
  const err = validateItem(req.body);
  if (err) {
    return res.status(400).json({ error: err });
  }

  const db = initDb();
  const { title, author, year, publisher = '' } = req.body;
  const result = db
    .prepare('INSERT INTO books (title, author, year, publisher) VALUES (?, ?, ?, ?)')
    .run(String(title).trim(), String(author).trim(), year, String(publisher));

  const row = db
    .prepare('SELECT * FROM books WHERE id = ?')
    .get(Number(result.lastInsertRowid));

  return res.status(201).json({ data: toPublicItem(row) });
});

/**
 * @api {put} /api/books/:id Update book item
 * @apiName UpdateBookItem
 * @apiGroup Books
 * @apiParam {Number} id Item id.
 */
router.put('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const err = validateItem(req.body);
  if (err) {
    return res.status(400).json({ error: err });
  }

  const db = initDb();
  const { title, author, year, publisher = '' } = req.body;
  const result = db
    .prepare('UPDATE books SET title = ?, author = ?, year = ?, publisher = ? WHERE id = ?')
    .run(String(title).trim(), String(author).trim(), year, String(publisher), id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const updated = db.prepare('SELECT * FROM books WHERE id = ?').get(id);
  return res.json({ data: toPublicItem(updated) });
});

/**
 * @api {delete} /api/books/:id Delete book item
 * @apiName DeleteBookItem
 * @apiGroup Books
 * @apiParam {Number} id Item id.
 */
router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const db = initDb();
  const result = db.prepare('DELETE FROM books WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Item not found' });
  }
  return res.status(204).send();
});

module.exports = router;
