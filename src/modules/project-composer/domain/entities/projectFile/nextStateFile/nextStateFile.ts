import { withDynamicDependenciesMixin } from "./../mixins/withDynamicDeps";
import { withClassDefinitionMixin } from "./../mixins/withClassDefinition";
import { withPublicInterfaceMixin } from "../mixins/withPublicInterface";
import { ProjectFile } from "../projectFile";
import { withStateFileTemplateMixin } from "./withStateFileTemplate";
import { Mixin } from "../../../shared/mixins";

export const NextStateFile = withStateFileTemplateMixin(
  withClassDefinitionMixin(
    withDynamicDependenciesMixin(withPublicInterfaceMixin(ProjectFile))
  )
);
export type NextStateFile = Mixin<
  typeof withStateFileTemplateMixin<typeof NextStateFile>
>;
