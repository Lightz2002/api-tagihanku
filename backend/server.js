const app = require("./app");
const port = process.env.SERVER_PORT || 3000;
const logger = require("./src/util/logger");
const connectToDatabase = require("./src/util/db");

connectToDatabase();

const authRoutes = require("./src/routes/authRoutes");

app.use(authRoutes);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
  logger.log({
    level: "info",
    message: "Testing logging",
  });
});
