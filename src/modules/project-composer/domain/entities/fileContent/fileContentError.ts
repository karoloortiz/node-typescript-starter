import { SnappieError } from "../../../../../ddd-primitives/core/SnappieError";

export namespace FileContentError {
  export class IncorrectPlaceholderValues extends SnappieError<"IncorrectPlaceholderValues"> {
    constructor() {
      super("IncorrectPlaceholderValues");
    }
  }
}
