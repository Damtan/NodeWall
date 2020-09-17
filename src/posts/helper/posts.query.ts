import {IsAlphanumeric, IsPositive} from "class-validator";

export class PostsQuery {
    @IsPositive()
    limit: number;

    @IsPositive()
    page: number;

    @IsAlphanumeric()
    search: string;
}