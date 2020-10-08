import {inject, injectable} from "inversify";
import {
    Authorized,
    Body,
    CurrentUser,
    JsonController, Param,
    Post, UseBefore
} from "routing-controllers";

import {IUser} from "../../users/schema/user.schema";
import {PostModel} from "../models/post.model";
import {SharedTypes} from "../../shared/types/types";
import {IPaginatorService} from "../../shared/interface/paginator.interface";
import {ValidationIdMiddleware} from "../../middleware/validation/validation.id.middleware";
import {CommentDto} from "../../shared/form/comment.dto";
import {PostCommentService} from "../services/post.comment.service";
import {IComment} from "../../shared/schema/comment.schema";

@injectable()
@JsonController()
export class PostCommentController {
    @inject(PostCommentService) private postCommentService: PostCommentService;
    @inject(SharedTypes.IPaginatorService) private paginatorService: IPaginatorService;
    @inject(PostModel) private postModel: PostModel

    @Authorized()
    @Post("/posts/:id/comment")
    @UseBefore(ValidationIdMiddleware)
    public async updatePost(@Body({ validate: true }) commentDto :CommentDto, @CurrentUser() user: IUser, @Param("id") id: string): Promise<string>{
        commentDto.user = user._id;

        return await this.postCommentService.create(commentDto, id, user).then((result: IComment) => {
            return result._id.toString();
        });
    }
}