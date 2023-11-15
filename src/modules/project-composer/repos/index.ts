import { IntegrationRepo } from "./implementations/integrationRepo";
import { IIntegrationRepo } from "./integrationRepo";

const integrationRepo: IIntegrationRepo = new IntegrationRepo();

export { integrationRepo };
