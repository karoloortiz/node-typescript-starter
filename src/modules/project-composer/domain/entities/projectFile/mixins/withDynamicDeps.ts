import { FullPath } from "../../../valueObjects/fullPath";
import { createMixinFunction, AnyConstructor } from "../../../shared/mixins";
import { FileContentWithMutator } from "../../fileContent/fileContentMutator";
import {
  FileWithDynamicDeps,
  FileWithPublicInterface,
  ProjectFile,
} from "../projectFile";

interface WithDynamicDependenciesProps {}

export const withDynamicDependenciesMixin = createMixinFunction((Base) => {
  class WithDynamicDependencies extends (Base as unknown as AnyConstructor<ProjectFile>) {
    protected content: FileContentWithMutator;
    private _dependencies: {
      originalImport?: {
        path: string;
        namedImports: string[];
        importStatement: string;
      };
      externalFile?: FileWithPublicInterface;
    }[] = [];
    constructor(props: WithDynamicDependenciesProps) {
      super(props);
      this.content = new FileContentWithMutator({
        name: this.props.fullPath,
        sourceCode: this.props.content,
      });
      this.extractImports();
    }

    private extractImports() {
      const imports = this.content.getImports();
      for (const importStatement of imports) {
        const rawImportPath = importStatement.getModuleSpecifier().getText();
        const rawNamedImports = importStatement.getNamedImports();
        const path = rawImportPath.slice(1, rawImportPath.length - 1);

        this._dependencies.push({
          originalImport: {
            importStatement: importStatement.getText(),
            path: path,
            namedImports: rawNamedImports.map((n) => n.getText()),
          },
        });
      }
    }

    public addDependency(file: FileWithPublicInterface) {
      if (!this._dependencies.find((d) => d.externalFile === file)) {
        this._dependencies.push({ externalFile: file });
      }
    }

    public injectDependenciesFrom(files: FileWithPublicInterface[]) {
      for (const dependency of this._dependencies) {
        if (dependency.originalImport && !dependency.externalFile) {
          const file = files.find((f) => {
            const importsAreIncludedInFile =
              dependency.originalImport.namedImports.every((i) =>
                f.getNamedExports().includes(i)
              );
            const pathIsSimilar = f.getFullPath().includes(
              new FullPath({
                fullPath: dependency.originalImport.path,
              }).name
            );
            if (importsAreIncludedInFile && pathIsSimilar) {
              return true;
            }
            return false;
          });
          if (file) {
            dependency.externalFile = file;
          }
        }
      }
    }

    public getDependencies(): ProjectFile[] {
      return (
        this._dependencies
          .filter((d) => d.externalFile)
          .map((d) => d.externalFile) ?? []
      );
    }

    public async getSourceCode(): Promise<string> {
      for (const dep of this._dependencies) {
        if (dep.externalFile) {
          if (dep.originalImport) {
            this.content.setImportPath(
              dep.originalImport.importStatement,
              dep.externalFile.getAbsoluteFullPath()
            );
          }
          if (!dep.originalImport) {
            this.content.addImportStatement(
              dep.externalFile.getNamedExports(),
              dep.externalFile.getAbsoluteFullPath()
            );
          }
        }
      }
      return super.getSourceCode();
    }

    public async hasSourceCode(sourceCode: string): Promise<boolean> {
      for (const dep of this._dependencies) {
        if (dep.externalFile) {
          if (dep.originalImport) {
            this.content.setImportPath(
              dep.originalImport.importStatement,
              dep.externalFile.getAbsoluteFullPath()
            );
          }
          if (!dep.originalImport) {
            this.content.addImportStatement(
              dep.externalFile.getNamedExports(),
              dep.externalFile.getAbsoluteFullPath()
            );
          }
        }
      }
      return super.hasSourceCode(sourceCode);
    }
  }
  return WithDynamicDependencies;
});
