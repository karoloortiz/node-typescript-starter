import { StrapiAttributeSchema } from "./strapiAttributeSchema";

export interface StrapiComponentSchema {
  collectionName: string;
  info: {
    displayName: string;
  };
  attributes: { [field: string]: StrapiAttributeSchema };
}
