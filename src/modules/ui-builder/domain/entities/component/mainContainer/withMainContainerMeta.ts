import { Component } from "../component";
import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { ReactComponentLibrary } from "../../../../../components-library/lib/componentLibrary";
import { ComponentSpec } from "../../../valueObjects/componentSpec";

export interface MainContainerMetaProps {}

export const withMainContainerMetaMixin = createMixinFunction((Base) => {
  class MainContainerMeta extends (Base as unknown as AnyConstructor<Component>) {
    constructor(props: MainContainerMetaProps) {
      super(props);
      this._spec = new ComponentSpec({ type: "mainContainer" });
    }
  }
  return MainContainerMeta;
});
