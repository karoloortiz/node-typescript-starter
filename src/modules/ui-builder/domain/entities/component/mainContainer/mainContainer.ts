import { Component } from "../component";
import { Mixin } from "../../../shared/mixins";
import { withMainContainerMetaMixin } from "./withMainContainerMeta";
import { withChildMixin } from "../mixins/withChild";
import { withReactComponentMixin } from "../mixins/withReactComponent";

export const MainContainerComponent = withChildMixin(
  withMainContainerMetaMixin(Component)
);
export type MainContainerComponent = Mixin<
  typeof withChildMixin<typeof MainContainerComponent>
>;

export const ReactMainContainerComponent = withReactComponentMixin(
  MainContainerComponent
);

export type ReactMainContainerComponent = Mixin<
  typeof withReactComponentMixin<typeof ReactMainContainerComponent>
>;
