import {
  createMixinFunction,
  AnyConstructor,
  Mixin,
} from "../../../shared/mixins";
import { FileContentWithMutator } from "../../fileContent/fileContentMutator";
import { ProjectFile } from "../projectFile";

interface WithPublicInterfaceProps {}

export const withPublicInterfaceMixin = createMixinFunction((Base) => {
  class WithPublicInterface extends (Base as unknown as AnyConstructor<ProjectFile>) {
    protected content: FileContentWithMutator;

    constructor(props: WithPublicInterfaceProps) {
      super(props);
      this.content = new FileContentWithMutator({
        name: this.props.fullPath,
        sourceCode: this.props.content,
      });
    }

    public getNamedExports(): string[] {
      const namedExports = this.content.getNamedExports();
      return namedExports;
    }

    public getDefaultExport() {}
  }
  return WithPublicInterface;
});
