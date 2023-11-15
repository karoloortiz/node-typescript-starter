import { GenerateCms } from "./generateCms";
import {
  ConceptDTO,
  ConceptTypeDTO,
  FieldDTO,
  FieldTypeDTO,
  GenerateCmsDTO,
  PageDTO,
  RelationDTO,
  RelationTypeDTO,
  SectionDTO,
} from "./generateCmsDTO";

const generateCms = new GenerateCms();

test("Should generate a cms with one entity for each concept", async () => {
  const userConcept = createConceptDTO({
    id: "user",
    type: "multi",
    name: "User",
    fields: [
      createFieldDTO({
        name: "name",
        type: "text",
      }),
      createFieldDTO({
        name: "surname",
        type: "text",
      }),
    ],
  });
  const benefitConcept = createConceptDTO({
    id: "benefit",
    type: "multi",
    name: "Benefit",
    fields: [
      createFieldDTO({
        name: "name",
        type: "text",
      }),
      createFieldDTO({
        name: "description",
        type: "longText",
      }),
      createFieldDTO({
        name: "image",
        type: "image",
      }),
    ],
  });

  const dto = createDTO({
    concepts: [userConcept, benefitConcept],
  });

  const result = await generateCms.execute(dto);

  expect(result.isOk()).toBeTruthy();

  const cms = result.unwrap();

  expect(cms.getEntity(userConcept.id)).toBeTruthy();
  expect(cms.getEntity(userConcept.id).name).toEqual(userConcept.name);
  expect(cms.getEntity(userConcept.id).type).toEqual(userConcept.type);
  expect(cms.getEntity(userConcept.id).fields).toHaveLength(2);

  expect(
    cms.getEntity(userConcept.id).getField(userConcept.fields[0].name)
  ).toBeTruthy();
  expect(
    cms.getEntity(userConcept.id).getField(userConcept.fields[0].name).type
  ).toEqual(userConcept.fields[0].type);

  expect(
    cms.getEntity(userConcept.id).getField(userConcept.fields[1].name)
  ).toBeTruthy();
  expect(
    cms.getEntity(userConcept.id).getField(userConcept.fields[1].name).type
  ).toEqual(userConcept.fields[1].type);

  expect(cms.getEntity(benefitConcept.id)).toBeTruthy();
  expect(cms.getEntity(benefitConcept.id).name).toEqual(benefitConcept.name);
  expect(cms.getEntity(benefitConcept.id).type).toEqual(benefitConcept.type);
  expect(cms.getEntity(benefitConcept.id).fields).toHaveLength(3);

  expect(
    cms.getEntity(benefitConcept.id).getField(benefitConcept.fields[0].name)
  ).toBeTruthy();
  expect(
    cms.getEntity(benefitConcept.id).getField(benefitConcept.fields[0].name)
      .type
  ).toEqual(benefitConcept.fields[0].type);

  expect(
    cms.getEntity(benefitConcept.id).getField(benefitConcept.fields[1].name)
  ).toBeTruthy();
  expect(
    cms.getEntity(benefitConcept.id).getField(benefitConcept.fields[1].name)
      .type
  ).toEqual(benefitConcept.fields[1].type);

  expect(
    cms.getEntity(benefitConcept.id).getField(benefitConcept.fields[2].name)
  ).toBeTruthy();
  expect(
    cms.getEntity(benefitConcept.id).getField(benefitConcept.fields[2].name)
      .type
  ).toEqual(benefitConcept.fields[2].type);
});

test("Should generate a cms with an entity that has a field related to another entity", async () => {
  const benefitConcept = createConceptDTO({
    id: "benefit",
    type: "multi",
    name: "Benefit",
    fields: [
      createFieldDTO({
        name: "name",
        type: "text",
      }),
      createFieldDTO({
        name: "description",
        type: "longText",
      }),
      createFieldDTO({
        name: "image",
        type: "image",
      }),
    ],
  });
  const personaConcept = createConceptDTO({
    id: "persona",
    type: "multi",
    name: "Persona",
    fields: [
      createFieldDTO({
        name: "name",
        type: "text",
      }),
      createFieldDTO({
        name: "benefits",
        type: "relation",
        relation: createRelationDTO({
          concept: benefitConcept.id,
          type: "one",
        }),
      }),
    ],
  });

  const dto = createDTO({
    concepts: [personaConcept, benefitConcept],
  });

  const result = await generateCms.execute(dto);

  expect(result.isOk()).toBeTruthy();

  const cms = result.unwrap();

  expect(cms.getEntity("persona").getField("benefits").type).toEqual(
    "relation"
  );
  expect(cms.getEntity("persona").getField("benefits").relation.entity).toEqual(
    cms.getEntity(benefitConcept.id)
  );
  expect(cms.getEntity("persona").getField("benefits").relation.type).toEqual(
    "one"
  );
});

