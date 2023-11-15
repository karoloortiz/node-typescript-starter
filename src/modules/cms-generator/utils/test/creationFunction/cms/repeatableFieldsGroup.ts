import {
  CmsFieldsGroup,
  RepeatableFieldsGroup,
} from "../../../../domain/entities/cmsFieldsGroup/cmsFieldsGroup";

export function createRepeatableFieldsGroup(fieldsGroup: {
  group: CmsFieldsGroup;
  isRepeated?: boolean;
}): RepeatableFieldsGroup {
  return {
    group: fieldsGroup.group,
    isRepeated: fieldsGroup.isRepeated ?? false,
  };
}
