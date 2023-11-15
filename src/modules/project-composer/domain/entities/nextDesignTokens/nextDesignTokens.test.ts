import { FEProject } from "../feProject/feProject";
import { FileContent } from "../fileContent/fileContent";
import { nextDesignTokensMixin } from "./nextDesignTokens";

const NextDesignTokens = nextDesignTokensMixin(FEProject);

describe("Should create design tokens for nextJS project", () => {
  test("Should create designTokens.tsx into /styles folder", () => {
    const props = {
      name: "website",
      tokens: `{
        "tokens":"values"
    }`,
    };

    const nextDesignTokens = new NextDesignTokens(props);

    expect(
      nextDesignTokens.getFile("/styles/designTokens.tsx")
        .hasSourceCode(`export const tokens = {
        "tokens":"values"
    }`)
    ).toBeTruthy();
  });
});
