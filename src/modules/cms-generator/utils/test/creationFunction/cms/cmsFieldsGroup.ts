import { UniqueEntityID } from "../../../../../../ddd-primitives";
import { CmsEntity } from "../../../../domain/entities/cmsEntity/cmsEntity";
import {
  RepeatableFieldsGroup,
  CmsFieldsGroup,
} from "../../../../domain/entities/cmsFieldsGroup/cmsFieldsGroup";
import { SharedCmsFieldGroup } from "../../../../domain/entities/sharedCmsFieldGroup/sharedCmsFieldGroup";
import { CmsField } from "../../../../domain/valueObjects/cmsField/cmsField";

export function createCmsFieldsGroup(
  fieldsGroup: {
    name?: string;
    displayName?: string;
    fields?: CmsField[];
    fieldsGroups?: RepeatableFieldsGroup[];
    parent?: CmsEntity | CmsFieldsGroup;
    sharedFieldsGroup?: SharedCmsFieldGroup;
  },
  id?: string
): CmsFieldsGroup {
  return new CmsFieldsGroup(
    {
      name: fieldsGroup.name ?? "fieldsGroup_name",
      displayName: fieldsGroup.displayName ?? "FieldsGroup Name",
      fields: fieldsGroup.fields ?? [],
      fieldsGroups: fieldsGroup.fieldsGroups ?? [],
      parent: fieldsGroup.parent,
      sharedFieldsGroup: fieldsGroup.sharedFieldsGroup,
    },
    new UniqueEntityID(id)
  );
}
