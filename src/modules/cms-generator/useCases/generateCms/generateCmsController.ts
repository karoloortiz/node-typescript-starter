import { BaseController } from "../../../../ddd-primitives";
import e, * as express from "express";
import { GenerateCms } from "./generateCms";

export class GenerateCmsController extends BaseController {
  private generateCms: GenerateCms;

  public constructor(generateCms: GenerateCms) {
    super();
    this.generateCms = generateCms;
  }

  public async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {}
}
