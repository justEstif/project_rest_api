import { RequestHandler } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt";

const deserializeUser: RequestHandler = async (req, res, next) => {
  const accessToken = get(req.headers, "authorization", "")?.replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req.headers, "x-refresh", null);

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && typeof refreshToken === "string") {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const result = verifyJwt(newAccessToken);
      res.locals.user = result.decoded;
    }
  }

  return next();
};

export default deserializeUser;
