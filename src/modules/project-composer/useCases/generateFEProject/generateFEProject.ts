import { UseCase } from "../../../../ddd-primitives";
import { NextProject } from "../../domain/entities/feProject/nextProject";
import { IIntegrationRepo } from "../../repos/integrationRepo";

export interface GenerateFEProjectInput {
  digitalProductId: string;
  type: "nextjs" | "react";
}

export class GenerateFEProject
  implements UseCase<GenerateFEProjectInput, NextProject>
{
  private integrationRepo: IIntegrationRepo;

  constructor(integrationRepo: IIntegrationRepo) {
    this.integrationRepo = integrationRepo;
  }

  async execute(request: GenerateFEProjectInput): Promise<NextProject> {
    const data = await this.integrationRepo.get(request.digitalProductId);

    const nextProject = new NextProject(data);

    return nextProject;
  }
}
