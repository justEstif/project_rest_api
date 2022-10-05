import prisma from "../utils/prisma";
import { Session } from "@prisma/client";
import { signJwt, verifyJwt } from "../utils/jwt";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";

export const createSession = async ({
  userId,
  userAgent,
}: {
  userAgent: string;
  userId: string;
}) => {
  const session = await prisma.session.create({
    data: {
      userId: userId,
      userAgent: userAgent,
    },
  });
  return session;
};

export const findSessions = async (query: Partial<Session>) => {
  const sessions = await prisma.session.findMany({
    where: {
      ...(query && query),
    },
  });
  return sessions;
};

export const updateSessions = async (
  query: Partial<Session>,
  update: Partial<Session>
) => {
  const updateSession = await prisma.session.updateMany({
    where: {
      ...(query && query),
    },
    data: {
      ...(update && update),
    },
  });
  return updateSession;
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "session")) return false;
  const session = await prisma.session.findUnique({
    where: {
      id: get(decoded, "id"), // store the user id
    },
  });

  if (!session || !session.valid) return false;

  const user = await findUser({ id: session.userId });
  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  return accessToken;
};
