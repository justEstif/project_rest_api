import express from "express";
import config from "config";
import log from "./utils/logger";
import routes from "./routes";
import connect from "./utils/connect";

const app = express();
const port = config.get<number>("port");

app.listen(port, async () => {
  await connect()
  log.info(`App is running at http://localhost:${port}`);
  routes(app);
});
