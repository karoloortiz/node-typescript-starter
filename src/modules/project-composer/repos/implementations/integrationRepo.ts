import { IIntegrationRepo, IntegratedData } from "../integrationRepo";

export class IntegrationRepo implements IIntegrationRepo {
  get(digitalProductId: string): Promise<IntegratedData> {
    throw new Error("Method not implemented.");
  }
}