test("Should generate a cms with a single type entity for each page", async () => {
  const homePage = createPageDTO({
    id: "homePage",
    name: "HomePage",
  });
  const benefitsPage = createPageDTO({
    id: "benefitPage",
    name: "Benefit Page",
  });

  const dto = createDTO({
    pages: [homePage, benefitsPage],
  });

  const result = await generateCms.execute(dto);

  expect(result.isOk()).toBeTruthy();

  const cms = result.unwrap();

  expect(cms.entities).toHaveLength(2);

  expect(cms.getEntity(homePage.id)).toBeTruthy();
  expect(cms.getEntity(homePage.id).name).toEqual(homePage.name);
  expect(cms.getEntity(homePage.id).type).toEqual("single");

  expect(cms.getEntity(benefitsPage.id)).toBeTruthy();
  expect(cms.getEntity(benefitsPage.id).name).toEqual(benefitsPage.name);
  expect(cms.getEntity(benefitsPage.id).type).toEqual("single");
});

test("Should generate a cms with a single type entity for a dynamic page related to a concept", async () => {
  const articleConcept = createConceptDTO({
    id: "article",
    name: "Article",
    type: "multi",
    fields: [
      {
        name: "title",
        type: "text",
      },
      {
        name: "body",
        type: "richText",
      },
    ],
  });

  const articlePage = createPageDTO({
    id: "articlePage",
    name: "Article Page",
    isDynamic: true,
    relatedConcept: "article",
  });

  const dto = createDTO({
    concepts: [articleConcept],
    pages: [articlePage],
  });

  const result = await generateCms.execute(dto);

  expect(result.isOk()).toBeTruthy();

  const cms = result.unwrap();

  expect(cms.getEntity("articlePage")).toBeTruthy();
  expect(cms.getEntity("articlePage").relatedEntity.id.toString()).toEqual(
    articleConcept.id
  );
});

test("Should generate a cms with a single type entity for a page that has two fields", async () => {
  const titleField = createFieldDTO({
    name: "title",
    type: "text",
  });

  const imageField = createFieldDTO({
    name: "image",
    type: "image",
  });

  const page = createPageDTO({
    fields: [titleField, imageField],
  });

  const dto = createDTO({
    pages: [page],
  });

  const result = await generateCms.execute(dto);

  expect(result.isOk()).toBeTruthy();

  const cms = result.unwrap();

  expect(cms.getEntity(page.id).getField(titleField.name)).toBeTruthy();
  expect(cms.getEntity(page.id).getField(titleField.name).type).toEqual(
    titleField.type
  );

  expect(cms.getEntity(page.id).getField(imageField.name)).toBeTruthy();
  expect(cms.getEntity(page.id).getField(imageField.name).type).toEqual(
    imageField.type
  );
});

test("Should generate a cms with a single type entity for a page that has field related to a concept", async () => {
  const employeeConcept = createConceptDTO({
    id: "employee",
    name: "Employee",
    type: "multi",
    fields: [
      {
        name: "name",
        type: "text",
      },
    ],
  });

  const titleField = createFieldDTO({
    name: "employeeOfTheMonthTitle",
    type: "text",
  });

  const employeeOfTheMonthField = createFieldDTO({
    name: "employeeOfTheMonth",
    type: "relation",
    relation: createRelationDTO({ concept: "employee" }),
  });

  const page = createPageDTO({
    fields: [titleField, employeeOfTheMonthField],
  });

  const dto = createDTO({
    concepts: [employeeConcept],
    pages: [page],
  });

  const result = await generateCms.execute(dto);

  expect(result.isOk()).toBeTruthy();

  const cms = result.unwrap();

  expect(
    cms.getEntity(page.id).getField(employeeOfTheMonthField.name)
  ).toBeTruthy();
  expect(
    cms.getEntity(page.id).getField(employeeOfTheMonthField.name).type
  ).toEqual("relation");
  expect(
    cms.getEntity(page.id).getField(employeeOfTheMonthField.name).relation
      .entity
  ).toEqual(cms.getEntity(employeeConcept.id));
});

