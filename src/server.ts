import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { header, errorHandler, currentUser } from './middleware';
import { NotFound } from './errors';

import auth from './auth/routes/routes';
import { AUTH_BASE_END_POINT } from './auth/routes/end-points';

const server = express();

server.set('trust proxy', true);
server.use(cors());
// server.use(header);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test'
  })
);
server.use(currentUser);
server.use(AUTH_BASE_END_POINT, auth);

server.use('*', async () => {
  throw new NotFound();
});

server.use(errorHandler);

export default server;
