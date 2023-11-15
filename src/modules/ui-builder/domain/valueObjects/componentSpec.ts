import { ValueObject } from "../shared/valueObject";

export interface ComponentSpecProps {
  type: string;
}
export class ComponentSpec extends ValueObject<ComponentSpecProps> {
  private _type: string;
  constructor(props: ComponentSpecProps) {
    super(props);
    this._type = props.type;
  }

  getType() {
    return this._type;
  }
}
