import { UniqueEntityID } from "../../../../../../ddd-primitives";
import {
  CmsEntity,
  CmsEntityType,
} from "../../../../domain/entities/cmsEntity/cmsEntity";
import { RepeatableFieldsGroup } from "../../../../domain/entities/cmsFieldsGroup/cmsFieldsGroup";
import { CmsField } from "../../../../domain/valueObjects/cmsField/cmsField";

export function createCmsEntity(
  entity: {
    name?: string;
    displayName?: string;
    type?: CmsEntityType;
    fields?: CmsField[];
    fieldsGroups?: RepeatableFieldsGroup[];
    relatedEntity?: CmsEntity;
  },
  id?: string
): CmsEntity {
  return new CmsEntity(
    {
      name: entity.name ?? "entity_name",
      displayName: entity.displayName ?? "Entity Name",
      type: entity.type ?? "single",
      fields: entity.fields ?? [],
      fieldsGroups: entity.fieldsGroups ?? [],
      relatedEntity: entity.relatedEntity,
    },
    new UniqueEntityID(id)
  );
}
