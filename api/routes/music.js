const express = require('express');
const { initDb } = require('../db/database');

const router = express.Router();

const parseId = (value) => Number.parseInt(value, 10);
const toPublicItem = (row) => ({
  id: row.id,
  title: row.title,
  artist: row.artist,
  year: row.year,
  genre: row.genre
});

function validateItem(payload) {
  if (!payload || typeof payload !== 'object') return 'Invalid payload';
  if (!payload.title || !String(payload.title).trim()) return 'title is required';
  if (!payload.artist || !String(payload.artist).trim()) return 'artist is required';
  if (!Number.isInteger(payload.year)) return 'year must be an integer';
  return null;
}

/**
 * @api {get} /api/music List music library items
 * @apiName GetMusicItems
 * @apiGroup MusicLibrary
 *
 * @apiSuccess {Object[]} data Items.
 */
router.get('/', (_req, res) => {
  const db = initDb();
  const rows = db.prepare('SELECT * FROM music_items ORDER BY id ASC').all();
  res.json({ data: rows.map(toPublicItem) });
});

/**
 * @api {get} /api/music/:id Get music library item
 * @apiName GetMusicItem
 * @apiGroup MusicLibrary
 * @apiParam {Number} id Item id.
 */
router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const db = initDb();
  const row = db.prepare('SELECT * FROM music_items WHERE id = ?').get(id);
  if (!row) {
    return res.status(404).json({ error: 'Item not found' });
  }
  return res.json({ data: toPublicItem(row) });
});

/**
 * @api {post} /api/music Create music library item
 * @apiName CreateMusicItem
 * @apiGroup MusicLibrary
 */
router.post('/', (req, res) => {
  const err = validateItem(req.body);
  if (err) {
    return res.status(400).json({ error: err });
  }

  const db = initDb();
  const { title, artist, year, genre = '' } = req.body;
  const result = db
    .prepare('INSERT INTO music_items (title, artist, year, genre) VALUES (?, ?, ?, ?)')
    .run(String(title).trim(), String(artist).trim(), year, String(genre));

  const row = db
    .prepare('SELECT * FROM music_items WHERE id = ?')
    .get(Number(result.lastInsertRowid));

  return res.status(201).json({ data: toPublicItem(row) });
});

/**
 * @api {put} /api/music/:id Update music library item
 * @apiName UpdateMusicItem
 * @apiGroup MusicLibrary
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
  const { title, artist, year, genre = '' } = req.body;
  const result = db
    .prepare('UPDATE music_items SET title = ?, artist = ?, year = ?, genre = ? WHERE id = ?')
    .run(String(title).trim(), String(artist).trim(), year, String(genre), id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const updated = db.prepare('SELECT * FROM music_items WHERE id = ?').get(id);
  return res.json({ data: toPublicItem(updated) });
});

/**
 * @api {delete} /api/music/:id Delete music library item
 * @apiName DeleteMusicItem
 * @apiGroup MusicLibrary
 * @apiParam {Number} id Item id.
 */
router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const db = initDb();
  const result = db.prepare('DELETE FROM music_items WHERE id = ?').run(id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Item not found' });
  }
  return res.status(204).send();
});

module.exports = router;
