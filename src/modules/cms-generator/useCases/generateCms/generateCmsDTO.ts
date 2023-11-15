export type FieldTypeDTO =
  | "text"
  | "longText"
  | "number"
  | "image"
  | "richText"
  | "relation";

export type ConceptTypeDTO = "single" | "multi";

export type RelationTypeDTO = "one" | "some" | "all";

export interface GenerateCmsDTO {
  concepts: ConceptDTO[];
  pages: PageDTO[];
  sections: SectionDTO[];
}

export interface ConceptDTO {
  id: string;
  name: string;
  type: ConceptTypeDTO;
  fields: FieldDTO[];
}

export interface FieldDTO {
  name: string;
  type: FieldTypeDTO;
  relation?: RelationDTO;
}

export interface RelationDTO {
  concept: string;
  type: RelationTypeDTO;
}

export interface PageDTO {
  id: string;
  name: string;
  isDynamic: boolean;
  relatedConcept?: string;
  fields: FieldDTO[];
  sections: string[];
}

export interface SectionDTO {
  id: string;
  name: string;
  fields: FieldDTO[];
}
