import { DomainError } from "../../../../../ddd-primitives/core/DomainError";

export namespace FEProjectError {
  export class FileNotFound extends DomainError<"FileNotFound"> {
    constructor() {
      super("FileNotFound");
    }
  }

  export class DuplicatedFile extends DomainError<"DuplicatedFile"> {
    constructor() {
      super("DuplicatedFile");
    }
  }
}
