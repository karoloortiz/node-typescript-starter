import { UniqueEntityID, Entity } from "../../../../../ddd-primitives";
import { CmsEntity } from "../cmsEntity/cmsEntity";

export type CmsFieldRelationType =
  | "oneToOne"
  | "oneToMany"
  | "oneToAll"
  | "manyToMany";

export type CmsFieldRelationDirection = "unidirectional" | "bidirectional";

export interface CmsFieldRelationProps {
  entity: CmsEntity;
  type: CmsFieldRelationType;
  direction: CmsFieldRelationDirection;
}

export class CmsFieldRelation extends Entity<CmsFieldRelationProps> {
  public constructor(props: CmsFieldRelationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  public get entity(): CmsEntity {
    return this.props.entity;
  }

  public get type(): CmsFieldRelationType {
    return this.props.type;
  }

  public get direction(): CmsFieldRelationDirection {
    return this.props.direction;
  }
}
