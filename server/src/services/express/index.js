import express, { json, urlencoded } from "express";
import cors from "cors";
import compression from "compression";
import { env, frontendURL } from "../../config";
import passport from "passport";
import { connectDatabase } from "../database";
import session from "express-session";
import { initializePassport } from "../passport";

export default (apiRoot, routes) => {
  const app = express();
  initializePassport(passport);

  app.use(
    session({
      secret: process.env.MASTER_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  connectDatabase();

  if (env === "production" || env === "development") {
    app.use(compression());
  }
  app.use(
    cors({
      credentials: true,
      origin: frontendURL,
    })
  );

  app.use(json());
  app.use(urlencoded({ extended: false }));

  app.use(apiRoot, routes);

  return app;
};
