import express, { json, urlencoded } from "express";
import config from "config";
import log from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();
const port = config.get<number>("port");
app.use(json()); // body parser
app.use(urlencoded({ extended: false }));

app.use(deserializeUser);

app.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);
  routes(app);
});
