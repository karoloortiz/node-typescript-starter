import { NextDynamicPage } from "./nextDynamicPage";

describe("Should create a next dynamic page", () => {
  test("Should create a dynamic page file with path /pages/home/[id].tsx", () => {
    const page = new NextDynamicPage({ name: "Home" });

    expect(page.getFullPath()).toEqual("/pages/home/[id].tsx");
  });

  test("Should create a file with initial source code", () => {
    const page = new NextDynamicPage({ name: "Home" });

    expect(
      page.hasSourceCode(`
      import { GetStaticPaths, GetStaticProps } from "next";
      import React from "react";

      export interface HomeProps {
        repoData: any;
      }
      
      export const HomeContext = React.createContext();
      
      export default function Home(props: HomeProps) {
        return <HomeContext.Provider value={}></HomeContext.Provider>;
      }
      
      export const getStaticProps: GetStaticProps = async (context) => {
        const { id } = context.params;
      
        return {
          props: {},
          revalidate: 60,
        };
      };
      
      export const getStaticPaths: GetStaticPaths = async (context) => {
        const paths: any[] = [];
      
        return {
          paths,
          fallback: "blocking",
        };
      };`)
    ).toBeTruthy();
  });

  test("Should update getStaticProps return object with repo call", () => {
    const page = new NextDynamicPage({ name: "Home" });

    page.changeGetStaticPropsReturn("HomeRepo");

    expect(
      page.hasSourceCode(`export const getStaticProps: GetStaticProps = async (context) => {
        const {id} = context.params;

        return {
          props: {
            repoData: await new HomeRepo().getPage(id)
          },
          revalidate: 60,
        };
      };`)
    ).toBeTruthy();
  });

  test("Should update getStaticPath function", () => {
    const page = new NextDynamicPage({ name: "Article" });

    page.changeGetStaticPathFunction("ArticleRepo");

    expect(
      page.hasSourceCode(`const paths: any[] = (await new ArticleRepo().getIds()).map(
      (id) => ({
        params: {
          id,
        }
      })
    );`)
    ).toBeTruthy();
  });
});
