import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import log from "../utils/logger";

const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    return await createUser(req);
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message); // conflict
  }
};

export { createUserHandler };
