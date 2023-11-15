import { withComponentRewriteMixin } from "./withComponentRewrite";
import { withMainComponentMixin } from "./withMainComponent";
import { withSnappieComponentMixin } from "./withSnappieComponent";
import { withDynamicDependenciesMixin } from "../mixins/withDynamicDeps";
import { Mixin } from "../../../shared/mixins";
import { ProjectFile } from "../projectFile";
import { withPublicInterfaceMixin } from "../mixins/withPublicInterface";

export const ComponentFile = withSnappieComponentMixin(
  withDynamicDependenciesMixin(withPublicInterfaceMixin(ProjectFile))
);

export type ComponentFile = Mixin<
  typeof withSnappieComponentMixin<typeof ComponentFile>
>;

export const MainComponentFile = withMainComponentMixin(
  withSnappieComponentMixin(
    withDynamicDependenciesMixin(withPublicInterfaceMixin(ProjectFile))
  )
);

export type MainComponentFile = Mixin<
  typeof withMainComponentMixin<typeof MainComponentFile>
>;

export const ContextualComponentFile = withComponentRewriteMixin(
  withMainComponentMixin(
    withSnappieComponentMixin(
      withDynamicDependenciesMixin(withPublicInterfaceMixin(ProjectFile))
    )
  )
);
export type ContextualComponentFile = Mixin<
  typeof withMainComponentMixin<typeof ContextualComponentFile>
>;
