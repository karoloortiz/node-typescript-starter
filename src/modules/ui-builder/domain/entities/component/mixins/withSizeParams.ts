import { AnyConstructor, createMixinFunction } from "../../../shared/mixins";
import { Component } from "../component";

export interface WithSizeParamsProps {
  width?: Size;
  minWidth?: Size;
  maxWidth?: Size;
  height?: Size;
  minHeight?: Size;
  maxHeight?: Size;
}

export type Size =
  | "screenWidth"
  | "screenHeight"
  | "full"
  | "infinity"
  | "zero";

export const withSizeParamsMixin = createMixinFunction((Base) => {
  class WithSizeParams extends (Base as unknown as AnyConstructor<Component>) {
    protected _name: string;
    constructor(props: WithSizeParamsProps) {
      super(props);
      this.setWidth(props.width);
      this.setMaxWidth(props.maxWidth);
      this.setMinWidth(props.minWidth);
      this.setHeight(props.height);
      this.setMinHeight(props.minHeight);
      this.setMaxHeight(props.maxHeight);
    }
    setWidth(value: Size) {
      this._params.addParam("width", value);
    }
    setMinWidth(value: Size) {
      this._params.addParam("minWidth", value);
    }
    setMaxWidth(value: Size) {
      this._params.addParam("maxWidth", value);
    }

    setHeight(value: Size) {
      this._params.addParam("height", value);
    }
    setMinHeight(value: Size) {
      this._params.addParam("minHeight", value);
    }
    setMaxHeight(value: Size) {
      this._params.addParam("maxHeight", value);
    }
  }
  return WithSizeParams;
});
