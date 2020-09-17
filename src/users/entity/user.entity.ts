import {Exclude, Expose, Type} from "class-transformer";

export class UserEntity{
    @Expose()
    @Type(() => String)
    _id: string;

    @Expose()
    email: string;

    @Expose()
    firstName ?: string;

    @Expose()
    lastName ?: string;

    password: string;

    @Expose()
    username: string;

    termsAccepted ?: Date;

    @Expose()
    deletedAt ?: Date;

    @Expose()
    createdAt ?: Date;
}