import { ValueObject } from "../shared/valueObject";

export interface ComponentParamsProps {}
export class ComponentParams extends ValueObject<ComponentParamsProps> {
  private _params: any = {};
  constructor(props: ComponentParamsProps) {
    super(props);
  }
  addParam(name: string, value: any) {
    this._params[name] = value;
  }
  getParam(name: string) {
    return this._params[name];
  }
}
