import {Exclude, Expose, Type} from "class-transformer";
import {IUser} from "../../users/schema/user.schema";
import {UserEntity} from "../../users/entity/user.entity";

export class PostEntity{
    @Expose()
    @Type(() => String)
    _id: string;

    @Expose()
    title: string;

    @Expose()
    description ?: string;

    @Expose()
    body: string;

    @Expose()
    createdAt: Date;

    @Expose()
    @Type(() => UserEntity)
    user: IUser;
}