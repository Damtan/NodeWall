import { inject, injectable } from "inversify";
import {
  Authorized,
  CurrentUser,
  JsonController,
  Param,
  Post,
  UseBefore,
} from "routing-controllers";

import { IUser } from "../../users/schema/user.schema";
import { ValidationIdMiddleware } from "../../middleware/validation/validation.id.middleware";
import { PostCommentRateService } from "../services/post.comment.rate.service";

@injectable()
@JsonController()
export class PostCommentRateController {
  @inject(PostCommentRateService)
  private postCommentRateService: PostCommentRateService;

  @Authorized()
  @Post("/posts/:id/comment/:commentId/rate/up")
  @UseBefore(ValidationIdMiddleware)
  public async rateUP(
    @CurrentUser() user: IUser,
    @Param("id") id: string,
    @Param("commentId") commentId: string
  ): Promise<boolean> {
    await this.postCommentRateService.create(id, commentId, true, user);

    return true;
  }

  @Authorized()
  @Post("/posts/:id/comment/:commentId/rate/down")
  @UseBefore(ValidationIdMiddleware)
  public async rateDown(
    @CurrentUser() user: IUser,
    @Param("id") id: string,
    @Param("commentId") commentId: string
  ): Promise<boolean> {
    await this.postCommentRateService.create(id, commentId, false, user);

    return true;
  }
}
