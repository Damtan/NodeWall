import {
  BadRequestError,
  ExpressMiddlewareInterface,
} from "routing-controllers";
import { injectable } from "inversify";
import { Request, Response } from "express";
import { Types } from "mongoose";

@injectable()
export class ValidationIdMiddleware implements ExpressMiddlewareInterface {
  private readonly ID_PARAM = "Id";
  use(request: Request, response: Response, next?: (err?: Error) => any): any {
    let error = null;

    for (const param in request.query) {
      if (
        request.query.hasOwnProperty(param) &&
        param.includes(this.ID_PARAM)
      ) {
        error = Types.ObjectId.isValid(<string>request.query[param])
          ? null
          : new BadRequestError("Invalid id");

        if (error !== null) {
          break;
        }
      }
    }

    next(error);
  }
}
