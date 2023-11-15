import { Component } from "../component";
import { Mixin } from "../../../shared/mixins";
import { withMainContainerMetaMixin } from "./withMainContainerMeta";
import { withChildMixin } from "../mixins/withChild";

export const MainContainerComponent = withChildMixin(
  withMainContainerMetaMixin(Component)
);
export type MainContainerComponent = Mixin<
  typeof withChildMixin<typeof MainContainerComponent>
>;
