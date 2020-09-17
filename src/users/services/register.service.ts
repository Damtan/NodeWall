import { injectable } from "inversify";
import { UserRegisterInterface } from "../interfaces/user.register.interface";
import { RegisterDto } from "../form/dto/register.dto";
import { UserModel } from "../models/user.model";
import { IUser } from "../schema/user.schema";

@injectable()
export class RegisterService implements UserRegisterInterface {
    public register(registerData: RegisterDto): Promise<IUser> {
        return UserModel.create(registerData);
    }
}