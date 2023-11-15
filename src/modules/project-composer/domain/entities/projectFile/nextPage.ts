import { toCamelCase, toPascalCase } from "../../../utils/textUtils";
import { Mixin } from "../../shared/mixins";
import { FileContent } from "../fileContent/fileContent";
import { fileContentMutatorMixin } from "../fileContent/fileContentMutator";
import {
  FileContentWithPlaceholder,
  fileContentWithPlaceholderMixin,
} from "../fileContent/fileContentWithPlaceholder";
import { ProjectFile } from "../projectFile/projectFile";

export type PageContent = Mixin<
  typeof fileContentMutatorMixin<typeof FileContentWithPlaceholder>
>;
export const PageContent = fileContentMutatorMixin(
  fileContentWithPlaceholderMixin(FileContent)
);

export interface PageProps {
  name: string;
  fileName: string;
  content: string;
  placeholders: string[];
}

export class NextPage extends ProjectFile {
  protected name: string;
  protected content: PageContent;

  constructor(props: PageProps) {
    const pascalCaseName = toPascalCase(props.name);

    super({
      fullPath: `pages/${props.fileName}`,
      content: props.content,
    });

    this.name = props.name;

    this.content = new PageContent({
      name: props.fileName,
      sourceCode: props.content,
      placeholderValues: props.placeholders,
    });
  }

  public get propsName(): string {
    return toPascalCase(this.name) + "Props";
  }

  public addPageStateImport(
    stateClassName: string,
    relativePathToFile: string
  ): void {
    this.content.addNamedImport(stateClassName, relativePathToFile);
  }

  public addRepoImports(
    repoName: string,
    repoDataName: string,
    relativePathToFile: string
  ): void {
    this.content.addNamedImports([repoName, repoDataName], relativePathToFile);
  }

  public changeRepoDataType(repoDataType: string): void {
    this.content.changeInterfaceFieldType(
      this.propsName,
      "repoData",
      repoDataType
    );
  }

  public importAndInjectDesignTokens(
    componentName: string,
    relativePathToFile: string
  ) {
    this.content.addNamedImport(componentName, relativePathToFile);

    this.content.setJsxElementBody(
      `${toPascalCase(this.name)}Context.Provider`,
      `<${componentName}></${componentName}>`
    );
  }

  public importAndInjectPageComponent(
    componentName: string,
    as: string,
    relativePathToFile: string,
    targetElementName: string
  ) {
    this.content.addNamedImport(
      `${componentName} as ${as}`,
      relativePathToFile
    );

    this.content.setJsxElementBody(
      targetElementName,
      `<${as}></${as}>`
    );
  }

  public initializeAndInjectPageState(stateClassName: string): void {
    this.content.initializeVariable(
      `${toPascalCase(this.name)}Context`,
      `React.createContext(new ${stateClassName}({}))`
    );

    this.content.setJsxAttributeValue(
      `${toPascalCase(this.name)}Context.Provider`,
      "value",
      `new ${stateClassName}(props.repoData)`
    );
  }
}
