import { UniqueEntityID } from "../../../../../../ddd-primitives";
import { StrapiType } from "../../../../adapters/strapi/models/strapiType";
import { StrapiTypeSchema } from "../../../../adapters/strapi/models/strapiTypeSchema";
import { createStrapiTypeSchema } from "./strapiTypeSchema";

export function createStrapiType(
  type: {
    name?: string;
    schema?: StrapiTypeSchema;
  },
  id?: string
): StrapiType {
  return new StrapiType(
    {
      name: type.name ?? "type_name",
      schema:
        type.schema ??
        createStrapiTypeSchema({
          name: type.name,
          displayName: type.name && type.name.toUpperCase(),
        }),
    },
    new UniqueEntityID(id)
  );
}
