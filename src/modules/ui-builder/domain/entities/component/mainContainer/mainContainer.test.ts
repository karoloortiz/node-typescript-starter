import {
  MainContainerComponent,
} from "./mainContainer";

describe("Should create placeholder component", () => {
  test("Should create vertical layout component", () => {
    const component = new MainContainerComponent({});

    expect(component.type).toEqual("mainContainer");
  });
});
