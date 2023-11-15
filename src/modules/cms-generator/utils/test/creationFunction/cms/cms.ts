import { UniqueEntityID } from "../../../../../../ddd-primitives";
import { Cms } from "../../../../domain/entities/cms/cms";
import { CmsEntity } from "../../../../domain/entities/cmsEntity/cmsEntity";
import { CmsFieldsGroup } from "../../../../domain/entities/cmsFieldsGroup/cmsFieldsGroup";
import { SharedCmsFieldGroup } from "../../../../domain/entities/sharedCmsFieldGroup/sharedCmsFieldGroup";

export function createCms(
  cms: {
    entities?: CmsEntity[];
    fieldsGroups?: CmsFieldsGroup[];
    sharedFieldsGroups?: SharedCmsFieldGroup[];
  },
  id?: string
): Cms {
  return new Cms(
    {
      entities: cms.entities ?? [],
      fieldsGroups: cms.fieldsGroups ?? [],
      sharedFieldsGroups: cms.sharedFieldsGroups ?? [],
    },
    new UniqueEntityID(id)
  );
}
