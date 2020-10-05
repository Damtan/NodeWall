import { Container } from "inversify";
import { TYPES } from "../types/types";
import { UserRegisterInterface } from "../interfaces/user.register.interface";
import { RegisterService } from "../services/register.service";
import {RegisterController} from "../controller/register.controller";
import {UserController} from "../controller/user.controller";
import {IUserAuthentication} from "../interfaces/user.authentication.interface";
import {UserAuthorization} from "../security/user.authorization";

const userContainer = new Container();
userContainer.bind<UserRegisterInterface>(TYPES.UserRegisterInterface).to(RegisterService);
userContainer.bind<IUserAuthentication>(TYPES.IUserAuthentication).to(UserAuthorization);
userContainer.bind(RegisterController).toSelf();
userContainer.bind(UserController).toSelf();

export { userContainer };