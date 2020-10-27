import { RegisterDto } from "../form/dto/register.dto";
import User, { IUser } from "../schema/user.schema";

export class UserModel {
  static async create(data: RegisterDto): Promise<IUser> {
    const user = new User(data);

    return user.save();
  }

  static async findByUsername(username: string): Promise<IUser> {
    return User.findOne().where("username").equals(username).exec();
  }

  static async findAll(): Promise<IUser[]> {
    return User.find({});
  }
}
