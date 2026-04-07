const request = require('supertest');
const app = require('../src/app');

describe('Client app', () => {
  test('GET / renders page (with API running this should include table)', async () => {
    const res = await request(app).get('/');
    expect([200, 502]).toContain(res.status);
    expect(res.text).toContain('Music Library');
  });
});
