import { Express, Request, Response } from "express";
import {
  createUserSession,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validate from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  app.get("/healthcheck", (_: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validate(createUserSchema), createUserHandler);

  app.post("/api/sessions", validate(createSessionSchema), createUserSession);

  app.get("/api/sessions", requireUser, getUserSessionsHandler);
};

export default routes;
