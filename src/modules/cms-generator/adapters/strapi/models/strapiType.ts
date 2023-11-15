import { Entity, UniqueEntityID } from "../../../../../ddd-primitives";
import { CmsEntity } from "../../../domain/entities/cmsEntity/cmsEntity";
import { StrapiTypeSchema } from "./strapiTypeSchema";

interface StrapiTypeProps {
  name: string;
  schema: StrapiTypeSchema;
}

export class StrapiType extends Entity<StrapiTypeProps> {
  public constructor(props: StrapiTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get schema(): StrapiTypeSchema {
    return this.props.schema;
  }
}
