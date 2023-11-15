import { withClassDefinitionMixin } from "./mixins/withClassDefinition";
import { withDynamicDependenciesMixin } from "./mixins/withDynamicDeps";
import { FullPath } from "./../../valueObjects/fullPath";
import { FileContent } from "../fileContent/fileContent";
import { Entity } from "../../shared/entity";
import path from "node:path/posix";
import { withPublicInterfaceMixin } from "./mixins/withPublicInterface";
import { Mixin } from "../../shared/mixins";

interface ProjectFileProps {
  fullPath?: string;
  content?: string;
}

export class ProjectFile extends Entity<ProjectFileProps> {
  protected path: FullPath;
  protected content: FileContent;

  constructor(props: ProjectFileProps, id?: string) {
    super(props, id);
    this.path = new FullPath({ fullPath: props.fullPath });
    this.content = new FileContent({
      sourceCode: props.content ?? "",
      name: this.path.name ?? "/newFile.ts",
    });
  }

  public getFullPath(): string {
    return this.path.fullPath;
  }

  public getName(): string {
    return this.path.name;
  }

  public getNameWithoutExtension(): string {
    return this.path.nameWithoutExtension;
  }

  public getPath(): string {
    return this.path.path;
  }

  public getSourceCode(): string {
    return this.content.sourceCode;
  }

  public hasSourceCode(sourceCode: string): boolean {
    return this.content.hasSourceCode(sourceCode);
  }

  public getRelativePathWithRespectTo(file: ProjectFile): string {
    const fromPath = file.getPath();
    const toPath = this.getFullPath();
    return path.relative(fromPath, toPath);
  }

  public getRelativePathTo(file: ProjectFile): string {
    const toPath = "/ga/ra" + file.getFullPath();
    const fromPath = "/ga/ra" + this.getFullPath();
    return path.relative(fromPath, toPath);
  }

  public getAbsoluteFullPath(): string {
    return this.path.fullPath.slice(1);
  }
}

export const FileWithDynamicDeps = withDynamicDependenciesMixin(ProjectFile);
export type FileWithDynamicDeps = Mixin<
  typeof withDynamicDependenciesMixin<typeof ProjectFile>
>;

export const FileWithClassDef = withClassDefinitionMixin(ProjectFile);
export type FileWithClassDef = Mixin<
  typeof withClassDefinitionMixin<typeof ProjectFile>
>;

export const FileWithPublicInterface = withPublicInterfaceMixin(ProjectFile);
export type FileWithPublicInterface = Mixin<
  typeof withPublicInterfaceMixin<typeof ProjectFile>
>;

export const PublicFileWithDeps = withDynamicDependenciesMixin(
  FileWithPublicInterface
);
export type PublicFileWithDeps = Mixin<
  typeof withDynamicDependenciesMixin<typeof PublicFileWithDeps>
>;
