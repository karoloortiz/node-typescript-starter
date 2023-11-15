import { ValueObject } from "../shared/valueObject";

export interface FullPathProps {
  fullPath: string;
}
export class FullPath extends ValueObject<FullPathProps> {
  private _name: string;
  private _path: string;
  private _extension: string;
  constructor(props: FullPathProps) {
    super(props);

    const regex = /(?<path>\/.+\/)?\/?(?<file>[^\.]+)\.(?<ext>[^\)]+)/;

    if (props.fullPath[0] != "/") {
      props.fullPath = "/" + props.fullPath;
    }

    const matches = props.fullPath.match(regex);
    const { path, file, ext } = matches.groups;
    this._name = file;
    this._extension = ext;
    this._path = this.normalizePath(path);
  }
  get name() {
    return `${this._name}.${this._extension}`;
  }

  get path() {
    return this._path;
  }

  get nameWithoutExtension() {
    return this._name;
  }

  get fullPath() {
    return `${this._path}/${this._name}.${this._extension}`;
  }

  get extension() {
    return this._extension;
  }

  private normalizePath(path): string {
    if (!path) {
      return "";
    }

    return path.slice(0, path.length - 1);
  }
}
