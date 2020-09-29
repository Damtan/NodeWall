import {BadRequestError, ExpressMiddlewareInterface} from "routing-controllers";
import {injectable} from "inversify";
import {Request, Response} from "express";
import {Types} from "mongoose";
@injectable()
export class ValidationIdMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, response: Response, next?: (err?: Error) => any): any {
        const error = Types.ObjectId.isValid(request.params.id) ? null : new BadRequestError('Invalid id');

        next(error);
    }
}