import { Expose, Type } from "class-transformer";
import { IUser } from "../../users/schema/user.schema";
import { UserEntity } from "../../users/entity/user.entity";
import { EntityInterface } from "../interface/entity.interface";
import { IComment } from "../schema/comment.schema";

export class RateEntity implements EntityInterface {
  @Type(() => String)
  _id: string;

  @Expose()
  rate: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => UserEntity)
  user: IUser;
}