test("Should generate a cms with a fieldsGroup with two fields for a section with two fields", async () => {
  const titleField = createFieldDTO({
    name: "title",
  });

  const descriptionField = createFieldDTO({
    name: "description",
  });

  const section = createSectionDTO({
    id: "firstSection",
    name: "First Section",
    fields: [titleField, descriptionField],
  });

  const dto = createDTO({
    sections: [section],
  });

  const result = await generateCms.execute(dto);

  expect(result.isOk()).toBeTruthy();

  const cms = result.unwrap();

  expect(cms.fieldsGroups).toHaveLength(1);

  expect(cms.getFieldsGroup(section.id)).toBeTruthy();
  expect(cms.getFieldsGroup(section.id).fields).toHaveLength(2);

  expect(cms.getFieldsGroup(section.id).getField(titleField.name)).toBeTruthy();
  expect(cms.getFieldsGroup(section.id).getField(titleField.name).type).toEqual(
    titleField.type
  );

  expect(
    cms.getFieldsGroup(section.id).getField(descriptionField.name)
  ).toBeTruthy();
  expect(
    cms.getFieldsGroup(section.id).getField(descriptionField.name).type
  ).toEqual(descriptionField.type);
});

test("Should generate a cms with a single type entity containing a field group from a page with a section", async () => {
  const section = createSectionDTO({});

  const page = createPageDTO({
    sections: [section.id],
  });

  const dto = createDTO({
    pages: [page],
    sections: [section],
  });

  const result = await generateCms.execute(dto);

  expect(result.isOk()).toBeTruthy();

  const cms = result.unwrap();

  expect(cms.getEntity(page.id).fieldsGroups).toHaveLength(1);
  expect(cms.getEntity(page.id).getFieldsGroup(section.id).group).toEqual(
    cms.getFieldsGroup(section.id)
  );
});

function createDTO(dto: {
  concepts?: ConceptDTO[];
  pages?: PageDTO[];
  sections?: SectionDTO[];
}): GenerateCmsDTO {
  return {
    concepts: dto.concepts ?? [],
    pages: dto.pages ?? [],
    sections: dto.sections ?? [],
  };
}

function createConceptDTO(concept: {
  id?: string;
  name?: string;
  type?: ConceptTypeDTO;
  fields?: FieldDTO[];
}): ConceptDTO {
  return {
    id: concept.id ?? "concept_id",
    name: concept.name ?? "concept_name",
    type: concept.type ?? "single",
    fields: concept.fields ?? [],
  };
}

function createFieldDTO(field: {
  name?: string;
  type?: FieldTypeDTO;
  relation?: RelationDTO;
}): FieldDTO {
  return {
    name: field.name ?? "field_name",
    type: field.type ?? "text",
    relation: field.relation,
  };
}

function createRelationDTO(relation: {
  concept?: string;
  type?: RelationTypeDTO;
}): RelationDTO {
  return {
    concept: relation.concept ?? "concept_id",
    type: relation.type ?? "some",
  };
}

function createPageDTO(page: {
  id?: string;
  name?: string;
  isDynamic?: boolean;
  relatedConcept?: string;
  fields?: FieldDTO[];
  sections?: string[];
}): PageDTO {
  return {
    id: page.id ?? "page_id",
    name: page.name ?? "page_name",
    isDynamic: page.isDynamic ?? false,
    relatedConcept: page.relatedConcept,
    fields: page.fields ?? [],
    sections: page.sections ?? [],
  };
}

function createSectionDTO(section: {
  id?: string;
  name?: string;
  fields?: FieldDTO[];
}): SectionDTO {
  return {
    id: section.id ?? "section_id",
    name: section.name ?? "section_name",
    fields: section.fields ?? [],
  };
}
