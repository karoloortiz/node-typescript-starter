import { PageContextFile } from "./../pageContextFile/pageContextFile";
import { FileWithDynamicDeps, FileWithPublicInterface } from "./../projectFile";
import { NextStateFile } from "./../nextStateFile/nextStateFile";
import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { ProjectFile } from "../projectFile";
import { ComponentFile, MainComponentFile } from "./componentFile";

interface WithMainComponentProps {
  params: {
    name: string;
    param:
      | {
          type: "data";
          value: { dataModelId: string; infoId: string; isList: boolean };
        }
      | {
          type: "rawValue";
          value: string;
        }
      | { type: "componentList"; value: MainComponentFile[] }
      | { type: "component"; value: MainComponentFile };
  }[];
  extraFiles: ComponentFile[];
}

export const withMainComponentMixin = createMixinFunction((Base) => {
  class WithMainComponent extends (Base as unknown as AnyConstructor<ComponentFile>) {
    private readonly _params: {
      name: string;
      param:
        | {
            type: "data";
            value: { dataModelId: string; infoId: string; isList: boolean };
          }
        | {
            type: "rawValue";
            value: string;
          }
        | { type: "componentList"; value: MainComponentFile[] }
        | { type: "component"; value: MainComponentFile };
    }[] = [];
    private _extraFiles: ComponentFile[] = [];
    constructor(props: WithMainComponentProps) {
      super(props);
      this._params = props.params;
      this._extraFiles = props.extraFiles;
      for (const param of this._params) {
        if (param.param.type === "component") {
          this.addDependency(param.param.value);
        }
        if (param.param.type === "componentList") {
          for (const componentParam of param.param.value) {
            this.addDependency(componentParam);
          }
        }
      }
    }

    protected getParam(name: string) {
      return this._params.find((p) => p.name === name);
    }

    protected getParams() {
      return this._params;
    }

    protected removeParam(name: string) {
      return this._params.splice(
        this._params.indexOf(this._params.find((p) => p.name === name)),
        1
      );
    }

    //override
    public getDependencies(): ProjectFile[] {
      let files: ProjectFile[] = [];
      for (const extra of this._extraFiles) {
        files = [
          ...files,
          extra,
          ...(extra as FileWithDynamicDeps).getDependencies(),
        ];
      }

      for (const dep of super.getDependencies()) {
        files = [
          ...files,
          dep,
          ...(dep as FileWithDynamicDeps).getDependencies(),
        ];
      }

      return [...files, ...super.getDependencies()];
    }

    public getFullJsxTag(): {
      jsxTag: string;
      dependencies: FileWithPublicInterface[];
    } {
      const attributes: string[] = [];
      let childrenAttributes = "";
      const dependencies: FileWithPublicInterface[] = [];
      this._params.forEach((param, index) => {
        if (param.param.type === "data") {
          dependencies.push(new PageContextFile({}));

          dependencies.push(new NextStateFile({}));
          attributes.push(
            `${param.name}={${new NextStateFile({}).getDataAccessFunctionCall(
              "React.useContext<NextPageState>(PageContext)",
              `"${param.param.value.dataModelId}"`
            )}}`
          );
        }
        if (param.param.type === "component") {
          dependencies.push(param.param.value);
          attributes.push(
            `${param.name}={${param.param.value.getFullJsxTag().jsxTag}}`
          );
        }
        if (param.param.type === "componentList") {
          param.param.value.forEach((param) => {
            dependencies.push(param);
            childrenAttributes += param.getFullJsxTag().jsxTag;
          });
        }
      });

      return {
        jsxTag: `<${this.componentName}${
          attributes.length > 0 ? " " + attributes.join(" ") : ""
        }>${childrenAttributes}</${this.componentName}>`,
        dependencies: dependencies,
      };
    }
  }
  return WithMainComponent;
});

// content with Dynamic dependencies
// content
