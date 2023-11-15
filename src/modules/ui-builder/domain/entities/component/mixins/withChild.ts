import { PlaceholderComponent } from "./../placeholder/placeholder";
import { AnyConstructor, createMixinFunction } from "../../../shared/mixins";
import { Component } from "../component";

export interface withChildProps {
  child?: Component;
}

export const withChildMixin = createMixinFunction((Base) => {
  class WithChild extends (Base as unknown as AnyConstructor<Component>) {
    constructor(props: withChildProps) {
      super(props);
      this.setChild(props.child ?? new PlaceholderComponent({}));
    }

    setChild(component: Component) {
      this._params.addParam("child", component);
    }
    getChild(): Component {
      return this._params.getParam("child");
    }
  }
  return WithChild;
});
