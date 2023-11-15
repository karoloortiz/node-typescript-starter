import { StrapiAttributeSchema } from "../../../../adapters/strapi/models/strapiAttributeSchema";
import { StrapiComponentSchema } from "../../../../adapters/strapi/models/strapiComponentSchema";

export function createStrapiComponentSchema(schema?: {
  collectionName?: string;
  displayName?: string;
  attributes?: { [field: string]: StrapiAttributeSchema };
}): StrapiComponentSchema {
  return {
    collectionName: schema.collectionName ?? "collection_name",
    info: {
      displayName: schema.displayName ?? "display_name",
    },
    attributes: schema.attributes ?? {},
  };
}
