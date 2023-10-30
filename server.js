const app = require("./app");
const port = process.env.SERVER_PORT || 3000;
const logger = require("./src/util/logger");

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
  logger.log({
    level: "info",
    message: "Testing logging",
  });
});
