import { BaseController } from "../../../../ddd-primitives";
import e, * as express from "express";
import { BuildPageUI } from "./buildPageUI";

export class BuildPageUIController extends BaseController {
  private buildPageUI: BuildPageUI;

  public constructor(buildPageUI: BuildPageUI) {
    super();
    this.buildPageUI = buildPageUI;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {}
}
