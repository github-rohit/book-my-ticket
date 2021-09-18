import request from 'supertest';

import server from '../../../server';
import { SIGNOUT_END_POINT } from '../../routes/end-points';

const reqData = {
  password: '123456789',
  email: 'test@test.com',
  name: 'rohit'
};

it('clears the cookie after signing out', async () => {
  await global.signup(reqData);

  const response = await request(server)
    .post(SIGNOUT_END_POINT)
    .send({})
    .expect(200);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
