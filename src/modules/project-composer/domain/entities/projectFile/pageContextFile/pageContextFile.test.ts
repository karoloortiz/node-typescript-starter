import { PageContextFile } from "./pageContextFile";
describe("Should create page context file", () => {
  test("Should create page context file with template content", () => {
    const file = new PageContextFile({});
    expect(
      file.hasSourceCode(`  import React from "react";
      export const PageContext = React.createContext();`)
    ).toBeTruthy();

    expect(file.getFullPath()).toEqual("/lib/pageContext.ts");
  });

  test("Should get context variable", () => {
    const file = new PageContextFile({});

    const constructorCall = file.getContextVariable();
    expect(constructorCall).toEqual("PageContext");
  });

  test("Should get opening tag", () => {
    const file = new PageContextFile({});

    const functionCall = file.getOpeningJsxTag("{}");
    expect(functionCall).toEqual(`<PageContext.Provider value={{}}>`);
  });

  test("Should get closing tag", () => {
    const file = new PageContextFile({});

    const functionCall = file.getClosingJsxTag();
    expect(functionCall).toEqual(`</PageContext.Provider>`);
  });
});
