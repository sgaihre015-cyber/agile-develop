process.env.DB_PATH = ':memory:';

const request = require('supertest');
const app = require('../server');
const { initDb } = require('../db/database');

const db = initDb();

beforeEach(() => {
  db.exec('DELETE FROM books;');
});

describe('Books API', () => {
  test('GET /api/books returns empty list', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ data: [] });
  });

  test('POST /api/books creates a record', async () => {
    const payload = {
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      year: 2017,
      publisher: 'Pearson'
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
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      year: 2003,
      publisher: 'Addison-Wesley'
    });

    const updated = await request(app)
      .put(`/api/books/${created.body.data.id}`)
      .send({
        title: 'Domain-Driven Design (2nd Edition)',
        author: 'Eric Evans',
        year: 2026,
        publisher: 'Addison-Wesley'
      });

    expect(updated.statusCode).toBe(200);
    expect(updated.body.data.title).toBe('Domain-Driven Design (2nd Edition)');
    expect(updated.body.data.year).toBe(2026);
  });

  test('DELETE /api/books/:id deletes a record', async () => {
    const created = await request(app).post('/api/books').send({
      title: 'Design Patterns',
      author: 'Erich Gamma',
      year: 1994,
      publisher: 'Addison-Wesley'
    });

    const deleted = await request(app).delete(`/api/books/${created.body.data.id}`);
    expect(deleted.statusCode).toBe(204);

    const check = await request(app).get(`/api/books/${created.body.data.id}`);
    expect(check.statusCode).toBe(404);
  });
});
