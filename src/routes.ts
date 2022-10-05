import { Express, Request, Response } from "express";
import { createUserSession } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post("/api/sessions", validate(createSessionSchema), createUserSession);
};

export default routes;
