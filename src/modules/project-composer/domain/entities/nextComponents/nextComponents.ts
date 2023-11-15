import {
  ContextualComponentFile,
  MainComponentFile,
} from "./../projectFile/componentFile/componentFile";
import { ProjectFile, PublicFileWithDeps } from "./../projectFile/projectFile";
import { FullPath } from "./../../valueObjects/fullPath";
import {
  createMixinFunction,
  AnyConstructor,
  Mixin,
} from "../../shared/mixins";
import { FEProject } from "../feProject/feProject";
import {
  isComponentParameter,
  isContextualComponent,
  NextComponentsProps,
  ContextualComponentProps,
  isComponentListParameter,
  ComponentProps,
  isDataParameter,
  BaseComponentProps,
} from "./nextComponentsProps";
import { toCamelCase, toPascalCase } from "../../../utils/textUtils";
import { ComponentFile } from "../projectFile/componentFile/componentFile";
import { NextStateFile } from "../projectFile/nextStateFile/nextStateFile";
import { PageContextFile } from "../projectFile/pageContextFile/pageContextFile";

export const nextComponentsMixin = createMixinFunction((Base) => {
  class NextComponents extends (Base as unknown as AnyConstructor<FEProject>) {
    private _libraryComponentFiles: ComponentFile[] = [];
    private _librarySharedFiles: PublicFileWithDeps[] = [];

    constructor(props: NextComponentsProps, id?: string) {
      super(props);

      this.createLibrarySharedFiles(props.librarySharedFiles);
      this.createLibraryComponentFiles(props.libraryComponentFiles);

      const actualProjectComponentFiles: ComponentFile[] = [];

      for (const pageComponent of props.pageComponents) {
        const pageFile = this.createComponentFiles(pageComponent);
        actualProjectComponentFiles.push(pageFile);
      }

      for (const actualFile of actualProjectComponentFiles) {
        this.addFile(actualFile);
        for (const dep of actualFile.getDependencies()) {
          if (!this.fileExists(dep)) this.addFile(dep);
        }
      }
    }

    public getComponentForPage(name: string): ComponentFile {
      return this._files.find(
        (f) =>
          f instanceof ContextualComponentFile &&
          f.componentName.toLowerCase() === name.toLowerCase()
      ) as ContextualComponentFile;
    }

    private createLibrarySharedFiles(
      libraryFilesProps: NextComponentsProps["librarySharedFiles"]
    ) {
      const files = libraryFilesProps.map(
        (l) =>
          new PublicFileWithDeps({
            fullPath: `/lib/components${l.pathname}`,
            content: l.sourceCode,
          })
      );
      files.forEach((f) => f.injectDependenciesFrom(files));
      this._librarySharedFiles = files;
    }

    private createLibraryComponentFiles(
      componentLibraryFiles: NextComponentsProps["libraryComponentFiles"]
    ) {
      const files = componentLibraryFiles.reduce<ComponentFile[]>(
        (previous, current) => {
          const files = current.files.map(
            (f) =>
              new ComponentFile({
                fullPath: `/components/shared/${toCamelCase(current.id)}${
                  f.pathname
                }`,
                content: f.sourceCode,
                componentName: current.id,
              })
          );
          return [...previous, ...files];
        },
        []
      );
      files.forEach((f) =>
        f.injectDependenciesFrom([...files, ...this._librarySharedFiles])
      );
      this._libraryComponentFiles = files;
    }

    private createComponentFiles(
      componentProps: ComponentProps,
      contextPath: string = "/components"
    ): MainComponentFile {
      const createComponentFilesFromParams = (
        parameters: BaseComponentProps["parameters"]
      ) => {
        return parameters.map((param) => {
          let newContextualPath = contextPath;
          if (isContextualComponent(componentProps)) {
            newContextualPath =
              contextPath + "/" + toCamelCase(componentProps.contextualName);
          }

          let paramValue;
          if (param.value.type === "component") {
            paramValue = this.createComponentFiles(
              param.value.value,
              newContextualPath
            );
          }
          if (param.value.type === "componentList") {
            paramValue = param.value.value.map((v) =>
              this.createComponentFiles(v, newContextualPath)
            );
          }
          if (param.value.type === "data" || param.value.type === "rawValue") {
            paramValue = param.value.value;
          }

          return {
            name: param.name,
            param: {
              type: param.value.type,
              value: paramValue,
            },
          };
        });
      };

      const getPath = (pathname: string) => {
        if (isContextualComponent(componentProps)) {
          return `${contextPath}/${toCamelCase(
            componentProps.contextualName
          )}/${new FullPath({ fullPath: pathname }).name}`;
        } else {
          return `/components/shared/${toCamelCase(
            componentProps.id
          )}${pathname}`;
        }
      };

      const extraFiles = [];

      for (const fileProps of componentProps.files) {
        if (
          new FullPath({ fullPath: fileProps.pathname })
            .nameWithoutExtension !== "index"
        ) {
          let extraFile = this._libraryComponentFiles.find(
            (value) =>
              value.componentName === componentProps.id &&
              value.getName() ===
                new FullPath({ fullPath: fileProps.pathname }).name
          );

          if (!extraFile) {
            extraFile = new ComponentFile({
              componentName: componentProps.id,
              content: fileProps.sourceCode,
              fullPath: getPath(fileProps.pathname),
            });

            extraFile.injectDependenciesFrom([
              ...this._librarySharedFiles,
              ...this._libraryComponentFiles,
            ]);
          }

          extraFiles.push(extraFile);
        }
      }

      const mainComponentFileProps = componentProps.files.find(
        (f) =>
          new FullPath({ fullPath: f.pathname }).nameWithoutExtension ===
          "index"
      );

      if (!mainComponentFileProps) {
        throw new Error("No index file inside component");
      }

      let mainComponentFile: MainComponentFile = new MainComponentFile({
        componentName: componentProps.id,
        content: mainComponentFileProps.sourceCode,
        params: createComponentFilesFromParams(componentProps.parameters),
        fullPath: getPath(mainComponentFileProps.pathname),
        extraFiles: extraFiles,
      });
      if (isContextualComponent(componentProps)) {
        mainComponentFile = new ContextualComponentFile({
          contextFile: new PageContextFile({}),
          stateFile: new NextStateFile({}),
          componentName: componentProps.contextualName,
          content: mainComponentFileProps.sourceCode,
          params: createComponentFilesFromParams(componentProps.parameters),
          fullPath: getPath(mainComponentFileProps.pathname),
          extraFiles: extraFiles,
        });
      }

      mainComponentFile.injectDependenciesFrom([
        ...this._librarySharedFiles,
        ...this._libraryComponentFiles,
      ]);

      return mainComponentFile;
    }
  }

  return NextComponents;
});
