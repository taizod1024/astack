import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 3000;
const APP_NAME = "astack";

// prisma
const prisma = new PrismaClient();

async function main() {
  // アプリケーション
  const app = express();
  // prisma
  AdminJS.registerAdapter({ Database, Resource });
  const prismaResources = [
    {
      resource: { client: prisma, model: getModelByName("User") },
      opsions: {},
    },
  ];
  // adminjs
  const adminJs = new AdminJS({
    resources: prismaResources,
    rootPath: "/admin",
    branding: {
      companyName: APP_NAME + " - " + new Date().toISOString(),
      favicon: "/images/astack_icon.ico",
      // logo: "/images/astack_icon.svg",
    },
    locale: {
      language: "ja",
      availableLanguages: ["ja"],
      localeDetection: true,
      translations: {
        ja: {
          Labels: {},
        },
      },
    },
  });
  const router = AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);

  // 認証
  const ADMIN = {
    email: "admin",
    password: "astack_pass",
  };
  const routerAuth = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookiePassword: "astack_pass",
  });
  app.use(adminJs.options.rootPath, routerAuth);

  // 静的ルーティング
  app.use("/images", express.static("images"));

  // REST API
  app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });
  app.post("/users", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(user);
  });

  // express
  app.get("/", (req, res) => {
    res.send("Hello, astack!");
  });

  // アプリケーション開始
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// アプリケーション実行
main().finally(async () => {
  await prisma.$disconnect();
});
