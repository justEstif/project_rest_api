import config from "config";
import { Response, Request } from "express";
import { CreateSessionType } from "../schema/session.schema";
import { createSession, findSessions } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt";
import { User } from "@prisma/client";

export const createUserSession = async (
  req: Request<{}, {}, CreateSessionType["body"]>,
  res: Response
) => {
  // validate the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession({
    userId: user.id,
    userAgent: req.get("user-agent") || "",
  });

  // create an access token
  const accessToken = signJwt({
    ...user,
    session: session.id,
    options: { expiresIn: config.get<string>("accessTokenTtl") },
  });
  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  // create a refresh token
  const refreshToken = signJwt({
    ...user,
    session: session.id,
    options: { expiresIn: config.get<string>("refreshTokenTtl") },
  });
  const refreshToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get<string>("refreshTokenTtl") } // options
  );

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
};

export const getUserSessionsHandler: RequestHandler = async (_, res) => {
  const user: User = res.locals.user;
  const sessions = await findSessions({ userId: user.id, valid: true });
  return res.status(200).send(sessions);
};

export const deleteSessionHandler: RequestHandler = async (_, res) => {
  const user: User = res.locals.user;
  await updateSessions({ userId: user.id, valid: true }, { valid: false });
  return res.status(200).send({
    accessToken: null,
    refreshToken: null,
  });
};
