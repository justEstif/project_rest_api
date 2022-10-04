import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });
  app.post("/api/users", validate, createUserHandler)
};

export default routes;
