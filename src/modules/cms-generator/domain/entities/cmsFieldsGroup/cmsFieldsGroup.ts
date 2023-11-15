import { UniqueEntityID, Entity } from "../../../../../ddd-primitives";
import { CmsField } from "../../valueObjects/cmsField/cmsField";
import { CmsEntity } from "../cmsEntity/cmsEntity";
import { SharedCmsFieldGroup } from "../sharedCmsFieldGroup/sharedCmsFieldGroup";

export interface RepeatableFieldsGroup {
  group: CmsFieldsGroup;
  isRepeated: boolean;
}

export interface CmsFieldsGroupProps {
  name: string;
  displayName: string;
  fields: CmsField[];
  fieldsGroups: RepeatableFieldsGroup[];
  parent: CmsEntity | CmsFieldsGroup;
  sharedFieldsGroup?: SharedCmsFieldGroup;
}

export class CmsFieldsGroup extends Entity<CmsFieldsGroupProps> {
  public constructor(props: CmsFieldsGroupProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get displayName(): string {
    return this.props.displayName;
  }

  public get fields(): CmsField[] {
    return this.props.fields;
  }

  public get fieldsGroups(): RepeatableFieldsGroup[] {
    return this.props.fieldsGroups;
  }

  public get parent(): CmsEntity | CmsFieldsGroup {
    return this.props.parent;
  }

  public get sharedFieldsGroup(): SharedCmsFieldGroup {
    return this.props.sharedFieldsGroup;
  }

  public getField(name: string): CmsField {
    return this.fields.find((f) => f.name == name);
  }

  public addFieldGroup(repeatableFieldsGroup: RepeatableFieldsGroup): void {
    this.props.fieldsGroups.push(repeatableFieldsGroup);
  }
}
