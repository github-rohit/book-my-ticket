import request from 'supertest';
import server from '../../../server';

import { SIGNUP_END_POINT } from '../../routes/end-points';

const reqData = {
  password: '123456789',
  name: 'rohit',
  email: 'test@test.com'
};

it('return a 201 on successful signup', async () => {
  await request(server).post(SIGNUP_END_POINT).send(reqData).expect(201);
});

it('return a 400 with an invalid email', async () => {
  await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      ...reqData,
      email: 'dghdgs'
    })
    .expect(400);
});

it('return a 400 with an invalid password', async () => {
  await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      ...reqData,
      password: '1'
    })
    .expect(400);
});

it('return a 400 with an invalid name', async () => {
  await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      ...reqData,
      name: ''
    })
    .expect(400);
});

it('return a 400 with an invalid email or password or name', async () => {
  const resemail = await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      password: reqData.password,
      name: reqData.name
    })
    .expect(400);

  expect(resemail.body.errors[0].field).toEqual('email');

  const respass = await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      name: reqData.name,
      email: reqData.email
    })
    .expect(400);
  expect(respass.body.errors[0].field).toEqual('password');

  const resname = await request(server)
    .post(SIGNUP_END_POINT)
    .send({
      password: reqData.password,
      email: reqData.email
    })
    .expect(400);

  expect(resname.body.errors[0].field).toEqual('name');
});

it('disallows duplicate emails', async () => {
  await request(server).post(SIGNUP_END_POINT).send(reqData).expect(201);
  await request(server).post(SIGNUP_END_POINT).send(reqData).expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(server)
    .post(SIGNUP_END_POINT)
    .send(reqData)
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
