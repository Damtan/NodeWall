import { RegisterDto } from "../form/dto/register.dto";
import { UserRegisterInterface } from "../interfaces/user.register.interface";
import {
    JsonController,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Res,
    Authorized,
    NotFoundError, BadRequestError
} from "routing-controllers";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { IUser } from "../schema/user.schema";

@injectable()
@JsonController()
export class RegisterController{
    @inject(TYPES.UserRegisterInterface) private userRegisterService: UserRegisterInterface;

    @Post("/register")
    public async registerUser(@Body({ validate: true }) userRegister :RegisterDto) : Promise<string> {
        return await this.userRegisterService.register(userRegister).then((result: IUser) => {
            return result._id;
        }).catch(function(err) {
            throw new BadRequestError(err);
        });
    }
}