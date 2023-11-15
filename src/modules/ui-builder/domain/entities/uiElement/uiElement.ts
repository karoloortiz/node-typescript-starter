import { Entity } from "../../shared/entity";
import { Component } from "../component/component";

interface UIElementProps {}
export class UIElement extends Entity<UIElementProps> {
  protected _component: Component;

  constructor(props: UIElementProps, id?: string) {
    // calcola design token da usare
    super(props, id);
  }

  getComponent(): Component {
    return this._component;
  }
}
