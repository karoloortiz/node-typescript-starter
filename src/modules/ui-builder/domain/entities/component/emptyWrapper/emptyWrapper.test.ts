import {
  EmptyWrapperComponent,
} from "./emptyWrapper";

describe("Should create placeholder component", () => {
  test("Should create vertical layout component", () => {
    const component = new EmptyWrapperComponent({});
    expect(component.type).toEqual("emptyWrapper");
  });
});
