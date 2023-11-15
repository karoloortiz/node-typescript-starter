import { IComponentRepo } from "./componentRepo";
import { ComponentRepo } from "./implementations/componentRepo";
import { SiteBuilderRepo } from "./implementations/siteBuilderRepo";
import { ISiteBuilderRepo } from "./siteBuilderRepo";

const componentRepo: IComponentRepo = new ComponentRepo();
const siteBuilderRepo: ISiteBuilderRepo = new SiteBuilderRepo();

export { componentRepo, siteBuilderRepo };
