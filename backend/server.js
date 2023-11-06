// server.js
const app = require('./app');
const port = process.env.SERVER_PORT || 3000;
const logger = require('./src/util/logger');
const authRoutes = require('./src/routes/authRoutes');
const { connectToDatabase } = require('./src/util/db');
// const isAuthenticated = require('./src/middlewares/isAuthenticated');

/* db connection */

/**
 * Starts the server, connecting to the database, setting up routes, and listening on a specified port.
 *
 * @async
 * @function
 * @return {void}
 */
async function startServer() {
  await connectToDatabase();

  /* routes */
  app.get('/', (req, res) => {
    res.json({ message: 'Docker is hard !!, test2' });
  });
  app.use(authRoutes);

  /* server start */
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
    logger.log({
      level: 'info',
      message: 'Testing logging',
    });
  });
}

startServer();

console.log(2);
