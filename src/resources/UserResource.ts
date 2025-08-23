import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import type { ResourceWithOptions } from "adminjs";

const prisma = new PrismaClient();

export const UserResource: ResourceWithOptions = {
  resource: { client: prisma, model: getModelByName("User") },
  options: { navigation: { name: "システム", icon: "User" } },
};
