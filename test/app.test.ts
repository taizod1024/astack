import { execSync } from "child_process";
beforeAll(() => {
  jest.setTimeout(10000);
});

describe("astack-app", () => {
  it("express起動確認", () => {
    const result = execSync("curl -s -o /dev/null -w '%{http_code}' http://localhost:3000").toString();
    expect(result).toMatch(/2\d\d|3\d\d/); // 200番台または300番台ならOK
  });
});
