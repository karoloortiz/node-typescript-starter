export type StrapiAttributeType =
  | "string"
  | "text"
  | "richtext"
  | "media"
  | "relation"
  | "component";

export type StrapiAttributeRelationType =
  | "oneToOne"
  | "oneToMany"
  | "manyToMany";

export interface StrapiAttributeSchema {
  type: StrapiAttributeType;
  required?: boolean;
  pluginOptions?: {
    i18n: {
      localized: boolean;
    };
  };
  allowedTypes?: string[];
  repeatable?: boolean;
  component?: string;
  relation?: StrapiAttributeRelationType;
  target?: string;
  inversedBy?: string;
  mappedBy?: string;
}
