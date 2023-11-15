import { UniqueEntityID, Entity } from "../../../../../ddd-primitives";

export interface SharedCmsFieldGroupProps {}

export class SharedCmsFieldGroup extends Entity<SharedCmsFieldGroupProps> {
  public constructor(props: SharedCmsFieldGroupProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public get id(): UniqueEntityID {
    return this._id;
  }
}
