import prisma from "../utils/prisma";
import { Session } from "@prisma/client";

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
      ...(query.valid && { valid: query.valid }),
      ...(query.userId && { userId: query.userId }),
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

