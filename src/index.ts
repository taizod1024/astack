import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

const com = {
  appName: "astack",
};
const app = express();
const PORT = process.env.PORT || 3000;

// adminjs
const adminJs = new AdminJS({
  rootPath: "/admin",
  branding: {
    companyName: com.appName,
    favicon: "/images/astack_icon.ico",
  },
  locale: {
    language: "ja",
    availableLanguages: ["ja"],
    localeDetection: true,
    translations: {
      ja: {},
    },
  },
});

const ADMIN = {
  email: "admin",
  password: "astack_pass",
};

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
  cookiePassword: "astack_pass",
});

app.use("/images", express.static("images"));
app.use(adminJs.options.rootPath, router);

// express
app.get("/", (req, res) => {
  res.send("Hello, astack!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
