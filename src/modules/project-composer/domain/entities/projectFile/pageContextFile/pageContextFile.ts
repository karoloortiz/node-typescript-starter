import { withPageContextTemplateMixin } from "./withPageContexTemplate";
import { withPublicInterfaceMixin } from "../mixins/withPublicInterface";
import { ProjectFile } from "../projectFile";
import { Mixin } from "../../../shared/mixins";
import { withDynamicDependenciesMixin } from "../mixins/withDynamicDeps";

export const PageContextFile = withPageContextTemplateMixin(
  withDynamicDependenciesMixin(withPublicInterfaceMixin(ProjectFile))
);
export type PageContextFile = Mixin<
  typeof withPageContextTemplateMixin<typeof PageContextFile>
>;
