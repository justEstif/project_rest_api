import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import config from "config";
import { CreateUserInput } from "../schema/user.schema";

export const createUser = async ({ body }: CreateUserInput) => {
  const prisma = new PrismaClient();

  // hash password
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = bcrypt.hashSync(body.password, salt);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: hash.toString()
    },
  });

  return user;
};
