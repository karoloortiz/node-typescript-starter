import { FileWithDynamicDeps, FileWithPublicInterface } from "./../projectFile";
describe("Should create a file with dynamic dependencies", () => {
  test("Should update imports staments based on injected file with same exports and similar path", () => {
    const file = new FileWithDynamicDeps({
      fullPath: "/index.ts",
      content: `import {Shared} from "../lib/shared/shared.ts"`,
    });

    file.injectDependenciesFrom([
      new FileWithPublicInterface({
        fullPath: "/a/b/c/shared.ts",
        content: `export class Shared{}`,
      }),
    ]);
    expect(
      file.hasSourceCode(`import {Shared} from "a/b/c/shared.ts"`)
    ).toBeTruthy();
  });
  test("Should keep imports statements when no dependency is provided", () => {
    const file = new FileWithDynamicDeps({
      fullPath: "/index.ts",
      content: `import {Shared} from "../lib/shared/shared.ts"`,
    });

    file.injectDependenciesFrom([]);
    expect(
      file.hasSourceCode(`import {Shared} from "../lib/shared/shared.ts"`)
    ).toBeTruthy();
  });
});
