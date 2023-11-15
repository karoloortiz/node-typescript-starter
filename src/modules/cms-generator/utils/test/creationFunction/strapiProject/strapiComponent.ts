import { UniqueEntityID } from "../../../../../../ddd-primitives";
import { StrapiComponent } from "../../../../adapters/strapi/models/strapiComponent";
import { StrapiComponentSchema } from "../../../../adapters/strapi/models/strapiComponentSchema";
import { createStrapiComponentSchema } from "./strapiComponentSchema";

export function createStrapiComponent(
  component: {
    name?: string;
    schema?: StrapiComponentSchema;
    parentFolderName?: string;
  },
  id?: string
): StrapiComponent {
  return new StrapiComponent(
    {
      name: component.name ?? "component_name",
      parentFolderName: component.parentFolderName ?? "parent_folder_name",
      schema:
        component.schema ??
        createStrapiComponentSchema({
          collectionName: component.name + "s" ?? "component_names",
          displayName: component.name.toUpperCase() ?? "Component Display Name",
        }),
    },
    new UniqueEntityID(id)
  );
}
