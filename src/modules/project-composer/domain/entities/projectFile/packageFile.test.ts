import { PackageFile } from "./packageFile";
describe("Should create a packageFile", () => {
  test("Should create a package file with name package.json", () => {
    const packageFile = new PackageFile({ projectName: "name" });
    expect(packageFile.getName()).toEqual("package.json");
  });

  test("Should create  package file with correct content", () => {
    const packageFile = new PackageFile({ projectName: "website_project" });
    expect(
      packageFile.hasSourceCode(`{
        "name": "website_project",
        "version": "0.1.0",
        "private": true,
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint"
        },
        "dependencies": {
            "@next/font": "13.1.6",
            "@types/node": "18.11.19",
            "@types/react": "18.0.27",
            "@types/react-dom": "18.0.10",
            "eslint": "8.33.0",
            "eslint-config-next": "13.1.6",
            "next": "13.1.6",
            "react": "18.2.0",
            "react-dom": "18.2.0",
            "typescript": "4.9.5"
        }
    }`)
    ).toBeTruthy();
  });
});
