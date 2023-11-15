import { toCamelCase, toPascalCase } from "../../../utils/textUtils";
import { NextPage } from "./nextPage";

const FILE_TEMPLATE = `
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

export interface <@placeholder>Props {
  repoData: any;
}

export const <@placeholder>Context = React.createContext();

export default function <@placeholder>(props: <@placeholder>Props) {
  return <<@placeholder>Context.Provider value={}></<@placeholder>Context.Provider>;
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
};
 `;

export interface NextDynamicPageProps {
  name: string;
}
export class NextDynamicPage extends NextPage {
  constructor(props: NextDynamicPageProps) {
    const pascalCaseName = toPascalCase(props.name);

    super({
      name: props.name,
      fileName: `${toCamelCase(props.name)}/[id].tsx`,
      content: FILE_TEMPLATE,
      placeholders: [
        pascalCaseName,
        pascalCaseName,
        pascalCaseName,
        pascalCaseName,
        pascalCaseName,
        pascalCaseName,
      ],
    });
  }

  public changeGetStaticPropsReturn(repoName: string) {
    this.content.setArrowFunctionReturn(
      "getStaticProps",
      `{
        props: {
          repoData: await new ${repoName}().getPage(id)
        },
        revalidate: 60
      }`
    );
  }

  public changeGetStaticPathFunction(repoName: string): void {
    this.content.setArrowFunctionInnerVariableInitializer(
      "getStaticPaths",
      "paths",
      `(await new ${repoName}().getIds()).map((id) => ({
      params: {
        id,
      }
    }))`
    );
  }
}
