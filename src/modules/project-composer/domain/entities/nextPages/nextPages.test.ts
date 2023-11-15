import { FEProject } from "./../feProject/feProject";
import { FEProjectProps } from "../feProject/feProject";
import { nextReposMixin } from "../nextRepos/nextRepos";
import { NextPages, nextPagesMixin, NextPagesProps } from "./nextPages";
import { NextReposProps } from "../nextRepos/nextReposProps";
import {
  BaseComponentProps,
  ContextualComponentProps,
  NextComponentsProps,
} from "../nextComponents/nextComponentsProps";
import { nextComponentsMixin } from "../nextComponents/nextComponents";
import {
  nextDesignTokensMixin,
  NextDesignTokensProps,
} from "../nextDesignTokens/nextDesignTokens";

describe("Should create pages for next project", () => {
  test("Should create static pages files into /pages folder", () => {
    const props = createProps({
      pages: [
        {
          name: "Home",
          isDynamic: false,
        },
        {
          name: "About",
          isDynamic: false,
        },
      ],
      components: [
        componentWithFiles({
          name: "Home",
          files: [
            {
              pathname: "/index.tsx",
              sourceCode: `console.log("I'm the home page")`,
            },
          ],
        }),
        componentWithFiles({
          name: "About",
          files: [
            {
              pathname: "/index.tsx",
              sourceCode: `console.log("I'm the about page")`,
            },
          ],
        }),
      ],
    });

    const nextPages = new NextPages(props);

    expect(nextPages.getFile("/pages/home.tsx")).toBeDefined();

    expect(nextPages.getFile("/pages/about.tsx")).toBeDefined();
  });

  test("Should create dynamic pages files into /pages folder", () => {
    const props = createProps({
      pages: [
        {
          name: "Products",
          isDynamic: true,
        },
        {
          name: "Events",
          isDynamic: true,
        },
      ],
      components: [
        componentWithFiles({
          name: "Products",
          files: [
            {
              pathname: "/index.tsx",
              sourceCode: `console.log("I'm the home page")`,
            },
          ],
        }),
        componentWithFiles({
          name: "Events",
          files: [
            {
              pathname: "/index.tsx",
              sourceCode: `console.log("I'm the about page")`,
            },
          ],
        }),
      ],
    });

    const nextPages = new NextPages(props);

    expect(nextPages.getFile("/pages/products/[id].tsx")).toBeDefined();

    expect(nextPages.getFile("/pages/events/[id].tsx")).toBeDefined();
  });

  test("Should complete static pages with tokens, repo, state and component", () => {
    const NextPagesWithComponentsAndTokens = nextPagesMixin(
      nextDesignTokensMixin(nextComponentsMixin(nextReposMixin(FEProject)))
    );

    const props = createProps({
      pages: [
        {
          name: "Home",
          isDynamic: false,
          isIndex: true,
        },
      ],
      components: [
        componentWithFiles({
          name: "Home",
          files: [
            {
              pathname: "/index.tsx",
              sourceCode: ``,
            },
          ],
        }),
      ],
    });

    const nextPages = new NextPagesWithComponentsAndTokens(props);

    expect(
      nextPages.getFile("/pages/index.tsx")
        .hasSourceCode(`import { GetStaticProps } from "next";
      import React from "react";
      import { NextPageState } from "../lib/nextPageState.ts";
      import { HomeRepo, HomeRepoData } from "../lib/repos/homeRepo.ts";
      import { DesignTokens } from "../styles/designTokens.tsx";
      import { Home as HomeComponent} from "../components/home/index.tsx";
      export interface HomeProps {
        repoData: HomeRepoData;
      }
      export const HomeContext = React.createContext(new NextPageState({}));
      export default function Home(props: HomeProps) {
        return <HomeContext.Provider value={new NextPageState(props.repoData)}>
        <DesignTokens><HomeComponent></HomeComponent></DesignTokens></HomeContext.Provider>;
      }
      export const getStaticProps: GetStaticProps = async (context) => {
        return { props: { repoData: await new HomeRepo().getPage()}, revalidate: 60};
      };`)
    ).toBeTruthy();
  });

  test("Should complete dynamic pages with tokens, repo, state and component", () => {
    const NextPagesWithComponentsAndTokens = nextPagesMixin(
      nextDesignTokensMixin(nextComponentsMixin(nextReposMixin(FEProject)))
    );

    const props = createProps({
      pages: [
        {
          name: "Article",
          isDynamic: true,
        },
      ],
      components: [
        componentWithFiles({
          name: "Article",
          files: [
            {
              pathname: "/index.tsx",
              sourceCode: ``,
            },
          ],
        }),
      ],
    });

    const nextPages = new NextPagesWithComponentsAndTokens(props);

    expect(
      nextPages.getFile("/pages/article/[id].tsx")
        .hasSourceCode(`import { GetStaticPaths, GetStaticProps } from "next";
      import React from "react";
      import { NextPageState } from "../../lib/nextPageState.ts";
      import { ArticleRepo, ArticleRepoData } from "../../lib/repos/articleRepo.ts";
      import { DesignTokens } from "../../styles/designTokens.tsx";
      import { Article as ArticleComponent } from "../../components/article/index.tsx";
      export interface ArticleProps {
        repoData: ArticleRepoData;
      }
      export const ArticleContext = React.createContext(new NextPageState({}));
      export default function Article(props: ArticleProps) {
        return <ArticleContext.Provider value={new NextPageState(props.repoData)}>
        <DesignTokens><ArticleComponent></ArticleComponent></DesignTokens></ArticleContext.Provider>;
      }
      export const getStaticProps: GetStaticProps = async (context) => {
        const { id } = context.params;

        return { props: { repoData: await new ArticleRepo().getPage(id)}, revalidate: 60};
      };
      export const getStaticPaths: GetStaticPaths = async (context) => {
        const paths: any[] = (await new ArticleRepo().getIds()).map(
          (id) => ({
            params: {
              id,
            }
          })
        );
      
        return {
          paths,
          fallback: "blocking",
        };
      };`)
    ).toBeTruthy();
  });
});

function createProps(props: {
  pages: {
    name: string;
    isDynamic: boolean;
    isIndex?: boolean;
    component?: { name: string };
  }[];
  libraryFiles?: { pathname: string; sourceCode: string }[];
  components?: ContextualComponentProps[];
  tokens?: string;
}): NextPagesProps &
  FEProjectProps &
  NextReposProps &
  NextComponentsProps &
  NextDesignTokensProps {
  return {
    name: "project_name",
    pages: props.pages.map((p) => ({
      name: p.name,
      isDynamic: p.isDynamic,
      isIndex: p.isIndex ?? false,
      component: p.component ?? { name: "componentName" },
      sections: [],
      dataValues: [],
    })),
    pageComponents: props.components ?? [],
    librarySharedFiles: props.libraryFiles ?? [],
    tokens: props.tokens ?? "{}",
    libraryComponentFiles: [],
  };
}

function componentWithFiles(props: {
  name?: string;
  role?: "page";
  id?: string;
  files: { pathname: string; sourceCode: string }[];
  parameters?: BaseComponentProps["parameters"];
}) {
  return {
    contextualName: props.name ?? "Homepage",
    contextualRole: props.role ?? ("page" as "page"),
    id: props.id ?? "verticalLayout",
    files: props.files.map((file) => ({
      pathname: file.pathname,
      sourceCode: file.sourceCode,
    })),
    parameters: props.parameters ?? [],
  };
}
