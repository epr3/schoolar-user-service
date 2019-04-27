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
  console.log(
    `Received the following message from ${channel}: ${message} on ${pattern}`
  );
  switch (channel) {
    case 'user.student.delete':
      queue
        .create(channel, { userId: message })
        .removeOnComplete(true)
        .attempts(5)
        .backoff({ delay: 60 * 1000, type: 'exponential' })
        .save();
      break;
    case 'user.professor.delete':
      queue
        .create(channel, { userId: message })
        .removeOnComplete(true)
        .attempts(5)
        .backoff({ delay: 60 * 1000, type: 'exponential' })
        .save();
      break;
    case 'user.professor.create':
      queue
        .create(channel, { ...JSON.parse(message) })
        .removeOnComplete(true)
        .attempts(5)
        .backoff({ delay: 60 * 1000, type: 'exponential' })
        .save();
      break;
    case 'user.student.create':
      queue
        .create(channel, { ...JSON.parse(message) })
        .removeOnComplete(true)
        .attempts(5)
        .backoff({ delay: 60 * 1000, type: 'exponential' })
        .save();
      break;
  }
});

redis.psubscribe('user.*');
console.log('Dispatcher is on!');
