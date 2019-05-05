import request from 'supertest';
import app from '..';

describe('Task manager', () => {
  let server;
  let agent;

  beforeEach(() => {
    server = app.listen(3000);
    agent = request.agent(server);
  });

  afterEach((done) => {
    server.close();
    done();
  });

  test('GET /', async () => {
    const res = await agent.get('/');
    if (res.error) {
      throw res.error;
    }
    expect(res.status).toBe(200);
  });
});
