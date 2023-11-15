export class ValueObject<ValueObjectProps> {
  private _props: ValueObjectProps;
  constructor(props: ValueObjectProps) {
    this._props = props;
  }

  get props() {
    return this._props;
  }
}
