const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on('error', (error) => console.error('Redis error:', error.message));

async function connectRedis() {
  await redisClient.connect();
  console.log('Connected to Redis');
}

module.exports = { redisClient, connectRedis };
