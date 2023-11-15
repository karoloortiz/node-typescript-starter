import { PlaceholderComponent, ReactPlaceholderComponent } from "./placeholder";
describe("Should create placeholder component", () => {
  test("Should create vertical layout component", () => {
    const component = new PlaceholderComponent({});

    expect(component.type).toEqual("placeholder");
  });

  describe("Should create placeholder REACT component", () => {
    test("Should create component with correct library name", () => {
      const component = new ReactPlaceholderComponent({});

      expect(component.libraryName).toEqual("placeholder");
    });

    test("Should create component with correct props", async () => {
      const component = new ReactPlaceholderComponent({});
      expect(
        await component.hasSourceCode(`
        interface Props {
          width?: Properties["width"];
          height?: Properties["height"];
        }`)
      ).toBeTruthy();
    });
  });
});
