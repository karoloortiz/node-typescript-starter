import { NextStaticRepo } from "./nextStaticRepo";

describe("Should create a next repo file", () => {
  test("Should create a next dynamic repo file with path /lib/repos/homeRepo.ts", () => {
    const repo = new NextStaticRepo({ name: "Home" });

    expect(repo.getFullPath()).toEqual("/lib/repos/homeRepo.ts");
  });

  test("Should create a next dynamic repo file with initial source code", () => {
    const repo = new NextStaticRepo({ name: "Home" });

    expect(
      repo.hasSourceCode(`export class HomeRepo {
      async getPage(): Promise<HomeRepoData> {
        const data: HomeRepoData = {};
        return data;
      }
    }
    
    export interface HomeRepoData {}
    `)
    ).toBeTruthy();
  });
});
