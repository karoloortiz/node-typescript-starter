import { FieldPersistanceModel } from "./fieldPersistanceModel";

export interface SectionPersistanceModel {
  _id: string;
  name: string;
  role: string;
  fields: FieldPersistanceModel[];
}
