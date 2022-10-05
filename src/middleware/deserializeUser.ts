import { RequestHandler } from "express";
import _getKeyValue from "lodash/get";
import { verifyJwt } from "../utils/jwt";

const deserializeUser: RequestHandler = (req, res, next) => {
  // NOTE check if we get the corrent access token
  const accessToken = _getKeyValue(req.headers, "authorization", null);

  if (accessToken) {
    const { decoded } = verifyJwt(accessToken);
    if (decoded) {
      res.locals.user = decoded;
      return next();
    } else {
      return next();
    }
  } else {
    return next();
  }
};

export default deserializeUser;
