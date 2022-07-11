import Queue from './redis/queue';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
  console.log(`Trying to start consume with no Redis host and/or port`);
  process.exit(-1);
}

export const startConsume = () => {
  console.log(`Start consuming queues from ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
  Queue.process();
};