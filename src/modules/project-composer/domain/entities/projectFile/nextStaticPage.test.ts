import { NextStaticPage } from "./nextStaticPage";

describe("Should create a next static page", () => {
  test("Should create a static page file with name homePage.tsx", () => {
    const page = new NextStaticPage({ name: "Home" });

    expect(page.getName()).toEqual("home.tsx");
  });

  test("Should create a static page file with name index.tsx when the page represents the home", () => {
    const page = new NextStaticPage({ name: "Home", isIndex: true });

    expect(page.getName()).toEqual("index.tsx");
  });

  test("Should create a file with initial source code", () => {
    const page = new NextStaticPage({ name: "Home" });

    expect(
      page.hasSourceCode(`
      import { GetStaticProps } from "next";
    import React from "react";
    
    export interface HomeProps {
      repoData: any;
    }
    
    export const HomeContext = React.createContext();
    
    export default function Home(props: HomeProps) {
      return <HomeContext.Provider value={}></HomeContext.Provider>;
    }
    
    export const getStaticProps: GetStaticProps = async (context) => {
      return {
        props: {},
        revalidate: 60,
      };
    };`)
    ).toBeTruthy();
  });

  test("Should update getStaticProps return object with repo call", () => {
    const page = new NextStaticPage({ name: "Home" });

    page.changeGetStaticPropsReturn("HomeRepo");

    expect(
      page.hasSourceCode(`export const getStaticProps: GetStaticProps = async (context) => {
        return {
          props: {
            repoData: await new HomeRepo().getPage()
          },
          revalidate: 60,
        };
      };`)
    ).toBeTruthy();
  });
});
