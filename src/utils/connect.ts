import { PrismaClient } from "@prisma/client";
import log from "./logger";

const connect = async () => {
  try {
    const prisma = new PrismaClient();
    log.info(`DB is working`);
    prisma.$disconnect();
  } catch (error) {
    log.error("Could not connect to db");
    process.exit(1);
  }
};

export default connect;
