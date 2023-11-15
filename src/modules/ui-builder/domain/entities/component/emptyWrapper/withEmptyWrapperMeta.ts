import { Component } from "../component";
import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { ComponentSpec } from "../../../valueObjects/componentSpec";

export interface WithEmptyWrapperMetaProps {}

export const withEmptyWrapperMetaMixin = createMixinFunction((Base) => {
  class EmptyWrapperMeta extends (Base as unknown as AnyConstructor<Component>) {
    constructor(props: WithEmptyWrapperMetaProps) {
      super(props);
      this._spec = new ComponentSpec({ type: "emptyWrapper" });
    }
  }
  return EmptyWrapperMeta;
});
