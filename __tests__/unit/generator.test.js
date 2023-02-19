import { add } from "../";

describe("testing basic functionalities", () => {
  test("first test", () => {
    expect(add(1, 2)).toBe(3);
  });
});
