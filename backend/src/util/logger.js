const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "user-service" },
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({ filename: "./logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
  logger.format = winston.format.combine(
    winston.format.colorize(), // Add colorization to log levels
    winston.format.json()
  );
}

module.exports = logger;
