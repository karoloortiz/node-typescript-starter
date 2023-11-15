import { SharedCmsFieldGroup } from "../../domain/entities/sharedCmsFieldGroup/sharedCmsFieldGroup";
import { createCms } from "../../utils/test/creationFunction/cms/cms";
import { createCmsEntity } from "../../utils/test/creationFunction/cms/cmsEntity";
import { createCmsField } from "../../utils/test/creationFunction/cms/cmsField";
import { createCmsFieldRelation } from "../../utils/test/creationFunction/cms/cmsFieldRelation";
import { createCmsFieldsGroup } from "../../utils/test/creationFunction/cms/cmsFieldsGroup";
import { createRepeatableFieldsGroup } from "../../utils/test/creationFunction/cms/repeatableFieldsGroup";
import { StrapiAdapter } from "./strapiAdapter";

test("Should generate a strapi project with a single type for each single type entity", () => {
  const entity1 = createCmsEntity({
    name: "homepage1",
    type: "single",
  });

  const entity2 = createCmsEntity({
    name: "homepage2",
    type: "single",
  });

  const cms = createCms({
    entities: [entity1, entity2],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  expect(strapiProject.singleTypes).toHaveLength(2);
  expect(strapiProject.getSingleType(entity1.id.toString())).toBeTruthy();
  expect(strapiProject.getSingleType(entity2.id.toString())).toBeTruthy();
});

test("Should generate a strapi project with a collection type for each multi type entity", () => {
  const entity1 = createCmsEntity({
    name: "homepage1",
    type: "multi",
  });

  const entity2 = createCmsEntity({
    name: "homepage2",
    type: "multi",
  });

  const cms = createCms({
    entities: [entity1, entity2],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  expect(strapiProject.collectionTypes).toHaveLength(2);
  expect(strapiProject.getCollectionType(entity1.id.toString())).toBeTruthy();
  expect(strapiProject.getCollectionType(entity2.id.toString())).toBeTruthy();
});

test("Should generate a strapi project with a single/collection type having a valid schema", () => {
  const entity = createCmsEntity({
    name: "homepage",
    displayName: "Homepage",
    type: "single",
  });

  const cms = createCms({
    entities: [entity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getSingleType(entity.id.toString()).schema;

  expect(schema.kind).toEqual("singleType");
  expect(schema.collectionName).toEqual("homepages");
  expect(schema.info.singularName).toEqual("homepage");
  expect(schema.info.pluralName).toEqual("homepages");
  expect(schema.info.displayName).toEqual("Homepage");
  expect(schema.info.description).toEqual("");
  expect(schema.options.draftAndPublish).toEqual(true);
  expect(schema.pluginOptions.i18n.localized).toEqual(true);
});

test("Should generate a strapi project with a single/collection type having a string attribute", () => {
  const field = createCmsField({
    name: "title",
    type: "text",
  });

  const entity = createCmsEntity({
    name: "homepage",
    displayName: "Homepage",
    type: "single",
    fields: [field],
  });

  const cms = createCms({
    entities: [entity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getSingleType(entity.id.toString()).schema;

  expect(schema.attributes[field.name]).toBeTruthy();
  expect(schema.attributes[field.name].type).toEqual("string");
});

test("Should generate a strapi project with a single/collection type having a text attribute", () => {
  const field = createCmsField({
    name: "title",
    type: "longText",
  });

  const entity = createCmsEntity({
    name: "homepage",
    displayName: "Homepage",
    type: "single",
    fields: [field],
  });

  const cms = createCms({
    entities: [entity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getSingleType(entity.id.toString()).schema;

  expect(schema.attributes[field.name]).toBeTruthy();
  expect(schema.attributes[field.name].type).toEqual("text");
});

test("Should generate a strapi project with a single/collection type having a richtext attribute", () => {
  const field = createCmsField({
    name: "title",
    type: "richText",
  });

  const entity = createCmsEntity({
    name: "homepage",
    displayName: "Homepage",
    type: "single",
    fields: [field],
  });

  const cms = createCms({
    entities: [entity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getSingleType(entity.id.toString()).schema;

  expect(schema.attributes[field.name]).toBeTruthy();
  expect(schema.attributes[field.name].type).toEqual("richtext");
});

test("Should generate a strapi project with a single/collection type having a media attribute", () => {
  const field = createCmsField({
    name: "title",
    type: "image",
  });

  const entity = createCmsEntity({
    name: "homepage",
    displayName: "Homepage",
    type: "single",
    fields: [field],
  });

  const cms = createCms({
    entities: [entity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getSingleType(entity.id.toString()).schema;

  expect(schema.attributes[field.name]).toBeTruthy();
  expect(schema.attributes[field.name].type).toEqual("media");
});

test("Should generate a strapi project with a single type having a relation oneToOne unidirectional with a collection entity", () => {
  const userEntity = createCmsEntity({
    name: "user",
    displayName: "User",
    type: "multi",
  });

  const userField = createCmsField({
    name: "users",
    type: "relation",
    relation: createCmsFieldRelation({
      entity: userEntity,
      type: "oneToOne",
      direction: "unidirectional",
    }),
  });

  const homepageEntity = createCmsEntity({
    name: "homepage",
    displayName: "Homepage",
    type: "single",
    fields: [userField],
  });

  const cms = createCms({
    entities: [homepageEntity, userEntity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getSingleType(
    homepageEntity.id.toString()
  ).schema;

  expect(schema.attributes[userField.name]).toBeTruthy();
  expect(schema.attributes[userField.name].type).toEqual("relation");
  expect(schema.attributes[userField.name].relation).toEqual("oneToOne");
  expect(schema.attributes[userField.name].target).toEqual("api::user.user");
});

test("Should generate a strapi project with a single type having a relation oneToMany unidirectional with a collection entity", () => {
  const articleEntity = createCmsEntity({
    name: "article",
    displayName: "Article",
    type: "multi",
  });

  const articlesField = createCmsField({
    name: "articles",
    type: "relation",
    relation: createCmsFieldRelation({
      entity: articleEntity,
      type: "oneToMany",
      direction: "unidirectional",
    }),
  });

  const homepageEntity = createCmsEntity({
    name: "homepage",
    displayName: "Homepage",
    type: "single",
    fields: [articlesField],
  });

  const cms = createCms({
    entities: [homepageEntity, articleEntity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getSingleType(
    homepageEntity.id.toString()
  ).schema;

  expect(schema.attributes[articlesField.name]).toBeTruthy();
  expect(schema.attributes[articlesField.name].type).toEqual("relation");
  expect(schema.attributes[articlesField.name].relation).toEqual("oneToMany");
  expect(schema.attributes[articlesField.name].target).toEqual(
    "api::article.article"
  );
});

test("Should generate a strapi project with a collection type having a relation oneToOne unidirectional with a collection entity", () => {
  const authorEntity = createCmsEntity({
    name: "author",
    displayName: "Author",
    type: "multi",
  });

  const authorField = createCmsField({
    name: "author",
    type: "relation",
    relation: createCmsFieldRelation({
      entity: authorEntity,
      type: "oneToOne",
      direction: "unidirectional",
    }),
  });

  const articleEntity = createCmsEntity({
    name: "article",
    displayName: "Article",
    type: "multi",
    fields: [authorField],
  });

  const cms = createCms({
    entities: [articleEntity, authorEntity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getCollectionType(
    articleEntity.id.toString()
  ).schema;

  expect(schema.attributes[authorField.name]).toBeTruthy();
  expect(schema.attributes[authorField.name].type).toEqual("relation");
  expect(schema.attributes[authorField.name].relation).toEqual("oneToOne");
  expect(schema.attributes[authorField.name].target).toEqual(
    "api::author.author"
  );
});

test("Should generate a strapi project with a collection type having a relation oneToMany unidirectional with a collection entity", () => {
  const authorEntity = createCmsEntity({
    name: "author",
    displayName: "Author",
    type: "multi",
  });

  const authorField = createCmsField({
    name: "author",
    type: "relation",
    relation: createCmsFieldRelation({
      entity: authorEntity,
      type: "oneToMany",
      direction: "unidirectional",
    }),
  });

  const articleEntity = createCmsEntity({
    name: "article",
    displayName: "Article",
    type: "multi",
    fields: [authorField],
  });

  const cms = createCms({
    entities: [articleEntity, authorEntity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getCollectionType(
    articleEntity.id.toString()
  ).schema;

  expect(schema.attributes[authorField.name]).toBeTruthy();
  expect(schema.attributes[authorField.name].type).toEqual("relation");
  expect(schema.attributes[authorField.name].relation).toEqual("oneToMany");
  expect(schema.attributes[authorField.name].target).toEqual(
    "api::author.author"
  );
});

test("Should generate a strapi project with a collection type having a relation oneToOne bidirectional with a collection entity", () => {
  const authorEntity = createCmsEntity({
    name: "author",
    displayName: "Author",
    type: "multi",
  });

  const articleEntity = createCmsEntity({
    name: "article",
    displayName: "Article",
    type: "multi",
  });

  const authorField = createCmsField({
    name: "author",
    type: "relation",
    relation: createCmsFieldRelation({
      entity: authorEntity,
      type: "oneToOne",
      direction: "bidirectional",
    }),
  });

  const articleField = createCmsField({
    name: "article",
    type: "relation",
    relation: createCmsFieldRelation({
      entity: articleEntity,
      type: "oneToOne",
      direction: "bidirectional",
    }),
  });

  authorEntity.addField(articleField);
  articleEntity.addField(authorField);

  const cms = createCms({
    entities: [articleEntity, authorEntity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const articleSchema = strapiProject.getCollectionType(
    articleEntity.id.toString()
  ).schema;

  const authorSchema = strapiProject.getCollectionType(
    authorEntity.id.toString()
  ).schema;

  expect(articleSchema.attributes[authorField.name]).toBeTruthy();
  expect(articleSchema.attributes[authorField.name].type).toEqual("relation");
  expect(articleSchema.attributes[authorField.name].relation).toEqual(
    "oneToOne"
  );
  expect(articleSchema.attributes[authorField.name].target).toEqual(
    "api::author.author"
  );
  expect(articleSchema.attributes[authorField.name].inversedBy).toEqual(
    "article"
  );

  expect(authorSchema.attributes[articleField.name]).toBeTruthy();
  expect(authorSchema.attributes[articleField.name].type).toEqual("relation");
  expect(authorSchema.attributes[articleField.name].relation).toEqual(
    "oneToOne"
  );
  expect(authorSchema.attributes[articleField.name].target).toEqual(
    "api::article.article"
  );
  expect(authorSchema.attributes[articleField.name].inversedBy).toEqual(
    "author"
  );
});

test("Should generate a strapi project with a collection type having a relation manyToMany bidirectional with a collection entity", () => {
  const authorEntity = createCmsEntity({
    name: "author",
    displayName: "Author",
    type: "multi",
  });

  const articleEntity = createCmsEntity({
    name: "article",
    displayName: "Article",
    type: "multi",
  });

  const authorField = createCmsField({
    name: "author",
    type: "relation",
    relation: createCmsFieldRelation({
      entity: authorEntity,
      type: "manyToMany",
      direction: "bidirectional",
    }),
  });

  const articleField = createCmsField({
    name: "article",
    type: "relation",
    relation: createCmsFieldRelation({
      entity: articleEntity,
      type: "manyToMany",
      direction: "bidirectional",
    }),
  });

  authorEntity.addField(articleField);
  articleEntity.addField(authorField);

  const cms = createCms({
    entities: [articleEntity, authorEntity],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const articleSchema = strapiProject.getCollectionType(
    articleEntity.id.toString()
  ).schema;

  const authorSchema = strapiProject.getCollectionType(
    authorEntity.id.toString()
  ).schema;

  expect(articleSchema.attributes[authorField.name]).toBeTruthy();
  expect(articleSchema.attributes[authorField.name].type).toEqual("relation");
  expect(articleSchema.attributes[authorField.name].relation).toEqual(
    "manyToMany"
  );
  expect(articleSchema.attributes[authorField.name].target).toEqual(
    "api::author.author"
  );
  expect(articleSchema.attributes[authorField.name].inversedBy).toEqual(
    "article"
  );

  expect(authorSchema.attributes[articleField.name]).toBeTruthy();
  expect(authorSchema.attributes[articleField.name].type).toEqual("relation");
  expect(authorSchema.attributes[articleField.name].relation).toEqual(
    "manyToMany"
  );
  expect(authorSchema.attributes[articleField.name].target).toEqual(
    "api::article.article"
  );
  expect(authorSchema.attributes[articleField.name].inversedBy).toEqual(
    "author"
  );
});

test("Should generate a strapi project with a component for each field group", () => {
  const fieldsGroup = createCmsFieldsGroup({
    name: "heroSection",
    displayName: "Hero Section",
  });

  const cms = createCms({
    fieldsGroups: [fieldsGroup],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  expect(strapiProject.components).toHaveLength(1);
  expect(strapiProject.getComponent(fieldsGroup.id.toString())).toBeTruthy();
});

test("Should generate a strapi project with a component having a valid schema", () => {
  const fieldsGroup = createCmsFieldsGroup({
    name: "heroSection",
    displayName: "Hero Section",
  });

  const cms = createCms({
    fieldsGroups: [fieldsGroup],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const schema = strapiProject.getComponent(fieldsGroup.id.toString()).schema;

  expect(schema.collectionName).toEqual("components_shared_heroSections");
  expect(schema.info.displayName).toEqual("Hero Section");
  expect(schema.attributes).toEqual({});
});

test("Should generate a strapi project with a component inside a single type", () => {
  const homePageEntity = createCmsEntity({
    name: "homepage",
    displayName: "Home Page",
    type: "single",
  });

  const fieldsGroup = createCmsFieldsGroup({
    name: "heroSection",
    displayName: "Hero Section",
    parent: homePageEntity,
  });

  homePageEntity.addFieldGroup({
    group: fieldsGroup,
    isRepeated: false,
  });

  const cms = createCms({
    entities: [homePageEntity],
    fieldsGroups: [fieldsGroup],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  const component = strapiProject.getComponent(fieldsGroup.id.toString());

  expect(component.parentFolderName).toEqual("homepage");
  expect(component.schema.collectionName).toEqual(
    "components_homepage_heroSections"
  );
  expect(component.schema.info.displayName).toEqual("Hero Section");
  expect(component.schema.attributes).toEqual({});

  const homepageSchema = strapiProject.getSingleType(
    homePageEntity.id.toString()
  ).schema;

  expect(homepageSchema.attributes[fieldsGroup.name]).toBeDefined();
  expect(homepageSchema.attributes[fieldsGroup.name].type).toEqual("component");
  expect(homepageSchema.attributes[fieldsGroup.name].repeatable).toEqual(false);
  expect(homepageSchema.attributes[fieldsGroup.name].component).toEqual(
    "homepage.heroSection"
  );
});

test("Should generate a strapi project with a component inside another component", () => {
  const parentFieldGroup = createCmsFieldsGroup({
    name: "parent",
    displayName: "ParentFG",
  });

  const childFieldGroup = createCmsFieldsGroup({
    name: "child",
    displayName: "ChildFG",
    parent: parentFieldGroup,
  });

  parentFieldGroup.addFieldGroup(
    createRepeatableFieldsGroup({
      group: childFieldGroup,
      isRepeated: true,
    })
  );

  const cms = createCms({
    fieldsGroups: [parentFieldGroup, childFieldGroup],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  expect(strapiProject.components).toHaveLength(2);

  const childComponent = strapiProject.getComponent(
    childFieldGroup.id.toString()
  );

  expect(childComponent.parentFolderName).toEqual("shared");
  expect(childComponent.fullName).toEqual("shared.child");
  expect(childComponent.schema.collectionName).toEqual(
    "components_shared_childs"
  );
  expect(childComponent.schema.info.displayName).toEqual("ChildFG");
  expect(childComponent.schema.attributes).toEqual({});

  const parentComponent = strapiProject.getComponent(
    parentFieldGroup.id.toString()
  );

  expect(parentComponent.parentFolderName).toEqual("shared");
  expect(parentComponent.fullName).toEqual("shared.parent");
  expect(parentComponent.schema.attributes[childFieldGroup.name]).toBeDefined();
  expect(parentComponent.schema.attributes[childFieldGroup.name].type).toEqual(
    "component"
  );
  expect(
    parentComponent.schema.attributes[childFieldGroup.name].repeatable
  ).toEqual(true);
  expect(
    parentComponent.schema.attributes[childFieldGroup.name].component
  ).toEqual("shared.child");
});

test("Should generate a strapi project with a component when two fields groups has the same shared fields group", () => {
  const homepageEntity = createCmsEntity(
    {
      name: "Home Page",
      type: "single",
    },
    "homepage"
  );

  const aboutEntity = createCmsEntity(
    {
      name: "About Page",
      type: "single",
    },
    "about"
  );

  const sharedFieldsGroup = new SharedCmsFieldGroup({});

  const fg1 = createCmsFieldsGroup(
    {
      name: "FG1",
      parent: homepageEntity,
      sharedFieldsGroup,
    },
    "fg1"
  );

  const fg2 = createCmsFieldsGroup(
    {
      name: "FG2",
      parent: aboutEntity,
      sharedFieldsGroup,
    },
    "fg2"
  );

  homepageEntity.addFieldGroup({ group: fg1, isRepeated: false });
  aboutEntity.addFieldGroup({ group: fg2, isRepeated: false });

  const cms = createCms({
    entities: [homepageEntity, aboutEntity],
    fieldsGroups: [fg1, fg2],
  });

  const adapter = new StrapiAdapter(cms);

  const strapiProject = adapter.createStrapiProject();

  expect(strapiProject.components).toHaveLength(1);
  expect(
    strapiProject.getComponent(sharedFieldsGroup.id.toString())
  ).toBeTruthy();

  const homepageType = strapiProject.getSingleType(
    homepageEntity.id.toString()
  );

  expect(homepageType.schema.attributes[fg1.name]).toBeDefined();

  const aboutType = strapiProject.getSingleType(aboutEntity.id.toString());

  expect(aboutType.schema.attributes[fg1.name]).toBeDefined();
});

test("Should ignore all fields, related to an entity A, in an entity B that is related to same entity A when generating a strapi project", () => {
  const articleEntity = createCmsEntity({
    name: "article",
    displayName: "Article",
    type: "multi",
    fields: [
      createCmsField({
        name: "title",
        type: "text",
      }),
      createCmsField({
        name: "description",
        type: "text",
      }),
    ],
  });

  const articlePage = createCmsEntity({
    relatedEntity: articleEntity,
    type: "single",
    name: "articlePage",
    displayName: "Article Page",
    fields: [
      createCmsField({
        name: "article",
        type: "relation",
        relation: createCmsFieldRelation({
          entity: articleEntity,
          type: "oneToOne",
          direction: "unidirectional",
        }),
      }),
      createCmsField({
        name: "page title",
        type: "text",
      }),
    ],
  });

  const cms = createCms({
    entities: [articleEntity, articlePage],
  });

  const strapiProject = new StrapiAdapter(cms).createStrapiProject();

  expect(
    strapiProject.getSingleType(articlePage.id.toString()).schema.attributes[
      "page title"
    ]
  ).toBeDefined();
  expect(
    strapiProject.getSingleType(articlePage.id.toString()).schema.attributes[
      "article"
    ]
  ).toBeUndefined();
});

test('Should ignore a "oneToAll" relation field when generating a strapi project', () => {
  const article = createCmsEntity({
    name: "article",
    displayName: "Article",
    type: "multi",
  });

  const articlesPage = createCmsEntity({
    name: "articlesPage",
    displayName: "Articles Page",
    type: "single",
    fields: [
      createCmsField({
        name: "pageTitle",
        type: "text",
      }),
      createCmsField({
        name: "articles",
        type: "relation",
        relation: createCmsFieldRelation({
          type: "oneToAll",
          entity: article,
        }),
      }),
    ],
  });

  const cms = createCms({
    entities: [article, articlesPage],
  });

  const strapiProject = new StrapiAdapter(cms).createStrapiProject();

  expect(
    strapiProject.getSingleType(articlesPage.id.toString()).schema.attributes[
      "pageTitle"
    ]
  ).toBeDefined();
  expect(
    strapiProject.getSingleType(articlesPage.id.toString()).schema.attributes[
      "articles"
    ]
  ).toBeUndefined();
});

test("Should ignore fields related to single type entities when generating a strapi project", () => {
  const ctaSection = createCmsEntity({
    name: "ctaSection",
    displayName: "CTA Section",
    type: "single",
  });

  const homepage = createCmsEntity({
    name: "homepage",
    displayName: "Home Page",
    type: "single",
    fields: [
      createCmsField({
        name: "title",
        type: "text",
      }),
      createCmsField({
        name: "ctaSection",
        type: "relation",
        relation: createCmsFieldRelation({
          entity: ctaSection,
          type: "oneToOne",
        }),
      }),
    ],
  });

  const cms = createCms({
    entities: [homepage, ctaSection],
  });

  const strapiProject = new StrapiAdapter(cms).createStrapiProject();

  expect(
    strapiProject.getSingleType(homepage.id.toString()).schema.attributes[
      "title"
    ]
  ).toBeDefined();
  expect(
    strapiProject.getSingleType(homepage.id.toString()).schema.attributes[
      "ctaSection"
    ]
  ).toBeUndefined();
});
