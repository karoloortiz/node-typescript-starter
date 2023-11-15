import { toCamelCase, toPascalCase } from "../../../utils/textUtils";
import { NextPage } from "./nextPage";

const FILE_TEMPLATE = `
import { GetStaticProps } from "next";
import React from "react";

export interface <@placeholder>Props {
  repoData: any;
}

export const <@placeholder>Context = React.createContext();

export default function <@placeholder>(props: <@placeholder>Props) {
  return <<@placeholder>Context.Provider value={}></<@placeholder>Context.Provider>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
    revalidate: 60,
  };
}; `;

export interface NextStaticPageProps {
  name: string;
  isIndex?: boolean;
}
export class NextStaticPage extends NextPage {
  constructor(props: NextStaticPageProps) {
    const pascalCaseName = toPascalCase(props.name);

    super({
      name: props.name,
      fileName: props.isIndex ? "index.tsx" : `${toCamelCase(props.name)}.tsx`,
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
          repoData: await new ${repoName}().getPage()
        },
        revalidate: 60
      }`
    );
  }
}
