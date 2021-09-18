import mongoose from 'mongoose';
import server from './server';

const port = process.env.PORT || 5000;

const start = async () => {
  if (!process.env.DB_URI) {
    throw new Error('DB_URI must be defined');
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.SALT_KEY) {
    throw new Error('SALT_KEY must be defined');
  }

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDb');
  } catch (ex) {
    console.error(ex);
  }

  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

start();
