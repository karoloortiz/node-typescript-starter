import { NextStateFile } from "./../nextStateFile/nextStateFile";
import { PageContextFile } from "./../pageContextFile/pageContextFile";
import { toPascalCase } from "../../../../utils/textUtils";
import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { MainComponentFile } from "./componentFile";

interface WithComponentRewriteProps {
  contextFile: PageContextFile;
  stateFile: NextStateFile;
}

export const withComponentRewriteMixin = createMixinFunction((Base) => {
  class WithComponentRewrite extends (Base as unknown as AnyConstructor<MainComponentFile>) {
    constructor(props: WithComponentRewriteProps) {
      super(props);
      this.renameComponentAndPropsInterface();
      const params = [...this.getParams()];
      for (const param of params) {
        if (param.param.type === "componentList") {
          this.removeParamFromProps(param.name);
          this.replaceParamWithComponentList(param.name, param.param.value);
          param.param.value.forEach((p) => {
            this.addDependency(p);
          });
          this.removeParam(param.name);
        }
        if (param.param.type === "component") {
          this.removeParamFromProps(param.name);
          this.replaceParamWithComponentList(param.name, [param.param.value]);
          this.addDependency(param.param.value);
          this.removeParam(param.name);
        }

        if (param.param.type === "data") {
          this.addDependency(props.contextFile);
          this.addDependency(props.stateFile);
          if (param.param.value.isList) {
            this.addStateInjectionForListItem(param.name);
          }
        }
      }
    }

    private renameComponentAndPropsInterface() {
      this.content.renamePropsInterfaceAndReferences(
        `${this.componentName}Props`
      );
      this.content.renameComponent(`${this.componentName}`);
    }

    private removeParamFromProps(paramName: string) {
      this.content.removeFieldFromInterface(
        toPascalCase(`${this.componentName}Props`),
        paramName
      );
    }
    private replaceParamWithComponentList(
      paramName: string,
      components: MainComponentFile[]
    ) {
      let componentCallExpression = "";
      for (const component of components) {
        componentCallExpression += component.getFullJsxTag().jsxTag;
        component
          .getFullJsxTag()
          .dependencies.forEach((d) => this.addDependency(d));
      }
      this.content.replaceJsxExpression(paramName, componentCallExpression);
    }

    private addStateInjectionForListItem(paramName: string) {
      this.content.wrapDataItemWithState(
        paramName,
        (itemVariableName) =>
          (
            this.props as WithComponentRewriteProps
          ).contextFile.getOpeningJsxTag(
            (
              this.props as WithComponentRewriteProps
            ).stateFile.getConstructorCall(itemVariableName)
          ),
        (this.props as WithComponentRewriteProps).contextFile.getClosingJsxTag()
      );
    }
  }
  return WithComponentRewrite;
});
