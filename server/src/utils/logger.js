const winston = require("winston");
const { combine, timestamp, printf } = winston.format;
const myJsonFormat = printf((info) => {
  if (info.private) {
    console.log(
      `{level: '${info.level}', type: 'private', message: '${info.message}', timestamp: '${info.timestamp}'}`
    );
    return false;
  }
  return `{level: '${info.level}', message: '${info.message}', timestamp: '${info.timestamp}'}`;
});
let transports = [
  new winston.transports.File({ filename: "./logs/error.log", level: "error" }),
  new winston.transports.File({
    filename: "./logs/warning.log",
    level: "warn",
  }),
  new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
  new winston.transports.File({ filename: "./logs/debug.log", level: "debug" }),
  new winston.transports.File({ filename: "./logs/combined.log" }),
  new winston.transports.Console(),
];
const logger = winston.createLogger({
  level: "silly",
  format: combine(timestamp(), myJsonFormat),
  transports,
});
module.exports = logger;
