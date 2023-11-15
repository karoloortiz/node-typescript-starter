import { FEProject } from "../feProject/feProject";
import { ProjectFile } from "../projectFile/projectFile";
import { AnyConstructor, createMixinFunction } from "../../shared/mixins";
import { DesignTokens } from "../projectFile/designTokens";

export interface NextDesignTokensProps {
  tokens: string;
}

export const nextDesignTokensMixin = createMixinFunction((Base) => {
  class NextDesignTokens extends (Base as unknown as AnyConstructor<FEProject>) {
    constructor(props: NextDesignTokensProps, id?: string) {
      super(props);
      const _file = new DesignTokens({
        tokens: props.tokens,
      });

      this.addFile(_file);
    }

    protected getDesignTokensFile(): DesignTokens {
      return this._files.find((f) => f instanceof DesignTokens) as DesignTokens;
    }
  }

  return NextDesignTokens;
});
