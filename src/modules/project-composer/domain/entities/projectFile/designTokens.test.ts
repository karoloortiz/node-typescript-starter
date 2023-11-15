import { DesignTokens } from "./designTokens";

test("Should create design tokens file with passed tokens", () => {
  const designTokens = new DesignTokens({
    tokens: "{}",
  });

  expect(
    designTokens.hasSourceCode(`import React from "react";
  export const tokens = {}
  
  export const DesignSystemContext = React.createContext(tokens);
  
  export function DesignSystem({children}) {
      return <DesignSystemContext.Provider value={tokens}>{children}</DesignSystemContext.Provider>
  }`)
  ).toBeTruthy();
});
