import { UniqueEntityID, Entity } from "../../../../../ddd-primitives";
import { CmsEntity, CmsEntityType } from "../cmsEntity/cmsEntity";
import { CmsFieldsGroup } from "../cmsFieldsGroup/cmsFieldsGroup";
import { SharedCmsFieldGroup } from "../sharedCmsFieldGroup/sharedCmsFieldGroup";

export interface CmsProps {
  entities: CmsEntity[];
  fieldsGroups: CmsFieldsGroup[];
  sharedFieldsGroups: SharedCmsFieldGroup[];
}

export class Cms extends Entity<CmsProps> {
  public constructor(props: CmsProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public get entities(): CmsEntity[] {
    return this.props.entities;
  }

  public get fieldsGroups(): CmsFieldsGroup[] {
    return this.props.fieldsGroups;
  }

  public getEntity(id: string): CmsEntity {
    return this.entities.find((entity) => entity.id.toString() == id);
  }

  public getFieldsGroup(id: string): CmsFieldsGroup {
    return this.fieldsGroups.find(
      (fieldGroup) => fieldGroup.id.toString() == id
    );
  }

  public getSingleTypeEntities(): CmsEntity[] {
    return this.getEntitiesByType("single");
  }

  public getMultiTypeEntities(): CmsEntity[] {
    return this.getEntitiesByType("multi");
  }

  private getEntitiesByType(type: CmsEntityType): CmsEntity[] {
    return this.props.entities.filter((e) => e.type == type);
  }
}
