import {
  ReactVerticalLayoutComponent,
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

  describe("Should create vertical layout REACT component", () => {
    test("Should create component with correct library name", () => {
      const component = new ReactVerticalLayoutComponent({});

      expect(component.libraryName).toEqual("verticalLayout");
    });

    test("Should create component with correct props", async () => {
      const component = new ReactVerticalLayoutComponent({});
      expect(
        await component.hasSourceCode(`
      interface Props {
        children: React.ReactElement[];
        gap?: string;
      }`)
      ).toBeTruthy();
    });
  });
});
