import {
  MainContainerComponent,
  ReactMainContainerComponent,
} from "./mainContainer";

describe("Should create placeholder component", () => {
  test("Should create vertical layout component", () => {
    const component = new MainContainerComponent({});

    expect(component.type).toEqual("mainContainer");
  });

  describe("Should create placeholder REACT component", () => {
    test("Should create component with correct library name", () => {
      const component = new ReactMainContainerComponent({});

      expect(component.libraryName).toEqual("mainContainer");
    });

    test("Should create component with correct props", async () => {
      const component = new ReactMainContainerComponent({});
      expect(
        await component.hasSourceCode(`
        interface Props {
          child: React.ReactElement;
        }`)
      ).toBeTruthy();
    });
  });
});
