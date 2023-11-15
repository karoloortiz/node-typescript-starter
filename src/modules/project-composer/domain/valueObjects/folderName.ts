import { ValueObject } from "../shared/valueObject";

export interface FolderNameProps {
  value: string;
}
export class FolderName extends ValueObject<FolderNameProps> {
  private _name: string;
  constructor(props: FolderNameProps) {
    super(props);
    this._name = props.value.toLowerCase().split(" ").join("-");
  }
  getValue() {
    return this._name;
  }
}
