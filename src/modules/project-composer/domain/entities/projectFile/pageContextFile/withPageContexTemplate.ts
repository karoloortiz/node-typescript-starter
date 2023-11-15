import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { ProjectFile } from "../projectFile";

interface WithPageContextTemplateProps {}

const FILE_TEMPLATE = `
import React from "react";
export const PageContext = React.createContext();`;

export const withPageContextTemplateMixin = createMixinFunction((Base) => {
  class WithPageContextTemplate extends (Base as unknown as AnyConstructor<ProjectFile>) {
    constructor(props: WithPageContextTemplateProps) {
      super({ content: FILE_TEMPLATE, fullPath: "/lib/pageContext.ts" });
    }

    public getContextVariable(): string {
      return `PageContext`;
    }

    public getOpeningJsxTag(valueAttribute: string) {
      return `<PageContext.Provider value={${valueAttribute}}>`;
    }

    public getClosingJsxTag() {
      return `</PageContext.Provider>`;
    }
  }
  return WithPageContextTemplate;
});
