import request from 'supertest';
import app from '../src/app';

describe('Task manager', () => {
  const server = app.listen(3000);
  const agent = request.agent(server);
  afterAll(() => {
    server.close();
  });

  test('GET /', async () => {
    const res = await agent.get('/');
    if (res.error) {
      throw res.error;
    }
    expect(res.status).toBe(200);
  });
});
