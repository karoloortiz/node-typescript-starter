import { UniqueEntityID } from "../../../../ddd-primitives";
import { Cms } from "../../domain/entities/cms/cms";
import {
  CmsEntity,
  CmsEntityType,
} from "../../domain/entities/cmsEntity/cmsEntity";
import { CmsFieldRelationType } from "../../domain/entities/cmsFieldRelation/cmsFieldRelation";
import { CmsFieldsGroup } from "../../domain/entities/cmsFieldsGroup/cmsFieldsGroup";
import {
  CmsField,
  CmsFieldType,
} from "../../domain/valueObjects/cmsField/cmsField";
import {
  StrapiAttributeRelationType,
  StrapiAttributeSchema,
  StrapiAttributeType,
} from "./models/strapiAttributeSchema";
import { StrapiComponent } from "./models/strapiComponent";
import { StrapiComponentSchema } from "./models/strapiComponentSchema";
import { StrapiError } from "./models/strapiError";
import { StrapiProject } from "./models/strapiProject";
import { StrapiType } from "./models/strapiType";
import { StrapiTypeKind, StrapiTypeSchema } from "./models/strapiTypeSchema";
import { StrapiGenerator } from "./strapiGenerator";

export class StrapiAdapter {
  private cms: Cms;

  constructor(cms: Cms) {
    this.cms = cms;
  }

  public async adapt(): Promise<void> {
    try {
      const strapiProject = this.createStrapiProject();
      await new StrapiGenerator(strapiProject).generate();
    } catch (error) {
      console.log(error.toString());
    }
  }

  public createStrapiProject(): StrapiProject {
    const components: StrapiComponent[] = [];

    this.createAndPopulateComponents(this.cms.fieldsGroups, components);

    const project = new StrapiProject({
      singleTypes: this.createTypes(
        this.cms.getSingleTypeEntities(),
        components
      ),
      collectionTypes: this.createTypes(
        this.cms.getMultiTypeEntities(),
        components
      ),
      components,
    });

    return project;
  }

  private createAndPopulateComponents(
    fieldsGroups: CmsFieldsGroup[],
    components: StrapiComponent[]
  ): void {
    for (let group of fieldsGroups) {
      if (!this.findComponent(components, group.id)) {
        if (group.fieldsGroups.length > 0) {
          this.createAndPopulateComponents(
            group.fieldsGroups.map((g) => g.group),
            components
          );
        }

        if (
          !group.sharedFieldsGroup ||
          !this.findComponent(components, group.sharedFieldsGroup.id)
        ) {
          const component = new StrapiComponent(
            {
              name: group.name,
              schema: this.createComponentSchema(group, components),
              parentFolderName: this.getComponentParentFolder(group),
            },
            group.sharedFieldsGroup ? group.sharedFieldsGroup.id : group.id
          );

          components.push(component);
        }
      }
    }
  }

  private findComponent(components: StrapiComponent[], id: UniqueEntityID) {
    return components.find((c) => c.id == id);
  }

  private createComponentSchema(
    fieldsGroup: CmsFieldsGroup,
    components: StrapiComponent[]
  ): StrapiComponentSchema {
    const parentFolder = this.getComponentParentFolder(fieldsGroup);

    return {
      collectionName: this.buildComponentCollectionName(
        parentFolder,
        fieldsGroup.name
      ),
      info: {
        displayName: fieldsGroup.displayName,
      },
      attributes: this.createTypeAttributes(fieldsGroup, components),
    };
  }

  private buildComponentCollectionName(
    parentFolder: string,
    fieldsGroupName: string
  ): string {
    return `components_${parentFolder}_${this.makePlural(fieldsGroupName)}`;
  }

  private getComponentParentFolder(fieldsGroup: CmsFieldsGroup) {
    if (!fieldsGroup.sharedFieldsGroup) {
      if (fieldsGroup.parent instanceof CmsEntity) {
        return fieldsGroup.parent.name;
      }
    }

    return "shared";
  }

  private createTypes(
    entities: CmsEntity[],
    components: StrapiComponent[]
  ): StrapiType[] {
    return entities.map(
      (e) =>
        new StrapiType(
          {
            schema: this.createTypeSchema(e, components),
            name: e.name,
          },
          e.id
        )
    );
  }

