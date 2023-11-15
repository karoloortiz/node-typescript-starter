import { NextPage } from "./nextPage";

describe("Should create a next static page", () => {
  test("Should add page state import", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: "",
    });

    page.addPageStateImport("Example", "../ciao.ts");

    expect(
      page.hasSourceCode(`import {Example} from "../ciao.ts";`)
    ).toBeTruthy();
  });

  test("Should add repo and repoData import", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: "",
    });

    page.addRepoImports("HomeRepo", "HomeRepoData", "../repos/homeRepo");

    expect(
      page.hasSourceCode(
        `import { HomeRepo, HomeRepoData } from "../repos/homeRepo";`
      )
    ).toBeTruthy();
  });

  test("Should update type of repoData field in HomeProps", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: `export interface HomeProps {
        repoData: any;
      }`,
    });

    page.changeRepoDataType("HomeRepoData");

    expect(
      page.hasSourceCode(`export interface HomeProps {
        repoData: HomeRepoData;
      }`)
    ).toBeTruthy();
  });

  test("Should initialize page context variable", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: `export const HomeContext = React.createContext();
      
      export default function Home(props: HomeProps) {
        return <HomeContext.Provider value={}>
        </HomeContext.Provider>;
      }`,
    });

    page.initializeAndInjectPageState("NextPageState");

    expect(
      page.hasSourceCode(
        `export const HomeContext = React.createContext(new NextPageState({}));`
      )
    ).toBeTruthy();
  });

  test("Should inject page state inside page context provider component", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: `export const HomeContext = React.createContext();
      
      export default function Home(props: HomeProps) {
        return <HomeContext.Provider value={}>
        </HomeContext.Provider>;
      }`,
    });

    page.initializeAndInjectPageState("NextPageState");

    expect(
      page.hasSourceCode(
        `export default function Home(props: HomeProps) {
          return <HomeContext.Provider value={new NextPageState(props.repoData)}>
          </HomeContext.Provider>;
        }`
      )
    ).toBeTruthy();
  });

  test("Should import design tokens component", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: `export default function Home(props: HomeProps) {
        return <HomeContext.Provider value={}>
        </HomeContext.Provider>
      }`,
    });

    page.importAndInjectDesignTokens(
      "DesignTokens",
      "../styles/designTokens.tsx"
    );

    expect(
      page.hasSourceCode(
        `import { DesignTokens } from "../styles/designTokens.tsx";`
      )
    ).toBeTruthy();
  });

  test("Should inject DesignTokens component", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: `export default function Home(props: HomeProps) {
        return <HomeContext.Provider value={}>
        </HomeContext.Provider>;
      }`,
    });

    page.importAndInjectDesignTokens(
      "DesignTokens",
      "../styles/designTokens.tsx"
    );

    expect(
      page.hasSourceCode(
        `export default function Home(props: HomeProps) {
          return <HomeContext.Provider value={}>
          <DesignTokens></DesignTokens>
          </HomeContext.Provider>;
        }`
      )
    ).toBeTruthy();
  });

  test("Should import page component", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: `export default function Home(props: HomeProps) {
        return <HomeContext.Provider value={}>
        </HomeContext.Provider>
      }`,
    });

    page.importAndInjectPageComponent(
      "Home",
      "HomeComponent",
      "../components/homeComponent/homeComponent",
      "HomeContext.Provider"
    );

    expect(
      page.hasSourceCode(
        `import { Home as HomeComponent } from "../components/homeComponent/homeComponent"`
      )
    ).toBeTruthy();
  });

  test("Should inject page component inside body", () => {
    const page = new NextPage({
      placeholders: [],
      name: "Home",
      fileName: "index.tsx",
      content: `export default function Home(props: HomeProps) {
        return <HomeContext.Provider value={}>
        </HomeContext.Provider>;
      }`,
    });

    page.importAndInjectPageComponent(
      "Home",
      "HomeComponent",
      "../components/homeComponent/homeComponent",
      "HomeContext.Provider"
    );

    expect(
      page.hasSourceCode(
        `export default function Home(props: HomeProps) {
          return <HomeContext.Provider value={}>
          <HomeComponent></HomeComponent>
          </HomeContext.Provider>;
        }`
      )
    ).toBeTruthy();
  });
});
