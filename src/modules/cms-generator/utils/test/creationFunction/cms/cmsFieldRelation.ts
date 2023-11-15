import { UniqueEntityID } from "../../../../../../ddd-primitives";
import { CmsEntity } from "../../../../domain/entities/cmsEntity/cmsEntity";
import {
  CmsFieldRelationType,
  CmsFieldRelationDirection,
  CmsFieldRelation,
} from "../../../../domain/entities/cmsFieldRelation/cmsFieldRelation";

export function createCmsFieldRelation(
  relation: {
    entity?: CmsEntity;
    type?: CmsFieldRelationType;
    direction?: CmsFieldRelationDirection;
  },
  id?: string
): CmsFieldRelation {
  return new CmsFieldRelation(
    {
      entity: relation.entity,
      type: relation.type,
      direction: relation.direction,
    },
    new UniqueEntityID(id)
  );
}
