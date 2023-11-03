// server.js
const app = require('./app');
const port = process.env.SERVER_PORT || 3000;
const logger = require('./src/util/logger');
const authRoutes = require('./src/routes/authRoutes');
const { connectToDatabase } = require('./src/util/db');
const isAuthenticated = require('./src/middlewares/isAuthenticated');

/* db connection */
connectToDatabase();

/* routes */
app.get('/', isAuthenticated, (req, res) => {
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
