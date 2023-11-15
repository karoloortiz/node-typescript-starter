import { CmsFieldRelation } from "../../../../domain/entities/cmsFieldRelation/cmsFieldRelation";
import {
  CmsFieldType,
  CmsField,
} from "../../../../domain/valueObjects/cmsField/cmsField";

export function createCmsField(field: {
  name?: string;
  type?: CmsFieldType;
  relation?: CmsFieldRelation;
}): CmsField {
  return new CmsField({
    name: field.name ?? "field_name",
    type: field.type ?? "text",
    relation: field.relation,
  });
}
