import { AnyConstructor, createMixinFunction } from "../../../shared/mixins";
import { Component } from "../component";

export interface withChildrenProps {
  children?: Component[];
}

export const withChildrenMixin = createMixinFunction((Base) => {
  class WithChildren extends (Base as unknown as AnyConstructor<Component>) {
    constructor(props: withChildrenProps) {
      super(props);
      this.setChildren(props.children);
    }

    setChildren(component: Component[]) {
      this._params.addParam("children", component);
    }
    getChildren(): Component[] {
      return this._params.getParam("children");
    }
  }
  return WithChildren;
});
