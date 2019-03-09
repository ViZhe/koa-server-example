
import request from 'supertest';

import app from '../../../app';


describe('REST API', () => {
  describe('Path /api', () => {
    let response:request.Response;

    beforeAll(async () => {
      response = await request(app.callback()).get('/api');
    });

    it('should get answer with a code 200', () => {
      expect(response.status).toEqual(200);
    });

    it('should get answer a type json ', () => {
      expect(response.type).toEqual('application/json');
    });

    it('should match body with snapshot', () => {
      expect(response.body).toMatchSnapshot();
    });
  });
});
