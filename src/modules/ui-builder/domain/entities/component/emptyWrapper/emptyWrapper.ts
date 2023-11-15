import { withSizeParamsMixin } from "./../mixins/withSizeParams";
import { withEmptyWrapperMetaMixin } from "./withEmptyWrapperMeta";
import { Component } from "../component";
import { Mixin } from "../../../shared/mixins";
import { withChildMixin } from "../mixins/withChild";

export const EmptyWrapperComponent = withSizeParamsMixin(
  withChildMixin(withEmptyWrapperMetaMixin(Component))
);
export type EmptyWrapperComponent = Mixin<
  typeof withSizeParamsMixin<typeof EmptyWrapperComponent>
>;