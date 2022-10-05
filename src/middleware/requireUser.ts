import { RequestHandler } from "express";
const requireUser: RequestHandler = (_, res, next) => {
  if (res.locals.user) {
    next();
  } else {
    return res.sendStatus(403)
  }
};

export default requireUser;
