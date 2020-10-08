import {Expose, Type} from "class-transformer";
import {IUser} from "../../users/schema/user.schema";
import {UserEntity} from "../../users/entity/user.entity";
import {EntityInterface} from "../interface/entity.interface";

export class CommentEntity implements EntityInterface{
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
}