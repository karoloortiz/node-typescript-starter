import { FullPath } from "../../valueObjects/fullPath";
import { ValueObject } from "../../shared/valueObject";
import { format } from "prettier";

interface FileContentProps {
  sourceCode: string;
  name: string;
}

export class FileContent extends ValueObject<FileContentProps> {
  protected _sourceCode: string;
  protected _fullPath: FullPath;

  constructor(props: FileContentProps) {
    super(props);
    this._sourceCode = props.sourceCode;
    this._fullPath = new FullPath({ fullPath: props.name });
  }

  public async sourceCode(): Promise<string> {
    const result = await format(this._sourceCode, {
      filepath: this.props.name,
    });

    return result;
  }

  public async hasSourceCode(code: string): Promise<boolean> {
    const formattedCode = await format(code, {
      filepath: this.props.name,
      trailingComma: "none",
    });

    const formattedSourceCode = await format(this._sourceCode, {
      filepath: this.props.name,
      trailingComma: "none",
    });

    return formattedSourceCode
      .replaceAll(/[\n\r\s]/g, "")
      .includes(formattedCode.replaceAll(/[\n\r\s]/g, ""));
  }
}
