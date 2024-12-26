const request = require('supertest');
const app = require('../src/index');

describe('Post API Endpoints', () => {
  let createdPostId;

  test('GET /api/posts should return all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('POST /api/posts should create a new post', async () => {
    const newPost = {
      title: 'Test Post',
      description: 'Test Description',
      user_id: 1,
      images: ['test-image.jpg']
    };

    const res = await request(app)
      .post('/api/posts')
      .send(newPost);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdPostId = res.body.id;
  });

  test('PUT /api/posts/:id should update a post', async () => {
    const updatedPost = {
      title: 'Updated Test Post',
      description: 'Updated Test Description',
      user_id: 1,
      images: ['updated-test-image.jpg']
    };

    const res = await request(app)
      .put(`/api/posts/${createdPostId}`)
      .send(updatedPost);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(updatedPost.title);
  });

  test('DELETE /api/posts/:id should delete a post', async () => {
    const res = await request(app)
      .delete(`/api/posts/${createdPostId}`);

    expect(res.statusCode).toBe(204);
  });
});