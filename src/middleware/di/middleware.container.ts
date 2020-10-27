import { Container } from "inversify";
import { ValidationIdMiddleware } from "../validation/validation.id.middleware";
import { ErrorMiddleware } from "../error/error.middleware";

const middlewareContainer = new Container();

middlewareContainer
  .bind<ValidationIdMiddleware>(ValidationIdMiddleware)
  .toSelf();
middlewareContainer.bind<ErrorMiddleware>(ErrorMiddleware).toSelf();

export { middlewareContainer };
