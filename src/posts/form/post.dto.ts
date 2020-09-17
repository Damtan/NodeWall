import {IsDefined, Length} from "class-validator";

export class PostDto {
    @IsDefined()
    @Length(10,50)
    title: string;

    @Length(10,50)
    description?: string;

    @IsDefined()
    @Length(10, 500)
    body: string;

    user: string
}