import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import app from '..';

describe('Task manager', () => {
  let server;
  let agent;

  beforeAll(() => {
    expect.extend(matchers);
  });

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
    expect(res).toHaveHTTPStatus(200);
  });

  it('GET 404', async () => {
    const res = await agent.get('/wrong-path');
    expect(res).toHaveHTTPStatus(404);
  });
});
