export abstract class DomainError<T extends String> {
  public type: T;
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
