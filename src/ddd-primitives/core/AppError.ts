
import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export namespace AppError {
  export class UnexpectedError extends UseCaseError {
    public constructor (err: any) {
      super(`An unexpected error occurred': ${err}.`)
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create (err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}