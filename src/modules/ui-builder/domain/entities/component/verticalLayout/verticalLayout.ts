import { withChildrenMixin } from "./../mixins/withChildren";
import { withSizeParamsMixin } from "./../mixins/withSizeParams";
import { Component } from "../component";
import { Mixin } from "../../../shared/mixins";
import { withVerticalLayoutSpecMixin } from "./withVerticalLayoutSpec";

export const VerticalLayoutComponent = withSizeParamsMixin(
  withChildrenMixin(withVerticalLayoutSpecMixin(Component))
);
export type VerticalLayoutComponent = Mixin<
  typeof withSizeParamsMixin<typeof VerticalLayoutComponent>
>;