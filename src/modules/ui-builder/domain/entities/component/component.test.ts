import { Component } from "./component";

describe("Should create component", () => {
  test("Should create component with correct name", () => {
    const c = new Component({ name: "layout" });
    expect(c.name).toEqual("layoutComponent");
  });
});
