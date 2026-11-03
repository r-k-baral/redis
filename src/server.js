require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./config/database');
const { connectRedis } = require('./config/redis');

async function start() {
  await connectDatabase();
  await connectRedis();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Shop API listening at http://localhost:${port}`));
}

start().catch((error) => {
  console.error('Could not start app:', error);
  process.exit(1);
});
