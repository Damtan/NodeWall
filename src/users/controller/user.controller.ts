import {
  JsonController,
  Body,
  Get,
  Post,
  Authorized,
  BadRequestError,
  CurrentUser,
} from "routing-controllers";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { LoginDto } from "../form/dto/login.dto";
import { IUserAuthentication } from "../interfaces/user.authentication.interface";
import { IUser } from "../schema/user.schema";
import { plainToClass } from "class-transformer";
import { UserEntity } from "../entity/user.entity";

@injectable()
@JsonController()
export class UserController {
  @inject(TYPES.IUserAuthentication)
  private userAuthentication: IUserAuthentication;

  @Post("/login")
  public async loginAction(
    @Body({ validate: true }) userLogin: LoginDto
  ): Promise<string> {
    return await this.userAuthentication.login(userLogin);
  }

  @Authorized()
  @Get("/user/me")
  public meAction(@CurrentUser() user?: IUser): UserEntity {
    return plainToClass(UserEntity, user.toObject(), {
      strategy: "excludeAll",
    });
  }
}
