import { toPascalCase } from "../../../utils/textUtils";
import { Mixin } from "../../shared/mixins";
import { FileContentWithPlaceholder } from "../fileContent/fileContentWithPlaceholder";
import { ProjectFile } from "./projectFile";

const FILE_TEMPLATE = `import React from "react";
export const tokens = <@placeholder>

export const DesignSystemContext = React.createContext(tokens);

export function DesignSystem({children}) {
    return <DesignSystemContext.Provider value={tokens}>{children}</DesignSystemContext.Provider>
}`;

export interface DesignTokensProps {
  tokens: string;
}

export class DesignTokens extends ProjectFile {
  protected content: FileContentWithPlaceholder;

  constructor(props: DesignTokensProps) {
    super({
      fullPath: `styles/designTokens.tsx`,
      content: FILE_TEMPLATE,
    });

    this.content = new FileContentWithPlaceholder({
      name: "designTokens.tsx",
      sourceCode: FILE_TEMPLATE,
      placeholderValues: [props.tokens],
    });
  }

  public get componentName(): string {
    return toPascalCase(this.getNameWithoutExtension());
  }
}
