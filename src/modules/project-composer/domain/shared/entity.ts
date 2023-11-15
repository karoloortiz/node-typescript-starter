import { EntityID } from "./entityId";

export class Entity<EntityProps> {
  private _props: EntityProps;
  private _id: EntityID;
  constructor(props: EntityProps, id?: string) {
    this._id = id ? new EntityID(id) : new EntityID();
    this._props = props;
  }

  get id() {
    return this._id;
  }
  get props() {
    return this._props;
  }
}
