import prisma from "../utils/prisma";

// TODO better types
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
