import { PrismaClient } from "@prisma/client";

// TODO better types
export const createSession = async ({
  userId,
  userAgent,
}: {
  userAgent: string;
  userId: string;
}) => {
  const prisma = new PrismaClient();

  const session = await prisma.session.create({
    data: {
      userId: userId,
      userAgent: userAgent,
    },
  });
  return session;
};
