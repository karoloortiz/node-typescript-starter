import { UniqueEntityID, Entity } from "../../../../../ddd-primitives";
import { CmsField } from "../../valueObjects/cmsField/cmsField";
import {
  CmsFieldsGroup,
  RepeatableFieldsGroup,
} from "../cmsFieldsGroup/cmsFieldsGroup";

export type CmsEntityType = "single" | "multi";

export interface CmsEntityProps {
  name: string;
  displayName: string;
  type: CmsEntityType;
  fields: CmsField[];
  fieldsGroups: RepeatableFieldsGroup[];
  relatedEntity?: CmsEntity;
}

export class CmsEntity extends Entity<CmsEntityProps> {
  public constructor(props: CmsEntityProps, id?: UniqueEntityID) {
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

  public get type(): CmsEntityType {
    return this.props.type;
  }

  public get fields(): CmsField[] {
    return this.props.fields;
  }

  public get fieldsGroups(): RepeatableFieldsGroup[] {
    return this.props.fieldsGroups;
  }

  public get relatedEntity(): CmsEntity {
    return this.props.relatedEntity;
  }

  public getField(name: string): CmsField {
    return this.fields.find((field) => field.name == name);
  }

  public getFieldsGroup(id: string): RepeatableFieldsGroup {
    return this.fieldsGroups.find(
      (fieldsGroup) => fieldsGroup.group.id.toString() == id
    );
  }

  public hasRelationField(): boolean {
    return this.fields.some((field) => field.type == "relation");
  }

  public getRelationFields(): CmsField[] {
    return this.fields.filter((field) => field.type == "relation");
  }

  public addField(field: CmsField): void {
    this.props.fields.push(field);
  }

  public addFieldGroup(fieldGroup: RepeatableFieldsGroup): void {
    this.props.fieldsGroups.push(fieldGroup);
  }
}
