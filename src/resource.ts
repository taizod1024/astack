import AdminJS from "adminjs";
import type { ResourceOptions } from "adminjs";

// サンプルリソース（メモリ上のデータ）
export const users = [
  { id: 1, email: "admin@example.com", password: "password" },
  { id: 2, email: "user@example.com", password: "userpass" },
];

export const UserResource = {
  resource: users,
  options: {
    properties: {
      id: { isVisible: true },
      email: { isTitle: true },
      password: { isVisible: { list: false, edit: true, show: false, filter: false } },
    },
    listProperties: ["id", "email"],
    editProperties: ["email", "password"],
    showProperties: ["id", "email"],
  } as ResourceOptions,
};
