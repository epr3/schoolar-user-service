import Redis = require('ioredis');
import kue = require('kue');

const queue = kue.createQueue({
  redis: {
    host: 'redis',
    port: 6379
  }
});

const redis = new Redis(6379, 'redis');

redis.on('pmessage', (pattern: string, channel: string, message: string) => {
  console.log(`Received the following message from ${channel}: ${message}`);
  queue
    .create('student.delete', { userId: message })
    .removeOnComplete(true)
    .attempts(5)
    .backoff({ delay: 60 * 1000, type: 'exponential' })
    .save();
});

redis.psubscribe('user.*');
console.log('Dispatcher is on!');
