import { Component } from "../component";
import { Mixin } from "../../../shared/mixins";
import { withPlaceholderSpecMixin } from "./withPlaceholderSpec";
import { withSizeParamsMixin } from "../mixins/withSizeParams";

export const PlaceholderComponent = withSizeParamsMixin(
  withPlaceholderSpecMixin(Component)
);

export type PlaceholderComponent = Mixin<
  typeof withSizeParamsMixin<typeof PlaceholderComponent>
>;
