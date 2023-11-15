import { UseCase } from "../../../../ddd-primitives";
import { Component } from "../../domain/entities/component/component";
import { PageUI } from "../../domain/entities/uiElement/pageUI";
import { ISiteBuilderRepo } from "../../repos/siteBuilderRepo";
import { BuildPageUIError } from "./buildPageUIError";

type Props = {
  digitalProductId: string;
  pageId: string;
};

export class BuildPageUI implements UseCase<Props, Component> {
  private siteBuilderRepo: ISiteBuilderRepo;

  constructor(siteBuildeRepo: ISiteBuilderRepo) {
    this.siteBuilderRepo = siteBuildeRepo;
  }

  async execute(request: Props): Promise<Component> {
    // const pageInfo = this.siteBuilderRepo.getDigitalProductPage(
    //   request.digitalProductId,
    //   request.pageId
    // );

    // const ui = new PageUI(pageInfo);
    // const component = ui.getComponent();

    // return component;
    return;
  }
}
