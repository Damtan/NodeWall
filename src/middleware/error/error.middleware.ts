import {ExpressErrorMiddlewareInterface, HttpError, Middleware} from "routing-controllers";
import { ValidationError } from "class-validator";
import * as express from "express";
import {injectable} from "inversify";

/**
 * Express middleware to catch all errors throwed in controlers.
 * Should be first in error chain as it sends response to client.
 *
 * @export
 * @class CustomErrorHandler
 * @implements {ExpressErrorMiddlewareInterface}
 */
@Middleware({ type: "after" })
@injectable()
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {

    /**
     * Error handler - sets response code and sends json with error message.
     * Handle: standard node error, HttpError, ValidationError and string.
     *
     * @param {any} error An throwed object (error)
     * @param {express.Request} req The Express request object
     * @param {express.Response} res The Express response object
     * @param {express.NextFunction} next The next Express middleware function
     */
    public error(error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        let responseObject = {} as any;

        if(error instanceof Object && error.hasOwnProperty('errors')) {
            error = error.errors;
        }

        if(error.user !== undefined && error.user.kind === 'required') {
            res.status(403);
            responseObject.message = "Authorization required";
        } else if (Array.isArray(error) && error.every((element) => element instanceof ValidationError)) {
            res.status(400);
            responseObject.message = "You have an error in your request's body. Check 'errors' field for more details!";
            responseObject.errors = error;
            responseObject.details = [];
            error.forEach((element: ValidationError) => {
                 Object.keys(element.constraints).forEach((type) => {
                    responseObject.details.push(`property ${element.constraints[type]}`);
                 });
             });
        } else {
            // set http status
            if (error instanceof HttpError && error.httpCode) {
                res.status(error.httpCode);
            } else {
                res.status(500);
            }

            if (error instanceof Error) {
                const developmentMode: boolean = process.env.NODE_ENV === "development";

                // set response error fields
                if (error.name && (developmentMode || error.message)) { // show name only if in development mode and if error message exist too
                    responseObject.name = error.name;
                }
                if (error.message) {
                    responseObject.message = error.message;
                }
                if (error.stack && developmentMode) {
                    responseObject.stack = error.stack;
                }
            } else if (typeof error === "string") {
                responseObject.message = error;
            }
        }

        // send json only with error
        res.json(responseObject);
    }
}