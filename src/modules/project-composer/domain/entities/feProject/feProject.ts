import { Entity } from "../../shared/entity";
import { FolderName } from "../../valueObjects/folderName";
import { ProjectFile } from "../projectFile/projectFile";
import { FEProjectError } from "./feProjectError";

export interface FEProjectProps {
  name: string;
}

export class FEProject extends Entity<FEProjectProps> {
  private _name: FolderName;
  protected _files: ProjectFile[] = [];
  constructor(props: FEProjectProps, id?: string) {
    super(props, id);
    this._name = new FolderName({ value: props.name });
  }

  public get name(): string {
    return this._name.getValue();
  }

  public get files() {
    return this._files;
  }

  public getFile(path: string): ProjectFile {
    const f = this._files.find((f) => f.getFullPath() === path);
    if (!f) {
      throw new FEProjectError.FileNotFound();
    }
    return f;
  }

  protected addFile(file: ProjectFile) {
    if (this.fileExists(file)) {
      throw new FEProjectError.DuplicatedFile();
    }
    this._files.push(file);
  }

  protected fileExists(file: ProjectFile): boolean {
    const sameFile = this._files.find((f) => {
      return f.getFullPath() == file.getFullPath();
    });

    if (sameFile) return true;
    return false;
  }
}
