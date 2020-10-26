import {IsDefined, Length} from "class-validator";

export class CommentDto {
    @IsDefined()
    @Length(10, 500)
    body: string;

    user: string
}