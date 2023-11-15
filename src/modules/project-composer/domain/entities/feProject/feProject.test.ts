import { FEProject } from "./feProject";

describe("Should create a fe project", () => {
  test("Should create a fe project with correct name", () => {
    const project = new FEProject({ name: "Website project" });

    expect(project.name).toEqual("website-project");
  });

  test("Should create a fe project with no files and folders", () => {
    const project = new FEProject({ name: "Website project" });

    expect(project.files.length).toEqual(0);
  });
});
