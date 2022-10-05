import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import config from "config";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";

export const createUser = async ({ body }: CreateUserInput) => {
  // hash password
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = bcrypt.hashSync(body.password, salt);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: hash.toString(),
    },
  });

  return user;
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // find user with email
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // return false is no user or no match, else return user
  return !user
    ? false
    : !(await bcrypt.compare(password, user.password).catch((_) => false))
    ? false
    : omit(user, ["password"]);
};
