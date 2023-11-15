import { DomainError } from "../../../../../ddd-primitives/core/DomainError";

export namespace FileContentError {
  export class IncorrectPlaceholderValues extends DomainError<"IncorrectPlaceholderValues"> {
    constructor() {
      super("IncorrectPlaceholderValues");
    }
  }
}
