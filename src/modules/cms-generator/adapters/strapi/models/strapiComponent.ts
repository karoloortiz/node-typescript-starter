import { UniqueEntityID, Entity } from "../../../../../ddd-primitives";
import { StrapiComponentSchema } from "./strapiComponentSchema";

export interface StrapiComponentProps {
  name: string;
  schema: StrapiComponentSchema;
  parentFolderName: string;
}

export class StrapiComponent extends Entity<StrapiComponentProps> {
  public constructor(props: StrapiComponentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  public get schema(): StrapiComponentSchema {
    return this.props.schema;
  }

  public get name(): string {
    return this.props.name;
  }

  public get parentFolderName(): string {
    return this.props.parentFolderName;
  }

  public get fullName(): string {
    return `${this.parentFolderName}.${this.props.name}`;
  }
}
