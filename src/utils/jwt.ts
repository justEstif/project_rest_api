import jwt from "jsonwebtoken";
import config from "config";

const jwtSecret = config.get<string>("jwtSecret");

export const signJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, jwtSecret, {
    ...(options && options),
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
