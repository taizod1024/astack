import { sum } from "../src/sum";

describe("sum関数のテスト", () => {
  it("1 + 2 = 3 になること", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
