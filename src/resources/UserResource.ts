import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";

const prisma = new PrismaClient();

export const UserResource = {
  resource: { client: prisma, model: getModelByName("User") },
  options: { navigation: { name: "システム", icon: "User" } }
};
