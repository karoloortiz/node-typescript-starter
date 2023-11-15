import { withChildrenMixin } from "./../mixins/withChildren";
import { withSizeParamsMixin } from "./../mixins/withSizeParams";
import { Component } from "../component";
import { Mixin } from "../../../shared/mixins";
import { withVerticalLayoutSpecMixin } from "./withVerticalLayoutSpec";
import { withReactComponentMixin } from "../mixins/withReactComponent";

export const VerticalLayoutComponent = withSizeParamsMixin(
  withChildrenMixin(withVerticalLayoutSpecMixin(Component))
);
export type VerticalLayoutComponent = Mixin<
  typeof withSizeParamsMixin<typeof VerticalLayoutComponent>
>;

export const ReactVerticalLayoutComponent = withReactComponentMixin(
  VerticalLayoutComponent
);
export type ReactVerticalLayoutComponent = Mixin<
  typeof withReactComponentMixin<typeof ReactVerticalLayoutComponent>
>;
