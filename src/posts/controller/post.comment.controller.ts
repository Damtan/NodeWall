import { inject, injectable } from "inversify";
import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
  UseBefore,
} from "routing-controllers";

import { IUser } from "../../users/schema/user.schema";
import { PostModel } from "../models/post.model";
import { ValidationIdMiddleware } from "../../middleware/validation/validation.id.middleware";
import { CommentDto } from "../../shared/form/comment.dto";
import { PostCommentService } from "../services/post.comment.service";
import { IComment } from "../../shared/schema/comment.schema";
import { plainToClass } from "class-transformer";
import { PostEntity } from "../entity/post.entity";

@injectable()
@JsonController()
export class PostCommentController {
  @inject(PostCommentService) private postCommentService: PostCommentService;
  @inject(PostModel) private postModel: PostModel;

  @Authorized()
  @Post("/posts/:id/comment")
  @UseBefore(ValidationIdMiddleware)
  public async updatePost(
    @Body({ validate: true }) commentDto: CommentDto,
    @CurrentUser() user: IUser,
    @Param("id") id: string
  ): Promise<string> {
    commentDto.user = user._id;

    return await this.postCommentService
      .create(commentDto, id)
      .then((result: IComment) => {
        return result._id.toString();
      });
  }

  @Get("/posts/:id/comments")
  @UseBefore(ValidationIdMiddleware)
  public async getPostComments(
    @Param("id") id: string,
    @QueryParam("page") limit = 20
  ): Promise<PostEntity> {
    const commentsWithRates = await this.postModel.getPostCommentsAndRates(
      id,
      limit
    );

    return plainToClass(PostEntity, commentsWithRates.toObject(), {
      strategy: "excludeAll",
    });
  }
}
