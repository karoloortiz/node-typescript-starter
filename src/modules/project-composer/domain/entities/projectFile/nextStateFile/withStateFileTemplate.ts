import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { FileWithClassDef, ProjectFile } from "../projectFile";

interface WithStateFileTemplateProps {}

const FILE_TEMPLATE = `
    export class NextPageState {
    private data;
  
    constructor(data: any) {
      this.data = data;
    }
  
    public get(id: string): any {
      return this.data[id];
    }
  }`;

export const withStateFileTemplateMixin = createMixinFunction((Base) => {
  class WithStateFileTemplate extends (Base as unknown as AnyConstructor<FileWithClassDef>) {
    constructor(props: WithStateFileTemplateProps) {
      super({ content: FILE_TEMPLATE, fullPath: "/lib/nextPageState.ts" });
    }

    public getConstructorCall(dataParam): string {
      return super.getConstructorCall(dataParam);
    }

    public getDataAccessFunctionCall(instanceName, dataId): string {
      return `${instanceName}.get(${dataId})`;
    }
  }
  return WithStateFileTemplate;
});
