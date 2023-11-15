import { SnappieError } from "../../../../../ddd-primitives/core/SnappieError";

export namespace FEProjectError {
  export class FileNotFound extends SnappieError<"FileNotFound"> {
    constructor() {
      super("FileNotFound");
    }
  }

  export class DuplicatedFile extends SnappieError<"DuplicatedFile"> {
    constructor() {
      super("DuplicatedFile");
    }
  }
}
