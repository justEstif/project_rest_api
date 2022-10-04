import express, { json, urlencoded } from "express";
import config from "config";
import log from "./utils/logger";
import routes from "./routes";
import connect from "./utils/connect";

const app = express();
const port = config.get<number>("port");
app.use(json()); // body parser
app.use(urlencoded({ extended: false }));

app.listen(port, async () => {
  await connect();
  log.info(`App is running at http://localhost:${port}`);
  routes(app);
});
