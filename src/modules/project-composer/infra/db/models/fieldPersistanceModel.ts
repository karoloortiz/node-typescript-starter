export interface FieldPersistanceModel {
  _id: string;
  name: string;
  isList: boolean;
  isInput: boolean;
  type?: string;
  fields?: FieldPersistanceModel[];
  length?: number;
  prominentElements?: number;
  method?: string;
  isSensitive?: boolean;
  selectionPoolLength?: string;
  action?: string;
  email?: string;
  models?: FieldModelPersistanceModel[];
}

export interface FieldModelPersistanceModel {
  id: string;
  name: string;
  type: string;
  maxLenght?: number;
  format?: "email" | "dateFormat" | "imageUrl" | "phone";
}
