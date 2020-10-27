import { RegisterDto } from "../form/dto/register.dto";
import { UserRegisterInterface } from "../interfaces/user.register.interface";
import { JsonController, Body, Post } from "routing-controllers";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";

@injectable()
@JsonController()
export class RegisterController {
  @inject(TYPES.UserRegisterInterface)
  private userRegisterService: UserRegisterInterface;

  @Post("/register")
  public async registerUser(
    @Body({ validate: true }) userRegister: RegisterDto
  ): Promise<void> {
    await this.userRegisterService.register(userRegister);
  }
}
