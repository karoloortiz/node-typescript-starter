import { ValueObject } from "../../../../../ddd-primitives";
import { CmsEntity } from "../../entities/cmsEntity/cmsEntity";
import { CmsFieldRelation } from "../../entities/cmsFieldRelation/cmsFieldRelation";

export type CmsFieldType =
  | "text"
  | "longText"
  | "number"
  | "image"
  | "richText"
  | "relation";

export interface CmsFieldProps {
  name: string;
  type: CmsFieldType;
  relation?: CmsFieldRelation;
}

export class CmsField extends ValueObject<CmsFieldProps> {
  public constructor(props: CmsFieldProps) {
    super(props);
  }

  public get name(): string {
    return this.props.name;
  }

  public get type(): CmsFieldType {
    return this.props.type;
  }

  public get relation(): CmsFieldRelation {
    return this.props.relation;
  }

  public addRelation(relation: CmsFieldRelation): void {
    this.props.relation = relation;
  }
}
