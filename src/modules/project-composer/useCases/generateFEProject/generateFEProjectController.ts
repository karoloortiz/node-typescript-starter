import { BaseController } from "../../../../ddd-primitives";
import e, * as express from "express";
import {
  GenerateFEProject as GenerateFEProject,
  GenerateFEProjectInput,
} from "./generateFEProject";
import JSZip from "jszip";
import fs from "fs";
import { NextProject } from "../../domain/entities/feProject/nextProject";

export class GenerateFEProjectController extends BaseController {
  private generateFEProject: GenerateFEProject;

  public constructor(generateFEProject: GenerateFEProject) {
    super();
    this.generateFEProject = generateFEProject;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    const input: GenerateFEProjectInput = {
      digitalProductId: req.body.digitalProductId,
      type: req.body.type,
    };

    const nextProject = await this.generateFEProject.execute(input);

    const path = this.generateFileSystemProject(nextProject);

    const zipAsBase64 = await this.generateZipAsBase64(path);

    return this.ok(res, {
      name: nextProject.name,
      zip: zipAsBase64,
    });
  }

  public generateFileSystemProject(project: NextProject): string {
    const projectPath = `temp/${project.id}`;

    fs.mkdirSync(projectPath, {
      recursive: true,
    });

    project.files.forEach((f) => {
      const pathParts = f.getFullPath().substring(1).split("/");

      if (pathParts.length > 1) {
        fs.mkdirSync(
          projectPath +
            "/" +
            pathParts.slice(0, pathParts.length - 1).join("/"),
          {
            recursive: true,
          }
        );
      }
      
      fs.writeFileSync(projectPath + f.getFullPath(), f.getSourceCode());
    });

    return projectPath;
  }

  private async generateZipAsBase64(path: string): Promise<string> {
    const zip = new JSZip();

    this.addFilesFromDirectoryToZip(path, zip);

    return await zip.generateAsync({ type: "base64" });
  }

  private addFilesFromDirectoryToZip(directoryPath: string, zip: JSZip): void {
    const directoryContents = fs.readdirSync(directoryPath, {
      withFileTypes: true,
    });

    directoryContents.forEach(({ name }) => {
      const path = `${directoryPath}/${name}`;

      if (fs.statSync(path).isFile()) {
        zip.file(path, fs.readFileSync(path, "utf-8"));
      }

      if (fs.statSync(path).isDirectory()) {
        this.addFilesFromDirectoryToZip(path, zip);
      }
    });
  }
}
