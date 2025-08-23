import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";

const prisma = new PrismaClient();

export const PostResource = {
  resource: { client: prisma, model: getModelByName("Post") },
  options: { navigation: { name: "投稿", icon: "User" } }
};
