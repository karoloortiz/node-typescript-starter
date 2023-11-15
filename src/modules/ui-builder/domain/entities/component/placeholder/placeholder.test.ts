import { PlaceholderComponent } from "./placeholder";
describe("Should create placeholder component", () => {
  test("Should create vertical layout component", () => {
    const component = new PlaceholderComponent({});

    expect(component.type).toEqual("placeholder");
  });
});
