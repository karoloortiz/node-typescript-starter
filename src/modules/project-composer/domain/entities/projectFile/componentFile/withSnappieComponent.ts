import { ProjectFile } from "./../projectFile";
import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { toPascalCase } from "../../../../utils/textUtils";

interface WithSnappieComponentProps {
  componentName: string;
}

export const withSnappieComponentMixin = createMixinFunction((Base) => {
  class WithSnappieComponent extends (Base as unknown as AnyConstructor<ProjectFile>) {
    private _componentName;
    constructor(props: WithSnappieComponentProps) {
      super(props);
      this._componentName = props.componentName;
    }

    public get componentName(): string {
      return toPascalCase(this._componentName);
    }
  }
  return WithSnappieComponent;
});

// content with Dynamic dependencies
// content
