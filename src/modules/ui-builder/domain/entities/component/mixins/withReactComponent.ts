import { ReactComponentLibrary } from "./../../../../../components-library/lib/componentLibrary";
import { ComponentMeta } from "./../../../../../components-library/lib/componentMeta/componentMeta";
import { AnyConstructor, createMixinFunction } from "../../../shared/mixins";
import { Component } from "../component";

export interface WithReactComponentProps {}

export const withReactComponentMixin = createMixinFunction((Base) => {
  class WithReactComponent extends (Base as unknown as AnyConstructor<Component>) {
    private _reactMeta: ComponentMeta;
    constructor(props: WithReactComponentProps) {
      super(props);
      this._reactMeta = ReactComponentLibrary.findComponentByType(
        this._spec.getType()
      );
    }

    get libraryName(): string {
      return this._reactMeta.id;
    }

    getReactParam(paramName: string): string {
      return this._params.getParam(paramName);
    }

    get mainFileSourceCode(): Promise<string> {
      return ReactComponentLibrary.getMainFileForComponent(this._reactMeta.id);
    }

    async hasSourceCode(code: string) {
      return await (await this.mainFileSourceCode)
        .replaceAll(/[\n\r\s]/g, "")
        .includes(code.replaceAll(/[\n\r\s]/g, ""));
    }

    get extraFilesSourceCode(): string {
      return "";
    }
  }
  return WithReactComponent;
});
