import * as express from "express";

export abstract class BaseController {
  protected abstract executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<void | any>;

  public async execute(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(res, "An unexpected error occurred");
    }
  }

  public static jsonResponse(
    res: express.Response,
    code: number,
    message: string,
    info?: any
  ) {
    return res.status(code).json({ message, ...(info || {}) });
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError(res: express.Response, message?: string, dto?: any) {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : "Unauthorized",
      dto
    );
  }

  public unauthorized(res: express.Response, message?: string, dto?: any) {
    return BaseController.jsonResponse(
      res,
      401,
      message ? message : "Unauthorized",
      dto
    );
  }

  public paymentRequired(res: express.Response, message?: string, dto?: any) {
    return BaseController.jsonResponse(
      res,
      402,
      message ? message : "Payment required",
      dto
    );
  }

  public forbidden(res: express.Response, message?: string, dto?: any) {
    return BaseController.jsonResponse(
      res,
      403,
      message ? message : "Forbidden",
      dto
    );
  }

  public notFound(res: express.Response, message?: string, dto?: any) {
    return BaseController.jsonResponse(
      res,
      404,
      message ? message : "Not found",
      dto
    );
  }

  public conflict(res: express.Response, message?: string, dto?: any) {
    return BaseController.jsonResponse(
      res,
      409,
      message ? message : "Conflict",
      dto
    );
  }

  public tooMany(res: express.Response, message?: string, dto?: any) {
    return BaseController.jsonResponse(
      res,
      429,
      message ? message : "Too many requests",
      dto
    );
  }

  public todo(res: express.Response) {
    return BaseController.jsonResponse(res, 400, "TODO");
  }

  public fail(res: express.Response, error: Error | string, dto?: any) {
    console.log(error);
    return res.status(500).json({
      message: error.toString(),
      ...(dto || {}),
    });
  }
}
