import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import server from '../server';
import { SIGNUP_END_POINT } from '../auth/routes/end-points';

declare global {
  // eslint-disable-next-line no-var
  var signup: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<string[]>;
  // eslint-disable-next-line no-var
  var signin: (data: { email: string; password: string }) => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'sssss';
  process.env.SALT_KEY = 'xoxoxoxox';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo?.stop();
  mongoose.connection.close();
});

jest.setTimeout(30000);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.signup = async (reqData: any) => {
  const response = await request(server)
    .post(SIGNUP_END_POINT)
    .send(reqData)
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.signin = async (reqData: any) => {
  const response = await request(server)
    .post(SIGNUP_END_POINT)
    .send(reqData)
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
