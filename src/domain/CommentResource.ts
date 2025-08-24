import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import type { ResourceWithOptions } from "adminjs";

const prisma = new PrismaClient();

export const CommentResource: ResourceWithOptions = {
  resource: { client: prisma, model: getModelByName("Comment") },
  options: { navigation: { name: "投稿", icon: "User" } },
};
