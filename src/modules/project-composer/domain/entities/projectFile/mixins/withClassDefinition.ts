import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { FileContentWithMutator } from "../../fileContent/fileContentMutator";
import { ProjectFile } from "../projectFile";

interface WithClassDefinitionProps {}

export const withClassDefinitionMixin = createMixinFunction((Base) => {
  class WithClassDefinition extends (Base as unknown as AnyConstructor<ProjectFile>) {
    protected content: FileContentWithMutator;

    constructor(props: WithClassDefinitionProps) {
      super(props);
      this.content = new FileContentWithMutator({
        name: this.props.fullPath,
        sourceCode: this.props.content,
      });
    }

    public getConstructorCall(...params: string[]): string {
      return this.content.getConstructorCall(...params);
    }
  }
  return WithClassDefinition;
});
