import {
  AppError,
  Entity,
  UniqueEntityID,
  UseCase,
  Monad,
} from "../../../../ddd-primitives";

import { Cms } from "../../domain/entities/cms/cms";
import { CmsEntity } from "../../domain/entities/cmsEntity/cmsEntity";
import { CmsFieldRelation } from "../../domain/entities/cmsFieldRelation/cmsFieldRelation";
import { CmsFieldsGroup } from "../../domain/entities/cmsFieldsGroup/cmsFieldsGroup";
import { CmsField } from "../../domain/valueObjects/cmsField/cmsField";
import {
  ConceptDTO,
  GenerateCmsDTO,
  PageDTO,
  SectionDTO,
} from "./generateCmsDTO";
import { GenerateCmsError } from "./generateCmsError";
import { GenerateCmsResponse } from "./generateCmsResponse";

export class GenerateCms
  implements UseCase<GenerateCmsDTO, GenerateCmsResponse>
{
  async execute(request: GenerateCmsDTO): Promise<GenerateCmsResponse> {
    const { concepts, pages, sections } = request;

    try {
      // const conceptEntities = this.createEntitiesFromConcepts(concepts);
      // this.addEntitiesToRelationFields(conceptEntities, concepts);
      // const fieldsGroups = this.createFieldsGroups(sections);
      // const pageEntities = this.createEntitiesFromPages(
      //   pages,
      //   conceptEntities,
      //   fieldsGroups
      // );
      // const entities = [...conceptEntities, ...pageEntities];
      // const cms = new Cms({
      //   entities,
      //   fieldsGroups,
      //   sharedFieldsGroups: [],
      // });
      // return Monad.Result.ok(cms);
    } catch (error) {
      return Monad.Result.fail(new AppError.UnexpectedError(error));
    }
  }

  // private createFieldsGroups(sections: SectionDTO[]) {
  //   return sections.map(
  //     (s) =>
  //       new CmsFieldsGroup(
  //         {
  //           name: s.name,
  //           fields: s.fields.map(
  //             (f) =>
  //               new CmsField({
  //                 name: f.name,
  //                 type: f.type,
  //               })
  //           ),
  //           fieldsGroups: [],
  //           parent: null,
  //         },
  //         new UniqueEntityID(s.id)
  //       )
  //   );
  // }

  // private addEntitiesToRelationFields(
  //   conceptEntities: CmsEntity[],
  //   concepts: ConceptDTO[]
  // ) {
  //   for (let concept of concepts) {
  //     const entity = this.getEntityById(conceptEntities, concept.id);

  //     if (entity.hasRelationField()) {
  //       const relationFields = entity.getRelationFields();

  //       for (let field of relationFields) {
  //         const fieldDTO = this.getConceptFieldByName(concept, field.name);

  //         const relatedEntity = this.getEntityById(
  //           conceptEntities,
  //           fieldDTO.relation.concept
  //         );

  //         field.addRelation(
  //           new CmsFieldRelation({
  //             entity: relatedEntity,
  //             type: fieldDTO.relation.type,
  //           })
  //         );
  //       }
  //     }
  //   }
  // }

  // private getEntityById(conceptEntities: CmsEntity[], id: string) {
  //   return conceptEntities.find((e) => e.id.toString() == id);
  // }

  // private getConceptFieldByName(concept: ConceptDTO, name: string) {
  //   return concept.fields.find((f) => f.name == name);
  // }

  // private createEntitiesFromConcepts(concepts: ConceptDTO[]) {
  //   return concepts.map(
  //     (c) =>
  //       new CmsEntity(
  //         {
  //           name: c.name,
  //           type: c.type,
  //           fields: c.fields.map(
  //             (f) =>
  //               new CmsField({
  //                 name: f.name,
  //                 type: f.type,
  //               })
  //           ),
  //           fieldsGroups: [],
  //         },
  //         new UniqueEntityID(c.id)
  //       )
  //   );
  // }

  // private createEntitiesFromPages(
  //   pages: PageDTO[],
  //   concepts: CmsEntity[],
  //   fieldsGroups: CmsFieldsGroup[]
  // ) {
  //   return pages.map(
  //     (page) =>
  //       new CmsEntity(
  //         {
  //           name: page.name,
  //           type: "single",
  //           relatedEntity:
  //             page.relatedConcept &&
  //             concepts.find((c) => c.id.toString() == page.relatedConcept),
  //           fields: page.fields.map(
  //             (f) =>
  //               new CmsField({
  //                 name: f.name,
  //                 type: f.type,
  //                 relation:
  //                   f.relation &&
  //                   new CmsFieldRelation({
  //                     entity: this.getEntityById(concepts, f.relation.concept),
  //                     type: f.relation.type,
  //                   }),
  //               })
  //           ),
  //           fieldsGroups: fieldsGroups
  //             .filter((fg) => page.sections.includes(fg.id.toString()))
  //             .map((fg) => ({
  //               group: fg,
  //               isRepeated: false,
  //             })),
  //         },
  //         new UniqueEntityID(page.id)
  //       )
  //   );
  // }
}
