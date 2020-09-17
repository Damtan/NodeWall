import { Container } from "inversify";
import { TYPES } from "./src/users/types/types";
import { UserRegisterInterface } from "./src/users/interfaces/user.register.interface";
import { RegisterService } from "./src/users/services/register.service";
import {RegisterController} from "./src/users/controller/register.controller";
import {UserController} from "./src/users/controller/user.controller";
import {IUserAuthentication} from "./src/users/interfaces/user.authentication.interface";
import {UserAuthorization} from "./src/users/security/user.authorization";

const myContainer = new Container();
myContainer.bind<UserRegisterInterface>(TYPES.UserRegisterInterface).to(RegisterService);
myContainer.bind<IUserAuthentication>(TYPES.IUserAuthentication).to(UserAuthorization);
myContainer.bind(RegisterController).toSelf();
myContainer.bind(UserController).toSelf();

export { myContainer };