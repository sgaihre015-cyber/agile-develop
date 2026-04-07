const express = require('express');
const { all, get, run } = require('../db/database');

const router = express.Router();

function isValidSongPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const { title, artist, genre, year } = payload;
  const yearNumber = Number(year);

  return (
    typeof title === 'string' && title.trim().length > 0 &&
    typeof artist === 'string' && artist.trim().length > 0 &&
    typeof genre === 'string' && genre.trim().length > 0 &&
    Number.isInteger(yearNumber) && yearNumber >= 1800 && yearNumber <= 2100
  );
}

/**
 * @api {get} /api/songs Get all songs
 * @apiName GetSongs
 * @apiGroup Songs
 *
 * @apiSuccess {Object[]} songs List of songs.
 * @apiSuccess {Number} songs.id Song ID.
 * @apiSuccess {String} songs.title Song title.
 * @apiSuccess {String} songs.artist Song artist.
 * @apiSuccess {String} songs.genre Song genre.
 * @apiSuccess {Number} songs.year Release year.
 */
router.get('/', async (_req, res) => {
  try {
    const songs = await all('SELECT id, title, artist, genre, year FROM songs ORDER BY id');
    res.json(songs);
  } catch {
    res.status(500).json({ message: 'Failed to fetch songs' });
  }
});

/**
 * @api {get} /api/songs/:id Get song by ID
 * @apiName GetSongById
 * @apiGroup Songs
 *
 * @apiParam {Number} id Song unique ID.
 * @apiSuccess {Number} id Song ID.
 * @apiSuccess {String} title Song title.
 * @apiSuccess {String} artist Song artist.
 * @apiSuccess {String} genre Song genre.
 * @apiSuccess {Number} year Release year.
 * @apiError NotFound Song not found.
 */
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: 'Invalid song id' });
    return;
  }

  try {
    const song = await get('SELECT id, title, artist, genre, year FROM songs WHERE id = ?', [id]);
    if (!song) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }
    res.json(song);
  } catch {
    res.status(500).json({ message: 'Failed to fetch song' });
  }
});

/**
 * @api {post} /api/songs Create a song
 * @apiName CreateSong
 * @apiGroup Songs
 *
 * @apiBody {String} title Song title.
 * @apiBody {String} artist Song artist.
 * @apiBody {String} genre Song genre.
 * @apiBody {Number} year Release year.
 *
 * @apiSuccess {Number} id Song ID.
 * @apiSuccess {String} title Song title.
 * @apiSuccess {String} artist Song artist.
 * @apiSuccess {String} genre Song genre.
 * @apiSuccess {Number} year Release year.
 */
router.post('/', async (req, res) => {
  if (!isValidSongPayload(req.body)) {
    res.status(400).json({ message: 'Invalid payload' });
    return;
  }

  const payload = {
    title: req.body.title.trim(),
    artist: req.body.artist.trim(),
    genre: req.body.genre.trim(),
    year: Number(req.body.year)
  };

  try {
    const result = await run(
      'INSERT INTO songs (title, artist, genre, year) VALUES (?, ?, ?, ?)',
      [payload.title, payload.artist, payload.genre, payload.year]
    );

    const song = await get('SELECT id, title, artist, genre, year FROM songs WHERE id = ?', [result.lastID]);
    res.status(201).json(song);
  } catch {
    res.status(500).json({ message: 'Failed to create song' });
  }
});

/**
 * @api {put} /api/songs/:id Update a song
 * @apiName UpdateSong
 * @apiGroup Songs
 *
 * @apiParam {Number} id Song unique ID.
 * @apiBody {String} title Song title.
 * @apiBody {String} artist Song artist.
 * @apiBody {String} genre Song genre.
 * @apiBody {Number} year Release year.
 *
 * @apiSuccess {Number} id Song ID.
 * @apiSuccess {String} title Song title.
 * @apiSuccess {String} artist Song artist.
 * @apiSuccess {String} genre Song genre.
 * @apiSuccess {Number} year Release year.
 */
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: 'Invalid song id' });
    return;
  }

  if (!isValidSongPayload(req.body)) {
    res.status(400).json({ message: 'Invalid payload' });
    return;
  }

  const payload = {
    title: req.body.title.trim(),
    artist: req.body.artist.trim(),
    genre: req.body.genre.trim(),
    year: Number(req.body.year)
  };

  try {
    const existing = await get('SELECT id FROM songs WHERE id = ?', [id]);
    if (!existing) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }

    await run(
      'UPDATE songs SET title = ?, artist = ?, genre = ?, year = ? WHERE id = ?',
      [payload.title, payload.artist, payload.genre, payload.year, id]
    );

    const updated = await get('SELECT id, title, artist, genre, year FROM songs WHERE id = ?', [id]);
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Failed to update song' });
  }
});

/**
 * @api {delete} /api/songs/:id Delete a song
 * @apiName DeleteSong
 * @apiGroup Songs
 *
 * @apiParam {Number} id Song unique ID.
 * @apiSuccess {String} message Deletion status.
 */
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: 'Invalid song id' });
    return;
  }

  try {
    const existing = await get('SELECT id FROM songs WHERE id = ?', [id]);
    if (!existing) {
      res.status(404).json({ message: 'Song not found' });
      return;
    }

    await run('DELETE FROM songs WHERE id = ?', [id]);
    res.json({ message: 'Song deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to delete song' });
  }
});

module.exports = router;
