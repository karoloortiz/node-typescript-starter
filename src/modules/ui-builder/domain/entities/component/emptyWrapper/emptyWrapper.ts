import { withSizeParamsMixin } from "./../mixins/withSizeParams";
import { withEmptyWrapperMetaMixin } from "./withEmptyWrapperMeta";
import { Component } from "../component";
import { Mixin } from "../../../shared/mixins";
import { withChildMixin } from "../mixins/withChild";
import { withReactComponentMixin } from "../mixins/withReactComponent";

export const EmptyWrapperComponent = withSizeParamsMixin(
  withChildMixin(withEmptyWrapperMetaMixin(Component))
);
export type EmptyWrapperComponent = Mixin<
  typeof withSizeParamsMixin<typeof EmptyWrapperComponent>
>;

export const ReactEmptyWrapperComponent = withReactComponentMixin(
  EmptyWrapperComponent
);

export type ReactEmptyWrapperComponent = Mixin<
  typeof withReactComponentMixin<typeof ReactEmptyWrapperComponent>
>;
