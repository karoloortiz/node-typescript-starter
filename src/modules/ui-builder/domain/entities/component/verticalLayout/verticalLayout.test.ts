import {
  VerticalLayoutComponent,
} from "./verticalLayout";

describe("Should create vertical layout component", () => {
  test("Should create vertical layout component", () => {
    const component = new VerticalLayoutComponent({});

    expect(component.type).toEqual("verticalLayout");
  });

  test("Should initialize vertical layout with no gap", () => {
    const component = new VerticalLayoutComponent({});
    expect(component.getParam("gap")).toEqual("zero");
  });
});
