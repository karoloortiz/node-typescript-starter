export interface PageUIProps {
  sections: Section[];
  name: string;
}

export interface Section {
  name: string;
  groups: MacroGroup[];
}

export interface MacroGroup {
  groups: MacroGroup[] | MicroGroup[];
}

export interface MicroGroup {
  fields: Field[];
}

export interface Field {
  name: string;
  evidence_level: number;
  depth_level: number;
  type: "text_short" | "text_long" | "text_medium" | "price";
  isList?: boolean;
  isInput?: boolean;
  isFieldGroup?: boolean;
  fields: Field[];
}
