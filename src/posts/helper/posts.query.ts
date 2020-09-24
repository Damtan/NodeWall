import {IsAlphanumeric, IsPositive, IsOptional} from "class-validator";

export class PostsQuery {
    @IsPositive()
    @IsOptional()
    limit: number = 10;

    @IsOptional()
    @IsPositive()
    page: number = 1;

    @IsOptional()
    @IsAlphanumeric()
    search?: string = null
}