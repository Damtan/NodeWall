import { Expose, Type } from "class-transformer";
import { IUser } from "../../users/schema/user.schema";
import { UserEntity } from "../../users/entity/user.entity";
import { EntityInterface } from "../interface/entity.interface";
import { IComment } from "../schema/comment.schema";
import { RateEntity } from "./rate.entity";
import { IRate } from "../schema/rate.schema";

export class CommentEntity implements EntityInterface {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  body: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => UserEntity)
  user: IUser;

  @Expose()
  @Type(() => RateEntity)
  rates: IRate[];

  @Expose()
  overallCount: number;
}
