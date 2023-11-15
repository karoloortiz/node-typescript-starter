import { UniqueEntityID } from "../../../../../../ddd-primitives";
import { StrapiComponent } from "../../../../adapters/strapi/models/strapiComponent";
import { StrapiProject } from "../../../../adapters/strapi/models/strapiProject";
import { StrapiType } from "../../../../adapters/strapi/models/strapiType";

export function createStrapiProject(
  project: {
    singleTypes?: StrapiType[];
    collectionTypes?: StrapiType[];
    components?: StrapiComponent[];
  },
  id?: string
): StrapiProject {
  return new StrapiProject({
    singleTypes: project.singleTypes ?? [],
    collectionTypes: project.collectionTypes ?? [],
    components: project.components ?? [],
  });
}
