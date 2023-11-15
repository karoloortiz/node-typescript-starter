export interface NextReposProps {
  pages: Page[];
}

export interface Page {
  name: string;
  isDynamic: boolean;
  sections: Section[];
  dataValues: DataValue[];
}

export interface Section {
  name: string;
  fields: Field[];
}
export type Field =
  | SingleField
  | FieldGroup
  | (SingleField & Listable)
  | (FieldGroup & Listable);

export interface DataValue {
  dataModelId: string;
  value: string | DataValue[][];
}

export interface BaseField {
  name: string;
  isList: boolean;
}

export interface Listable extends BaseField{
  isList: true;
  dataModelId: string;
  fields: Field[];
}

export interface SingleField extends BaseField {
  type: string;

  dataStructure: {
    name: string;
    type: string;
    dataModelId: string;
  }[];
}

export interface FieldGroup extends BaseField {
  fields: Field[];
}

export function isSingleField(props: any): props is SingleField {
  const fields = Object.keys(props);

  return fields.includes("type");
}

export function isFieldGroup(props: any): props is FieldGroup {
  const fields = Object.keys(props);

  return fields.includes("fields");
}

export function isListable(props: any): props is Listable {
  const fields = Object.keys(props);

  if (fields.includes("isList")) {
    return props["isList"];
  } else {
    return false;
  }
}
