import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource, getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 3000;
const APP_NAME = "astack";

// prisma
AdminJS.registerAdapter({ Database, Resource });
const prisma = new PrismaClient();
const prismaResources = [
  {
    resource: { client: prisma, model: getModelByName("User") },
    opsions: {},
  },
];

async function main() {
  // アプリケーション
  const app = express();
  // adminjs
  const adminJs = new AdminJS({
    resources: prismaResources,
    rootPath: "/admin",
    branding: {
      companyName: APP_NAME,
      favicon: "/images/astack_icon.ico",
      // logo: "/images/astack_icon.svg",
    },
    locale: {
      language: "ja",
      availableLanguages: ["ja"],
      localeDetection: true,
      translations: {
        ja: {
          Labels: {
            password: "aaaa",
          },
        },
      },
    },
  });

  // RESTAPI
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

  app.use("/images", express.static("images"));
  app.use(adminJs.options.rootPath, routerAuth);

  // express
  app.get("/", (req, res) => {
    res.send("Hello, astack!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
