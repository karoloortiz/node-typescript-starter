import { StrapiAttributeSchema } from "../../../../adapters/strapi/models/strapiAttributeSchema";
import {
  StrapiTypeKind,
  StrapiTypeSchema,
} from "../../../../adapters/strapi/models/strapiTypeSchema";

export function createStrapiTypeSchema(schema: {
  kind?: StrapiTypeKind;
  collectionName?: string;
  name?: string;
  displayName?: string;
  attributes?: { [field: string]: StrapiAttributeSchema };
}): StrapiTypeSchema {
  return {
    kind: schema.kind ?? "singleType",
    collectionName: schema.collectionName ?? "collection_names",
    info: {
      singularName: schema.name ?? "type_name",
      pluralName: schema.name + "s" ?? "type_names",
      displayName: schema.displayName,
      description: "",
    },
    options: {
      draftAndPublish: true,
    },
    pluginOptions: {
      i18n: {
        localized: true,
      },
    },
    attributes: schema.attributes ?? {},
  };
}
