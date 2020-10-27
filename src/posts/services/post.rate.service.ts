import { inject, injectable } from "inversify";
import { PostModel } from "../models/post.model";
import { IUser } from "../../users/schema/user.schema";
import { RateModel } from "../../shared/models/rate.model";
import { BadRequestError } from "routing-controllers/http-error/BadRequestError";
import { NotFoundError } from "routing-controllers";
import { IPost } from "../schema/post.schema";

@injectable()
export class PostRateService {
  private readonly ENTITY_POST_RATE = "comment";

  @inject(PostModel) private postModel: PostModel;
  @inject(RateModel) private rateModel: RateModel;

  public async create(
    postId: string,
    isUpVote: boolean,
    user: IUser
  ): Promise<void> {
    const post = await (<Promise<IPost>>this.postModel.findById(postId));

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    if (
      await this.rateModel.isAlreadyRated(
        this.ENTITY_POST_RATE,
        postId,
        user._id
      )
    ) {
      throw new BadRequestError("Comment already rated");
    }

    const rate = await this.rateModel.create(
      user._id,
      isUpVote,
      this.ENTITY_POST_RATE,
      postId
    );

    await post.updateOne({
      $push: { rates: rate },
      user: user._id,
      overallRate: isUpVote ? ++post.overallRate : --post.overallRate,
    });
  }
}
