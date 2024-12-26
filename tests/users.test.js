const request = require('supertest');
const app = require('../src/index');

describe('User API Endpoints', () => {
  test('GET /api/users should return all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});