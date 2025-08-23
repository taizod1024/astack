import express from "express";
import AdminJS, { type BrandingOptions, type LocaleTranslations, type LocaleTranslationsBlock } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/prisma";
import { UserResource } from "./resources/UserResource.js";
import { PostResource } from "./resources/PostResource.js";
import { CommentResource } from "./resources/CommentResource.js";

const PORT = process.env.PORT || 3000;
const APP_NAME = "astack";
const ROOT_PATH = "/astack";
const ADMIN = {
  email: "admin",
  password: "astack_pass",
};

// prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // アプリケーション
  const app = express();

  // prisma
  AdminJS.registerAdapter({ Database, Resource });
  const prismaResources = [UserResource, PostResource, CommentResource];

  // adminjs
  const brandingOpsions: BrandingOptions = {
    companyName: APP_NAME + " - " + new Date().toISOString(),
    favicon: "/images/astack_icon.ico",
    logo: "/images/astack_logo.png",
    withMadeWithLove: false,
  };
  const locale = {
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
            welcomeHeader: "astack",
            welcomeMessage: "astack = Node.js + AdminJS + Express + Prisma + PosgreSQL",
            properties: {
              email: "メールアドレス",
              password: "パスワード",
            },
            loginButton: "ログイン",
          },
        },
      },
    },
  };
  const adminjs = new AdminJS({
    resources: prismaResources,
    rootPath: ROOT_PATH,
    loginPath: ROOT_PATH + "/login",
    logoutPath: ROOT_PATH + "/logout",
    branding: brandingOpsions,
    locale: locale,
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
