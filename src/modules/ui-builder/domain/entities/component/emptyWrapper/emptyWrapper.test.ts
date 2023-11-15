import {
  EmptyWrapperComponent,
  ReactEmptyWrapperComponent,
} from "./emptyWrapper";

describe("Should create placeholder component", () => {
  test("Should create vertical layout component", () => {
    const component = new EmptyWrapperComponent({});
    expect(component.type).toEqual("emptyWrapper");
  });

  describe("Should create placeholder REACT component", () => {
    test("Should create component with correct library name", () => {
      const component = new ReactEmptyWrapperComponent({});

      expect(component.libraryName).toEqual("emptyWrapper");
    });

    test("Should create component with correct props", async () => {
      const component = new ReactEmptyWrapperComponent({});
      expect(
        await component.hasSourceCode(`
        interface Props {
          child: React.ReactElement;
          width?: string;
          height?: string;
          minHeight?: string;
        }`)
      ).toBeTruthy();
    });
  });
});
