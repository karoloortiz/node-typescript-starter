import { ISiteBuilderRepo, Page } from "../siteBuilderRepo";

export class SiteBuilderRepo implements ISiteBuilderRepo {
  getDigitalProductPage(
    pageId: string,
    digitalProductId: string
  ): Promise<{ page: Page }> {
    throw new Error("Method not implemented.");
  }
}
