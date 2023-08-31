import { env, port, apiRoot } from "./config";
import express from "./services/express";
import api from "./api";

const app = express(apiRoot, api);
//app
setImmediate(() => {
  app.listen(port, () => {
    console.log(
      "Express server listening on http://localhost:%d, in %s mode",
      port,
      env
    );
  });
});

export default app;
