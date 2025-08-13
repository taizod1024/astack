import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";

const app = express();
const PORT = process.env.PORT || 3000;

const adminJs = new AdminJS({
  rootPath: "/admin",
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

app.use(adminJs.options.rootPath, router);

app.get("/", (req, res) => {
  res.send("Hello, astack3!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
