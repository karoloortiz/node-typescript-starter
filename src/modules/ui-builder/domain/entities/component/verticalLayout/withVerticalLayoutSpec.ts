import { Component } from "../component";
import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { ComponentSpec } from "../../../valueObjects/componentSpec";

export interface WithVerticalLayoutSpecProps {
  gap?: ZeroValue;
}

export type ZeroValue = "zero";

export const withVerticalLayoutSpecMixin = createMixinFunction((Base) => {
  class WithVerticalLayoutSpec extends (Base as unknown as AnyConstructor<Component>) {
    constructor({ gap = "zero", ...rest }: WithVerticalLayoutSpecProps) {
      super({ gap, ...rest });
      this._spec = new ComponentSpec({ type: "verticalLayout" });
      this.setGap(gap);
    }

    setGap(value: ZeroValue) {
      //translation to actual value -> it should be from the design tokens
      this._params.addParam("gap", value);
    }
  }
  return WithVerticalLayoutSpec;
});

// translate di parametri nei parametri che si aspetta il mio componente. Quelli li conosco staticamente
