const request = require('supertest');
const app = require('../src/app');
const { initializeDatabase, get } = require('../src/db/database');

describe('Music Library API', () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/songs returns seeded records', async () => {
    const res = await request(app).get('/api/songs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(20);
  });

  test('POST /api/songs creates a song', async () => {
    const payload = {
      title: 'Numb',
      artist: 'Linkin Park',
      genre: 'Rock',
      year: 2003
    };

    const res = await request(app).post('/api/songs').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(payload.title);
  });

  test('PUT /api/songs/:id updates an existing song', async () => {
    const existing = await get('SELECT id FROM songs ORDER BY id LIMIT 1');
    const payload = {
      title: 'Updated Song Title',
      artist: 'Updated Artist',
      genre: 'Pop',
      year: 2021
    };

    const res = await request(app).put(`/api/songs/${existing.id}`).send(payload);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(payload.title);
  });

  test('DELETE /api/songs/:id deletes a song', async () => {
    const createRes = await request(app).post('/api/songs').send({
      title: 'Temp Song',
      artist: 'Temp Artist',
      genre: 'Pop',
      year: 2022
    });

    const deleteRes = await request(app).delete(`/api/songs/${createRes.body.id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.message).toBe('Song deleted successfully');
  });

  test('invalid payload returns 400', async () => {
    const res = await request(app).post('/api/songs').send({ title: '' });
    expect(res.status).toBe(400);
  });
});
