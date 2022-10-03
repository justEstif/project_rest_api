import { Express, Request, Response } from "express";
const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });
};

export default routes;
