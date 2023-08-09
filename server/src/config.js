import path from "path";
import merge from "lodash/merge";
import { logger } from "./utils";

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    logger.error(`Environment valrable missing : ${name}`);
    throw new Error(`You must set the ${name}  environment variable`);
  }
  return process.env[name];
};

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  dotenv.config({
    path: path.join(__dirname, "../development.env"),
    example: path.join(__dirname, "../.env.example"),
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    apiRoot: requireProcessEnv("API_ROOT"),
    masterKey: requireProcessEnv("MASTER_KEY"),
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    // frontendURL: requireProcessEnv("FRONTEND_URL"),
    nodeMailerHost: process.env.MAILER_HOST,
    nodeMailerPort: process.env.MAILER_PORT,
    nodeMailerUser: process.env.MAILER_USER,
    nodeMailerPassword: process.env.MAILER_PASSWORD,
    expiresIn: requireProcessEnv("TOKEN_EXPIRES_IN"),
  },
  test: {}, // to be configured for test environement
  production: {}, // to be configured for production environement
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
