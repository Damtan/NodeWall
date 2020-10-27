import { Action } from "routing-controllers";
import { JwtManager } from "../../security/jwt.manager";
import { IUserAuthentication } from "../interfaces/user.authentication.interface";
import { LoginDto } from "../form/dto/login.dto";
import { PasswordEncoder } from "../../security/password.encoder";
import { UserModel } from "../models/user.model";
import { injectable } from "inversify";
import { IUser } from "../schema/user.schema";

@injectable()
export class UserAuthorization implements IUserAuthentication {
  public async login(loginData: LoginDto): Promise<object> {
    let token = null;
    const user = await UserModel.findByUsername(loginData.username);

    if (
      user &&
      (await PasswordEncoder.comparePassword(loginData.password, user.password))
    ) {
      token = await JwtManager.generateToken(user);
    }

    return new Promise((resolve, reject) => {
      if (!token) reject("User not found!");

      resolve(token);
    });
  }
}
