import request from 'supertest';
import server from '../../../server';

import { CHANGE_PASSWORD_END_POINT } from '../../routes/end-points';

const reqData = {
  password: '123456789',
  email: 'test@test.com',
  name: 'rohit'
};

it('user should be change password if login and supplied correct password', async () => {
  const cookie = await global.signup(reqData);

  await request(server)
    .put(CHANGE_PASSWORD_END_POINT)
    .set('Cookie', cookie)
    .send({
      password: '1234567890a'
    })
    .expect(200);
});

it('user should not be change password if not login 401', async () => {
  await request(server)
    .put(CHANGE_PASSWORD_END_POINT)
    .send({
      password: '1234567890a'
    })
    .expect(401);
});

it('user should not be change password password invalid 400', async () => {
  const cookie = await global.signup(reqData);

  await request(server)
    .put(CHANGE_PASSWORD_END_POINT)
    .set('Cookie', cookie)
    .send({
      password: '1'
    })
    .expect(400);
});
