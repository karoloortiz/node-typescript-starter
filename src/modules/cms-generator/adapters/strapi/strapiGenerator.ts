import { exec, execSync } from "child_process";
import { StrapiProject } from "./models/strapiProject";
import { UniqueEntityID } from "../../../../ddd-primitives";
import { mkdir, writeFile } from "fs/promises";

export class StrapiGenerator {
  public static basePath = "strapi-template";

  private static userName = "cardi96";
  private static accessToken = "glpat-_z5U1wqEdmd2MsCA3eBX";
  private static strapiTemplateRepository =
    "gitlab.com/scaleup1/packages/strapi-template.git";

  private static routerFile = `'use strict';

  /**
   * @snappie{name} router
   */
  
  const { createCoreRouter } = require('@strapi/strapi').factories;
  
  module.exports = createCoreRouter('api::@snappie{name}.@snappie{name}');`;
  private static controllerFile = `'use strict';

  /**
   * @snappie{name} controller
   */
  
  const { createCoreController } = require('@strapi/strapi').factories;
  
  module.exports = createCoreController('api::@snappie{name}.@snappie{name}');`;
  private static serviceFile = `'use strict';

  /**
   * @snappie{name} service
   */
  
  const { createCoreService } = require('@strapi/strapi').factories;
  
  module.exports = createCoreService('api::@snappie{name}.@snappie{name}');`;

  private project: StrapiProject;

  constructor(project: StrapiProject) {
    this.project = project;
  }

  public async generate(): Promise<void> {
    this.generateInitialProject();

    await this.generateComponents();

    await this.generateTypes();
  }

  private generateInitialProject() {
    try {
      execSync(
        `git clone https://${StrapiGenerator.userName}:${StrapiGenerator.accessToken}@${StrapiGenerator.strapiTemplateRepository}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  private async generateComponents(): Promise<void> {
    for (let component of this.project.components) {
      const parentFolderPath = `${StrapiGenerator.basePath}/src/components/${component.parentFolderName}`;

      await mkdir(parentFolderPath, {
        recursive: true,
      });

      await writeFile(
        `${parentFolderPath}/${this.escapeName(component.name)}.json`,
        JSON.stringify(component.schema)
      );
    }
  }

  private async generateTypes(): Promise<void> {
    for (let type of [
      ...this.project.collectionTypes,
      ...this.project.singleTypes,
    ]) {
      const parentFolderPath = `${StrapiGenerator.basePath}/src/api/${type.name}`;

      const schemaFolder = `${parentFolderPath}/content-types/${type.name}`;
      await mkdir(schemaFolder, {
        recursive: true,
      });

      await writeFile(
        `${schemaFolder}/schema.json`,
        JSON.stringify(type.schema)
      );

      const controllersFolder = `${parentFolderPath}/controllers`;
      const routesFolder = `${parentFolderPath}/routes`;
      const servicesFolder = `${parentFolderPath}/services`;

      await mkdir(controllersFolder, {
        recursive: true,
      });
      await mkdir(routesFolder, {
        recursive: true,
      });
      await mkdir(servicesFolder, {
        recursive: true,
      });

      await writeFile(
        `${controllersFolder}/${type.name}.js`,
        StrapiGenerator.controllerFile.replace(/@snappie{name}/g, type.name)
      );
      await writeFile(
        `${servicesFolder}/${type.name}.js`,
        StrapiGenerator.serviceFile.replace(/@snappie{name}/g, type.name)
      );
      await writeFile(
        `${routesFolder}/${type.name}.js`,
        StrapiGenerator.routerFile.replace(/@snappie{name}/g, type.name)
      );
    }
  }

  private escapeName(value: string): string {
    return value.split(" ").join("-");
  }
}
