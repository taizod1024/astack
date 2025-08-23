import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";

const prisma = new PrismaClient();

export const CommentResource = {
  resource: { client: prisma, model: getModelByName("Comment") },
  options: { navigation: { name: "投稿", icon: "User" } }
};
