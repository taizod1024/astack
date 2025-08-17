import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 3000;
const APP_NAME = "astack";
const ROOT_PATH = "/astack";
const ADMIN = {
  email: "admin",
  password: "astack_pass",
};

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
      options: {
        navigation: {
          name: "システム",
          icon: "User",
        },
      },
    },
  ];
  // adminjs
  const adminjs = new AdminJS({
    resources: prismaResources,
    rootPath: ROOT_PATH,
    loginPath: ROOT_PATH + "/login",
    logoutPath: ROOT_PATH + "/logout",
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
          labels: {
            prisma: "データ",
            User: "利用者",
          },
          components: {
            Login: {
              welcomeHeader: "AStack",
              welcomeMessage: "AStackはAdminJS, Node.js, Express, Prisma, PosgreSQLを元にした業務アプリケーション基盤です。",
              properties: {
                email: "メールアドレス",
                password: "パスワード",
              },
              loginButton: "ログイン",
            },
          },
        },
      },
    },
  });

  // AdminJSルーティング
  const adminjsRouter = AdminJSExpress.buildAuthenticatedRouter(adminjs, {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookiePassword: "astack_pass",
  });
  app.use(adminjs.options.rootPath, adminjsRouter);

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
