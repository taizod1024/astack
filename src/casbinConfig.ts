import { newEnforcer } from "casbin";

export async function getEnforcer() {
  // サンプル: ファイルベースのモデルとポリシー
  const enforcer = await newEnforcer("./src/rbac_model.conf", "./src/rbac_policy.csv");
  return enforcer;
}