  private createTypeSchema(
    entity: CmsEntity,
    components: StrapiComponent[]
  ): StrapiTypeSchema {
    const schema: StrapiTypeSchema = {
      kind: this.translateEntityType(entity.type),
      collectionName: this.makePlural(entity.name),
      info: {
        singularName: entity.name,
        pluralName: this.makePlural(entity.name),
        displayName: entity.displayName,
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
      attributes: this.createTypeAttributes(entity, components),
    };

    return schema;
  }

  private createTypeAttributes(
    entity: CmsEntity | CmsFieldsGroup,
    components: StrapiComponent[]
  ): {
    [field: string]: StrapiAttributeSchema;
  } {
    let attributes = {};

    this.buildAttributesFromFields(entity, attributes);

    this.buildAttributesFromFieldsGroup(entity, components, attributes);

    return attributes;
  }

  private buildAttributesFromFields(
    entity: CmsFieldsGroup | CmsEntity,
    attributes: any
  ) {
    for (let field of entity.fields) {
      if (this.isFieldSupported(field, entity)) {
        const attributeInfo: StrapiAttributeSchema = {
          type: this.translateFieldType(field.type),
          pluginOptions: {
            i18n: {
              localized: true,
            },
          },
          required: false,
        };

        if (field.type == "relation") {
          attributeInfo.relation = this.translateRelationType(
            field.relation.type
          );
          attributeInfo.target = this.buildAttribiteTarget(
            field.relation.entity.name
          );

          if (field.relation.direction == "bidirectional") {
            attributeInfo.inversedBy = entity.name;
          }
        }

        attributes[field.name] = attributeInfo;
      }
    }
  }

  private isFieldSupported(
    field: CmsField,
    entity: CmsFieldsGroup | CmsEntity
  ) {
    return (
      !field.relation ||
      ((entity instanceof CmsFieldsGroup ||
        !entity.relatedEntity ||
        entity.relatedEntity != field.relation.entity) &&
        field.relation.type != "oneToAll" &&
        field.relation.entity.type != "single")
    );
  }

  private buildAttributesFromFieldsGroup(
    entity: CmsFieldsGroup | CmsEntity,
    components: StrapiComponent[],
    attributes: any
  ) {
    for (let repeatableFieldsGroup of entity.fieldsGroups) {
      let component: StrapiComponent;

      if (repeatableFieldsGroup.group.sharedFieldsGroup) {
        component = this.findComponent(
          components,
          repeatableFieldsGroup.group.sharedFieldsGroup.id
        );
      } else {
        component = this.findComponent(
          components,
          repeatableFieldsGroup.group.id
        );
      }

      const attributeInfo: StrapiAttributeSchema = {
        type: "component",
        repeatable: repeatableFieldsGroup.isRepeated,
        component: component.fullName,
      };

      attributes[component.name] = attributeInfo;
    }
  }

  private buildAttribiteTarget(name: string): string {
    return `api::${name}.${name}`;
  }

  private translateRelationType(
    type: CmsFieldRelationType
  ): StrapiAttributeRelationType {
    if (type == "oneToOne") {
      return "oneToOne";
    }

    if (type == "oneToMany") {
      return "oneToMany";
    }

    if (type == "manyToMany") {
      return "manyToMany";
    }

    throw new StrapiError(
      "RELATION_TYPE_NOT_SUPPORTED",
      `${type} is not supported`
    );
  }

  private translateEntityType(type: CmsEntityType): StrapiTypeKind {
    if (type == "single") {
      return "singleType";
    }

    if (type == "multi") {
      return "collectionType";
    }

    throw new StrapiError(
      "FIELD_TYPE_NOT_SUPPORTED",
      `${type} is not supported`
    );
  }

  private translateFieldType(type: CmsFieldType): StrapiAttributeType {
    if (type == "text") {
      return "string";
    }

    if (type == "longText") {
      return "text";
    }

    if (type == "richText") {
      return "richtext";
    }

    if (type == "image") {
      return "media";
    }

    if (type == "relation") {
      return "relation";
    }

    throw new StrapiError(
      "FIELD_TYPE_NOT_SUPPORTED",
      `${type} is not supported`
    );
  }

  private makePlural(value: string): string {
    return value + "s";
  }
}
