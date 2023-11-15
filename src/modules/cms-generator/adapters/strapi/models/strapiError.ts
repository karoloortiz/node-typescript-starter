type StrapiErrorCode =
  | "FIELD_TYPE_NOT_SUPPORTED"
  | "ENTITY_TYPE_NOT_SUPPORTED"
  | "RELATION_TYPE_NOT_SUPPORTED";

export class StrapiError {
  private _code: StrapiErrorCode;
  private _message: string;

  constructor(code: StrapiErrorCode, message?: string) {
    this._code = code;
    this._message = message;
  }

  public get code(): StrapiErrorCode {
    return this._code;
  }

  public get message(): string {
    return this._message;
  }

  public toString(): string {
    return `${this.code}: ${this._message}`;
  }
}
