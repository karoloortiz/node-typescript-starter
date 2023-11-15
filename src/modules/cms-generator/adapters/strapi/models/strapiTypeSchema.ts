import { StrapiAttributeSchema } from "./strapiAttributeSchema";

export type StrapiTypeKind = "singleType" | "collectionType";
export interface StrapiTypeSchema {
  kind: StrapiTypeKind;
  collectionName: string;
  info: {
    singularName: string;
    pluralName: string;
    displayName: string;
    description: string;
  };
  options: {
    draftAndPublish: boolean;
  };
  pluginOptions: {
    i18n: {
      localized: boolean;
    };
  };
  attributes: { [field: string]: StrapiAttributeSchema };
}
