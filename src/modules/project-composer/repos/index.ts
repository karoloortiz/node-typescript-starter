import { IComponentRepo } from "./componentRepo";
import { ComponentRepo } from "./implementations/componentRepo";
import { IntegrationRepo } from "./implementations/integrationRepo";
import { SiteBuilderRepo } from "./implementations/siteBuilderRepo";
import { IIntegrationRepo } from "./integrationRepo";
import { ISiteBuilderRepo } from "./siteBuilderRepo";

const componentRepo: IComponentRepo = new ComponentRepo();
const siteBuilderRepo: ISiteBuilderRepo = new SiteBuilderRepo();
const integrationRepo: IIntegrationRepo = new IntegrationRepo();

export { componentRepo, siteBuilderRepo, integrationRepo };
