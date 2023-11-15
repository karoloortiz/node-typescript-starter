import { Component } from "../component";
import { Mixin } from "../../../shared/mixins";
import { withPlaceholderSpecMixin } from "./withPlaceholderSpec";
import { withReactComponentMixin } from "../mixins/withReactComponent";
import { withSizeParamsMixin } from "../mixins/withSizeParams";

export const PlaceholderComponent = withSizeParamsMixin(
  withPlaceholderSpecMixin(Component)
);

export type PlaceholderComponent = Mixin<
  typeof withSizeParamsMixin<typeof PlaceholderComponent>
>;

export const ReactPlaceholderComponent =
  withReactComponentMixin(PlaceholderComponent);

export type ReactPlaceholderComponent = Mixin<
  typeof withReactComponentMixin<typeof ReactPlaceholderComponent>
>;
