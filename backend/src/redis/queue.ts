import Queue from 'bull';
import * as jobs from '../jobs';
import dotenv from 'dotenv';

dotenv.config();

const queues = Object.values(jobs).map((job) => {
  const queue = new Queue(job.key, {
    defaultJobOptions: {
      attempts: 3,
      priority: job.priority,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }
  });

  queue.on('error', (error) => {
    process.exit(-1);
  });

  return {
    bull: queue,
    name: job.key,
    handle: job.handle
  };
});

export default {
  queues,
  add(name: string, data: any) {
    const queue = this.queues.find((q) => q.name === name);
    return queue?.bull.add(data);
  },
  process() {
    return this.queues.forEach((q) => q.bull.process(q.handle));
  }
};