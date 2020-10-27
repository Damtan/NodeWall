import { RegisterDto } from "../form/dto/register.dto";
import { IUser } from "../schema/user.schema";

export interface UserRegisterInterface {
  register(registerData: RegisterDto): Promise<IUser>;
}
