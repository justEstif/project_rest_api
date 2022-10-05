import { RequestHandler } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../utils/logger";

export const createUserHandler: RequestHandler = async (req, res) => {
  try {
    const user = await createUser(req);
    return res.status(200).send(omit(user, ["password"]));
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message); // conflict
  }
};
