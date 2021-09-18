import request from 'supertest';
import server from '../../../server';

import { SIGNIN_END_POINT, SIGNUP_END_POINT } from '../../routes/end-points';

const reqData = {
  password: '123456789',
  email: 'test@test.com'
};

it('user should be login with email and password supplied', async () => {
  await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      ...reqData,
      name: 'rohit'
    })
    .expect(201);

  await request(server).post(SIGNIN_END_POINT).send(reqData).expect(200);
});

it('return a 400 with an invalid email supplied', async () => {
  await request(server)
    .post(SIGNIN_END_POINT)
    .send({
      ...reqData,
      email: 'dghdgs'
    })
    .expect(400);
});

it('return a 400 with an no password supplied', async () => {
  await request(server)
    .post(SIGNIN_END_POINT)
    .send({
      ...reqData,
      password: ''
    })
    .expect(400);
});

it('return a 400 with an wrong password', async () => {
  await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      ...reqData,
      name: 'rohit'
    })
    .expect(201);

  await request(server)
    .post(SIGNIN_END_POINT)
    .send({
      ...reqData,
      password: '1111'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      ...reqData,
      name: 'rohit'
    })
    .expect(201);

  const response = await request(server)
    .post(SIGNIN_END_POINT)
    .send({
      ...reqData
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
