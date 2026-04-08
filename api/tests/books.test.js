process.env.DB_PATH = ':memory:';

const request = require('supertest');
const app = require('../server');
const { initDb } = require('../db/database');

const db = initDb();

beforeEach(() => {
  db.exec('DELETE FROM music_items;');
});

describe('Music Library API', () => {
  test('GET /api/books returns empty list', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ data: [] });
  });

  test('POST /api/books creates a record', async () => {
    const payload = {
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      genre: 'Progressive Rock'
    };
    const res = await request(app).post('/api/books').send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toMatchObject(payload);
    expect(res.body.data.id).toBeDefined();
  });

  test('POST /api/books validates required fields', async () => {
    const res = await request(app).post('/api/books').send({ title: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('PUT /api/books/:id updates a record', async () => {
    const created = await request(app).post('/api/books').send({
      title: 'Nevermind',
      artist: 'Nirvana',
      year: 1991,
      genre: 'Grunge'
    });

    const updated = await request(app)
      .put(`/api/books/${created.body.data.id}`)
      .send({
        title: 'Nevermind (Remastered)',
        artist: 'Nirvana',
        year: 2011,
        genre: 'Rock'
      });

    expect(updated.statusCode).toBe(200);
    expect(updated.body.data.title).toBe('Nevermind (Remastered)');
    expect(updated.body.data.year).toBe(2011);
  });

  test('DELETE /api/books/:id deletes a record', async () => {
    const created = await request(app).post('/api/books').send({
      title: 'Hybrid Theory',
      artist: 'Linkin Park',
      year: 2000,
      genre: 'Nu Metal'
    });

    const deleted = await request(app).delete(`/api/books/${created.body.data.id}`);
    expect(deleted.statusCode).toBe(204);

    const check = await request(app).get(`/api/books/${created.body.data.id}`);
    expect(check.statusCode).toBe(404);
  });
});
