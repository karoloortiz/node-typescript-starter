import {
  createMixinFunction,
  AnyConstructor,
  Mixin,
} from "../../../shared/mixins";
import { FileContentWithMutator } from "../../fileContent/fileContentMutator";
import { ProjectFile } from "../projectFile";

interface WithReactComponentProps {}

export const withReactComponentMixin = createMixinFunction((Base) => {
  class WithReactComponent extends (Base as unknown as AnyConstructor<ProjectFile>) {
    protected content: FileContentWithMutator;

    constructor(props: WithReactComponentProps) {
      super(props);
      this.content = new FileContentWithMutator({
        name: this.props.fullPath,
        sourceCode: this.props.content,
      });
    }
  }
  return WithReactComponent;
});
