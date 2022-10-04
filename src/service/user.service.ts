import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "config";
import { CreateUserInput } from "../schema/user.schema";

export const createUser = async ({ body }: CreateUserInput) => {
  const prisma = new PrismaClient();

  // middleware for hashing pw
  prisma.$use(async (params, next) => {
    if (params.model == "User" && params.action == "create") {
      const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
      const hash = bcrypt.hashSync(params.args.password, salt);
      params.args.data.password = hash;
    }
    return next;
  });

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
  });

  return user;
};
