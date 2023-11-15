import { ComponentSpec } from "./../../valueObjects/componentSpec";
import { Entity } from "../../shared/entity";
import { ComponentParams } from "../../valueObjects/componentParams";

interface ComponentProps {
  name?: string;
}

export class Component extends Entity<ComponentProps> {
  protected _spec: ComponentSpec;
  protected _params: ComponentParams;

  constructor(props: ComponentProps, id?: string) {
    super(props, id);
    this._params = new ComponentParams({});
  }

  getParam<T>(paramName: string): T {
    return this._params.getParam(paramName);
  }

  get name() {
    return `${this.props.name ?? this.type}Component`;
  }

  get type(): string {
    if (!this._spec) {
      throw new Error("Should create a specific type of component");
    }
    return this._spec.getType();
  }
}
