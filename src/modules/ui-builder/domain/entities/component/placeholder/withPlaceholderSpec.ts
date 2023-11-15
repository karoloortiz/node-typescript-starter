import { Component } from "../component";
import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { ComponentSpec } from "../../../valueObjects/componentSpec";

export interface WithPlaceholderSpecProps {}

export const withPlaceholderSpecMixin = createMixinFunction((Base) => {
  class PlaceholderSpec extends (Base as unknown as AnyConstructor<Component>) {
    constructor(props: WithPlaceholderSpecProps) {
      super(props);
      this._spec = new ComponentSpec({ type: "placeholder" });
    }
  }
  return PlaceholderSpec;
});
